package main

import (
	"log"
	"slices"
	"time"
)

const (
	ticksPerSecond                  = 30
	cameraWidth                     = int(1500 / 2)
	initialTimeWithoutSpeed         = time.Second * 3
	characterSpeedX         float64 = float64(100) / ticksPerSecond
	characterSpeedY         float64 = float64(90) / ticksPerSecond
)

type PlayerInfo struct {
	playerNumber       int
	posX               int
	posY               int
	hasGravityInverted bool
	isWalking          bool
	isDead             bool
}

func (playerInfo PlayerInfo) ToMap() map[string]any {
	return map[string]any{
		"numeroJugador":          playerInfo.playerNumber,
		"x":                      playerInfo.posX,
		"y":                      playerInfo.posY,
		"tieneGravedadInvertida": playerInfo.hasGravityInverted,
		"estaCaminando":          playerInfo.isWalking,
		"estaMuerto":             playerInfo.isDead,
	}
}

func gameLoop(world *World, room *Room) {
	ticker := time.NewTicker(time.Second / ticksPerSecond)
	initialTimer := time.NewTimer(initialTimeWithoutSpeed)
	quit := make(chan struct{})

	amountOfPlayers := len(room.Players)

	playersThatFinished := make([]int, 0, amountOfPlayers)
	playersThatDied := make([]int, 0, amountOfPlayers)

	raceStarted := false // raceStarted represents whether the race has started, since there is an initial period where the game has started but the characters do not yet have speed

	log.Println("Stating game loop")

	for {
		select {
		case <-initialTimer.C:
			// add speed to characters
			for _, player := range room.Players {
				player.Character.SetSpeed(characterSpeedX, -characterSpeedY)
			}

			raceStarted = true

			log.Println("race started")
		case <-ticker.C:
			playersPositions := []PlayerInfo{}

			if raceStarted {
				room.Mutex.Lock()

				for _, player := range room.Players {
					finished, died := world.Update(player.Character)

					if finished {
						playersThatFinished = append(playersThatFinished, player.ID)
					} else if died {
						playersThatDied = append(playersThatDied, player.ID)
					}
				}

				room.Mutex.Unlock()
			}

			if len(playersThatFinished)+len(playersThatDied) == amountOfPlayers {
				log.Println("race finished")

				slices.Reverse(playersThatDied)

				raceResult := append(playersThatFinished, playersThatDied...)

				for _, player := range room.Players {
					err := player.SendCarreraTerminada(raceResult)
					if err != nil {
						log.Println("failed to send carreraTerminada", "err", err)
					}
				}

				ticker.Stop()
				return
			} else {
				for _, player := range room.Players {
					posX := player.Character.Object.Position.X
					posY := player.Character.Object.Position.Y
					hasGravityInverted := player.Character.HasGravityInverted
					isWalking := player.Character.IsWalking
					isDead := player.Character.IsDead

					point := Point{
						X: int(posX),
						Y: int(posY),
					}.FromServerToClient(mapHeight, characterWidth, characterHeight)

					playersPositions = append(playersPositions, PlayerInfo{
						playerNumber:       player.ID,
						posX:               point.X,
						posY:               point.Y,
						hasGravityInverted: hasGravityInverted,
						isWalking:          isWalking,
						isDead:             isDead,
					})
				}

				cameraX := calculateCameraPosition(playersPositions)

				world.UpdateCameraLimitPosition(cameraX)

				playersPositionsProtocol := make([]any, 0, len(playersPositions))

				for _, playersPosition := range playersPositions {
					playersPositionsProtocol = append(playersPositionsProtocol, playersPosition.ToMap())
				}

				for _, player := range room.Players {
					err := player.SendTick(playersPositionsProtocol, cameraX)
					if err != nil {
						log.Println("failed to send tick", "err", err)
					}
				}
			}
		case <-quit:
			ticker.Stop()
			return
		}
	}
}

func calculateCameraPosition(playersPositions []PlayerInfo) int {
	maxPosX := 0

	for _, playersPosition := range playersPositions {
		if playersPosition.posX > maxPosX {
			maxPosX = playersPosition.posX
		}
	}

	cameraX := maxPosX - cameraWidth
	if cameraX < 0 {
		cameraX = 0
	}

	return cameraX
}
