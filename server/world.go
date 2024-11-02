package main

import (
	"log"
	"math"

	"github.com/solarlune/resolv"
)

const (
	cellSize                 = 5
	solidTag                 = "solid"
	worldLimitTag            = "worldLimit"
	raceFinishTag            = "raceFinish"
	playerTag                = "player"
	playerHeight             = 50
	playerWidth              = 35
	playerSpeedX     float64 = float64(60) / TicksPerSecond
	playerSpeedY             = float64(90) / TicksPerSecond
	cameraLimitWidth         = cellSize
	raceFinishWidth          = 50
)

type World struct {
	space *resolv.Space

	// playersMutex *sync.Mutex
	// players := map[socket.SocketId]Player{}
	Players *[]*Player

	cameraLimit *resolv.Object
}

func NewWorld(gameMap Map, players *[]*Player) *World {
	w := &World{
		Players: players,
	}
	w.Init(gameMap)

	return w
}

func (world *World) Init(gameMap Map) {
	// Initialize the world.

	log.Println("starting world with dimensions: ", gameMap.Width, gameMap.Height)

	gameWidth := float64(gameMap.Width)
	gameHeight := float64(gameMap.Height)

	// Define the world's Space. Here, a Space is essentially a grid (the game's width and height, or 640x360), made up of 16x16 cells. Each cell can have 0 or more Objects within it,
	// and collisions can be found by checking the Space to see if the Cells at specific positions contain (or would contain) Objects. This is a broad, simplified approach to collision
	// detection.
	world.space = resolv.NewSpace(int(gameWidth), int(gameHeight), cellSize, cellSize)

	// Add world limits
	world.space.Add(
		resolv.NewObject(
			gameWidth-cellSize, 0, cellSize, gameHeight,
			worldLimitTag,
		),
		resolv.NewObject(
			0, 0, gameWidth, cellSize,
			worldLimitTag,
		),
		resolv.NewObject(
			0, gameHeight-cellSize, gameWidth, cellSize,
			worldLimitTag,
		),
	)

	// Add camera limit
	world.cameraLimit = resolv.NewObject(
		toCameraLimitX(0), 0, cameraLimitWidth, gameHeight, // initially outside the world
		worldLimitTag,
	)
	world.space.Add(world.cameraLimit)

	// Add race finish
	world.space.Add(
		resolv.NewObject(
			float64(gameMap.RaceFinish.X+raceFinishWidth+playerWidth), // add raceFinishWidth+playerWidth to the x position so the collision in when the player cross the race finish completely
			float64(gameMap.RaceFinish.Y), cellSize, float64(gameMap.RaceFinish.Height),
			raceFinishTag,
		),
	)

	// Add solids
	for _, solid := range gameMap.Solids {
		x, y, w, h := solid.coordinates.ToDimensions()

		log.Println("Adding solid: ", x, y, w, h)

		world.space.Add(
			resolv.NewObject(
				x, y, w, h,
				solidTag,
			),
		)
	}

	// Create Players' objects and add it to the world's Space.
	for _, player := range *world.Players {
		// TODO mover posicion inicial de aca uno
		playerObject := resolv.NewObject(
			float64(gameMap.PlayersStart.X), float64(gameMap.PlayersStart.Y), playerWidth, playerHeight,
			playerTag,
		)

		player.Object = playerObject
		player.SetSpeed(playerSpeedX, -playerSpeedY)

		world.space.Add(playerObject)
	}
}

// Update updates the world with the new position of each player
//
// Returns:
//   - finishedPlayers: list of the players that finished the race this tick
//   - diedPlayers: list of the players that died this tick
func (world *World) Update() (finishedPlayers []int, diedPlayers []int) {
	for i, player := range *world.Players {
		if !player.IsDead {
			// TODO aca tener cuidado con colisiones entre los mismos players, calcular antes de avanzar
			world.updatePlayerPosition(player)

			playerFinished := world.checkIfPlayerFinishedRace(player)

			if playerFinished {
				finishedPlayers = append(finishedPlayers, i+1)
			} else {
				playerDied := world.checkIfPlayerHasDied(player)
				if playerDied {
					diedPlayers = append(diedPlayers, i+1)
				}
			}
		}
	}

	return
}

// checkIfPlayerHasDied updates player's IsDead if the player touched a world limit
func (world *World) checkIfPlayerHasDied(player *Player) bool {
	if collision := player.Object.Check(0, 0, worldLimitTag); collision != nil {
		log.Println("Player is dead")

		player.IsDead = true

		return true
	}

	return false
}

// checkIfPlayerFinishedRace updates player's IsDead if the player touched the race finish
func (world *World) checkIfPlayerFinishedRace(player *Player) bool {
	if collision := player.Object.Check(0, 0, raceFinishTag); collision != nil {
		log.Println("Player finished race")

		player.IsDead = true

		return true
	}

	return false
}

func (world *World) updatePlayerPosition(player *Player) {
	// we update the Player's movement. This is the real bread-and-butter of this example, naturally.

	// We handle horizontal movement separately from vertical movement. This is, conceptually, decomposing movement into two phases / axes.
	// By decomposing movement in this manner, we can handle each case properly (i.e. stop movement horizontally separately from vertical movement, as
	// necessary). More can be seen on this topic over on this blog post on higherorderfun.com:
	// http://higherorderfun.com/blog/2012/05/20/the-guide-to-implementing-2d-platformers/

	// dx is the horizontal delta movement variable (which is the Player's horizontal speed). If we come into contact with something, then it will
	// be that movement instead.
	dx := player.Speed.X

	log.Println(player.Object.Position)

	// Moving horizontally is done fairly simply;
	// we just check to see if something solid is in front of us. If so, we move into contact with it
	// and stop horizontal movement speed. If not, then we can just move forward.

	if collision := player.Object.Check(dx, 0, solidTag); collision != nil {
		log.Println("Colision en x")
		dx = collision.ContactWithCell(collision.Cells[0]).X
	}

	// Then we just apply the horizontal movement to the Player's Object. Easy-peasy.
	player.Object.Position.X += dx

	// Now for the vertical movement; it's the most complicated because we can land on different types of objects and need
	// to treat them all differently, but overall, it's not bad.

	// dy is the delta movement downward, and is the vertical movement by default; similarly to dx,
	// if we come into contact with
	// something, this will be changed to move to contact instead.

	dy := player.Speed.Y

	// We want to be sure to lock vertical movement to a maximum of the size of the Cells within the Space
	// so we don't miss any collisions by tunneling through.

	dy = math.Max(math.Min(dy, cellSize), -cellSize)

	player.IsWalking = false

	// We check for any solid / stand-able objects. In actuality, there aren't any other Objects
	// with other tags in this Space, so we don't -have- to specify any tags, but it's good to be specific for clarity in this example.
	if collision := player.Object.Check(0, dy, solidTag); collision != nil {
		log.Println("Colision en y")

		dy = collision.ContactWithCell(collision.Cells[0]).Y

		player.IsWalking = true
	}

	// Move the object on dy.
	player.Object.Position.Y += dy

	player.Object.Update() // Update the player's position in the space.
}

// UpdateCameraLimitPosition updates the position of the camera limit that is used in the world
// to detect is a player is fully outside the camera
func (world *World) UpdateCameraLimitPosition(x int) {
	world.cameraLimit.Position.X = toCameraLimitX(x)

	world.cameraLimit.Update()
}

// toCameraLimitX transforms the position x where the camera finished to the position the camera limit object must have
// in order to allow the camera limit to have cameraLimitWidth and to the player not collide with it until is fully outside the camera
func toCameraLimitX(cameraX int) float64 {
	return float64(cameraX - cameraLimitWidth - playerWidth)
}
