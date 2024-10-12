package main

import (
	"math"

	"github.com/solarlune/resolv"
)

const (
	cellSize             = 16
	solidTag             = "solid"
	playerTag            = "player"
	playerHeight         = 100
	playerWidth          = 70
	playerSpeedX float64 = 30 / TicksPerSecond
	playerSpeedY         = playerSpeedX
)

type World struct {
	Space *resolv.Space

	// playersMutex *sync.Mutex
	// players := map[socket.SocketId]Player{}
	Players *[]*Player
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

	gw := float64(gameMap.Width)
	gh := float64(gameMap.Height)

	// Define the world's Space. Here, a Space is essentially a grid (the game's width and height, or 640x360), made up of 16x16 cells. Each cell can have 0 or more Objects within it,
	// and collisions can be found by checking the Space to see if the Cells at specific positions contain (or would contain) Objects. This is a broad, simplified approach to collision
	// detection.
	world.Space = resolv.NewSpace(int(gw), int(gh), cellSize, cellSize)

	// Construct the solid level geometry.
	// Note that the simple approach of checking cells in a Space for collision works
	// simply when the geometry is aligned with the cells,
	// as it all is in this platformer example.

	// Add world limits
	world.Space.Add(
		resolv.NewObject(
			0, -8, float64(gameMap.Width), 8,
			solidTag,
		),
		resolv.NewObject(
			0, float64(gameMap.Height), float64(gameMap.Width), 8,
			solidTag,
		),
	)

	// Add solids
	// for _, solid := range gameMap.Solids {
	// 	x, y, w, h := solid.coordinates.ToDimensions()

	// 	world.Space.Add(
	// 		resolv.NewObject(
	// 			x, y, w, h,
	// 			solidTag,
	// 		),
	// 	)
	// }

	// Create Players' objects and add it to the world's Space.
	for _, player := range *world.Players {
		// TODO mover posicion inicial de aca uno
		playerObject := resolv.NewObject(
			float64(gameMap.PlayersStart.X), float64(gameMap.PlayersStart.Y), playerWidth, playerHeight,
			playerTag,
		)

		player.Object = playerObject
		player.SetSpeed(playerSpeedX, -playerSpeedY)

		world.Space.Add(playerObject)
	}
}

func (world *World) Update() {
	for _, player := range *world.Players {
		// TODO aca tener cuidado con colisiones entre los mismos players, calcular antes de avanzar
		world.updatePlayer(player)
	}
}

func (world *World) updatePlayer(player *Player) {
	// we update the Player's movement. This is the real bread-and-butter of this example, naturally.

	// We handle horizontal movement separately from vertical movement. This is, conceptually, decomposing movement into two phases / axes.
	// By decomposing movement in this manner, we can handle each case properly (i.e. stop movement horizontally separately from vertical movement, as
	// necesseary). More can be seen on this topic over on this blog post on higherorderfun.com:
	// http://higherorderfun.com/blog/2012/05/20/the-guide-to-implementing-2d-platformers/

	// dx is the horizontal delta movement variable (which is the Player's horizontal speed). If we come into contact with something, then it will
	// be that movement instead.
	dx := player.Speed.X

	// Moving horizontally is done fairly simply;
	// we just check to see if something solid is in front of us. If so, we move into contact with it
	// and stop horizontal movement speed. If not, then we can just move forward.

	if check := player.Object.Check(player.Speed.X, 0, solidTag); check != nil {
		dx = check.ContactWithCell(check.Cells[0]).X
	}

	// Then we just apply the horizontal movement to the Player's Object. Easy-peasy.
	player.Object.Position.X += dx

	// Now for the vertical movement; it's the most complicated because we can land on different types of objects and need
	// to treat them all differently, but overall, it's not bad.

	// First, we set OnGround to be nil, in case we don't end up standing on anything.
	player.OnGround = nil

	// dy is the delta movement downward, and is the vertical movement by default; similarly to dx,
	// if we come into contact with
	// something, this will be changed to move to contact instead.

	dy := player.Speed.Y

	// We want to be sure to lock vertical movement to a maximum of the size of the Cells within the Space
	// so we don't miss any collisions by tunneling through.

	dy = math.Max(math.Min(dy, cellSize), -cellSize)

	// We're going to check for collision using dy (which is vertical movement speed),
	// but add one when moving downwards to look a bit deeper down
	// into the ground for solid objects to land on, specifically.
	// TODO hacer esto tambien para los techos
	checkDistance := dy
	if dy >= 0 {
		checkDistance++
	}

	// We check for any solid / stand-able objects. In actuality, there aren't any other Objects
	// with other tags in this Space, so we don't -have- to specify any tags, but it's good to be specific for clarity in this example.
	if check := player.Object.Check(0, checkDistance, solidTag); check != nil {

		// Firstly, we want to see if we jumped up into something that we can slide
		// around horizontally to avoid bumping the Player's head.

		// Sliding around a misspaced jump is a small thing that makes jumping a bit more forgiving,
		// and is something different polished platformers
		// (like the 2D Mario games) do to make it a smidge more comfortable to play.
		// For a visual example of this, see this excellent devlog post
		// from the extremely impressive indie game,
		// Leilani's Island: https://forums.tigsource.com/index.php?topic=46289.msg1387138#msg1387138

		// To accomplish this sliding, we simply call Collision.SlideAgainstCell() to see if we can slide.
		// We pass the first cell, and tags that we want to avoid when sliding
		// (i.e. we don't want to slide into cells that contain other solid objects).

		slide, slideOK := check.SlideAgainstCell(check.Cells[0], solidTag)

		// We further ensure that we only slide if:
		// 1) We're jumping up into something (dy < 0),
		// 2) If the cell we're bumping up against contains a solid object,
		// 3) If there was, indeed, a valid slide left or right, and
		// 4) If the proposed slide is less than 8 pixels in horizontal distance.
		// (This is a relatively arbitrary number that just so happens to be half the
		// width of a cell. This is to ensure the player doesn't slide too far horizontally.)

		if dy < 0 && check.Cells[0].ContainsTags(solidTag) && slideOK && math.Abs(slide.X) <= cellSize/2 {

			// If we are able to slide here, we do so. No contact was made, and vertical speed (dy) is maintained upwards.
			player.Object.Position.X += slide.X

		} else {

			// If sliding -fails-, that means the Player is jumping directly onto or into something,
			// and we need to do more to see if we need to come into
			// contact with it. Let's press on!

			// We check for simple solid ground. If we haven't had any success in landing previously, or the solid ground
			// is higher than the existing ground (like if the platform passes underneath the ground,
			// or we're walking off of solid ground
			// onto a ramp), we stand on it instead. We don't check for solid collision first because we want any ramps to override solid
			// ground (so that you can walk onto the ramp, rather than sticking to solid ground).

			// We use ContactWithObject() here because otherwise, we might come into contact with the moving platform's cells (which, naturally,
			// would be selected by a Collision.ContactWithCell() call because the cell is closest to the Player).

			if solids := check.ObjectsByTags(solidTag); len(solids) > 0 && (player.OnGround == nil || player.OnGround.Position.Y >= solids[0].Position.Y) {
				// TODO aca seguro hay que actualizar cosas para poder pararse sobre techos
				dy = check.ContactWithObject(solids[0]).Y

				// We're only on the ground if we land on it (if the object's Y is greater than the player's).
				if solids[0].Position.Y > player.Object.Position.Y {
					player.OnGround = solids[0]
				}

			}
		}

	}

	// Move the object on dy.
	player.Object.Position.Y += dy

	// wallNext := 1.0

	// If the wall next to the Player runs out, stop wall sliding.
	// if c := player.Object.Check(wallNext, 0, "solid"); player.SlidingOnWall != nil && c == nil {
	// 	player.SlidingOnWall = nil
	// }

	player.Object.Update() // Update the player's position in the space.
}
