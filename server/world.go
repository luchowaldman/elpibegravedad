package main

import (
	"log"

	"github.com/solarlune/resolv"
)

const (
	cellSize                         = 10
	solidTag                         = "solid"
	fatalTag                         = "fatal"
	worldLimitTag                    = "worldLimit"
	raceFinishTag                    = "raceFinish"
	characterTag                     = "character"
	characterHeight                  = 50
	characterWidth                   = 35
	cameraLimitWidth                 = cellSize
	raceFinishWidth                  = 50
	characterInitialPositionDistance = 20
)

var collisionTags = []string{solidTag, characterTag}

type World struct {
	space *resolv.Space

	cameraLimit *resolv.Object
	RaceFinish  *resolv.Object
}

func NewWorld(gameMap Map, players []*Player) *World {
	w := &World{}

	w.Init(gameMap, players)

	return w
}

func (world *World) Init(gameMap Map, players []*Player) {
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
			80, 0, gameWidth, cellSize,
			worldLimitTag,
		),
		resolv.NewObject(
			80, gameHeight-cellSize, gameWidth, cellSize,
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
	world.RaceFinish = resolv.NewObject(
		float64(gameMap.RaceFinish.X+raceFinishWidth+characterWidth), // add raceFinishWidth+characterWidth to the x position so the collision in when the character cross the race finish completely
		float64(gameMap.RaceFinish.Y), cellSize, float64(gameMap.RaceFinish.Height),
		raceFinishTag,
	)
	world.space.Add(world.RaceFinish)

	// Add solids
	world.addSolids(gameMap.Solids, solidTag)
	world.addSolids(gameMap.Fatal, fatalTag)

	// Create Characters' objects and add it to the world's Space.
	characterInitialX := float64(gameMap.PlayersStart.X)
	characterInitialY := float64(gameMap.PlayersStart.Y)

	for i, player := range players {
		characterObject := resolv.NewObject(
			characterInitialX, characterInitialY, characterWidth, characterHeight,
			characterTag,
		)

		player.Character = NewCharacter(characterObject)

		world.space.Add(characterObject)

		if i%2 == 0 {
			characterInitialY = characterInitialY + characterHeight + characterInitialPositionDistance
		} else {
			characterInitialX = characterInitialX - characterWidth - characterInitialPositionDistance
			characterInitialY = characterInitialY - characterHeight - characterInitialPositionDistance
		}
	}
}

func (world *World) addSolids(solids []Solid, tag string) {
	for _, solid := range solids {
		x, y, w, h := solid.coordinates.ToDimensions()

		log.Println("Adding solid: ", x, y, w, h)

		world.space.Add(
			resolv.NewObject(
				x, y, w, h,
				tag,
			),
		)
	}
}

// Update updates the world with the new position of the character
//
// Returns:
//   - finished: true if the character finished the race this tick
//   - died: true if the character died this tick
func (world *World) Update(character *Character) (bool, bool) {
	if !character.IsDead && !character.HasFinished {
		world.updateCharacterPosition(character)

		if world.checkIfCharacterFinishedRace(character) {
			return true, false
		}

		return false, world.checkIfCharacterHasDied(character)
	}

	return false, false
}

// checkIfCharacterHasDied updates character's IsDead if the character touched a world limit
func (world *World) checkIfCharacterHasDied(character *Character) bool {
	if collision := character.Object.Check(0, 0, worldLimitTag); collision != nil {
		log.Println("Character is dead")

		character.IsDead = true

		return true
	}

	return false
}

// checkIfCharacterFinishedRace updates character's IsDead if the character touched the race finish
func (world *World) checkIfCharacterFinishedRace(character *Character) bool {
	if collision := character.Object.Check(0, 0, raceFinishTag); collision != nil {
		log.Println("Character finished race")

		character.HasFinished = true

		return true
	}

	return false
}

func (world *World) updateCharacterPosition(character *Character) {
	// we update the Character's movement

	// We handle horizontal movement separately from vertical movement. This is, conceptually, decomposing movement into two phases / axes.
	// By decomposing movement in this manner, we can handle each case properly (i.e. stop movement horizontally separately from vertical movement, as
	// necessary). More can be seen on this topic over on this blog post on higherorderfun.com:
	// http://higherorderfun.com/blog/2012/05/20/the-guide-to-implementing-2d-platformers/

	// dx is the horizontal delta movement variable (which is the Character's horizontal speed). If we come into contact with something, then it will
	// be that movement instead.
	dx := character.Speed.X

	// Moving horizontally is done fairly simply;
	// we just check to see if something solid is in front of us. If so, we move into contact with it
	// and stop horizontal movement speed. If not, then we can just move forward.

	if collision := character.Object.Check(dx, 0, collisionTags...); collision != nil {
		dx = collision.ContactWithCell(collision.Cells[0]).X
	}

	// Then we just apply the horizontal movement to the Character's Object. Easy-peasy.
	character.Object.Position.X += dx

	// Now for the vertical movement; it's the most complicated because we can land on different types of objects and need
	// to treat them all differently, but overall, it's not bad.

	// dy is the delta movement downward, and is the vertical movement by default; similarly to dx,
	// if we come into contact with
	// something, this will be changed to move to contact instead.

	dy := character.Speed.Y

	character.IsWalking = false

	// We check for any solid / stand-able objects. In actuality, there aren't any other Objects
	// with other tags in this Space, so we don't -have- to specify any tags, but it's good to be specific for clarity in this example.
	if collision := character.Object.Check(0, dy, collisionTags...); collision != nil {
		dy = collision.ContactWithCell(collision.Cells[0]).Y

		character.IsWalking = true
	}

	// Move the object on dy.
	character.Object.Position.Y += dy

	character.Object.Update() // Update the character's position in the space.
}

// UpdateCameraLimitPosition updates the position of the camera limit that is used in the world
// to detect is a character is fully outside the camera
func (world *World) UpdateCameraLimitPosition(x int) {
	world.cameraLimit.Position.X = toCameraLimitX(x)

	world.cameraLimit.Update()
}

// toCameraLimitX transforms the position x where the camera finished to the position the camera limit object must have
// in order to allow the camera limit to have cameraLimitWidth and to the character not collide with it until is fully outside the camera
func toCameraLimitX(cameraX int) float64 {
	return float64(cameraX - cameraLimitWidth - characterWidth)
}
