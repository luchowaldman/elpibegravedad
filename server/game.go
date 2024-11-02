package main

import (
	"log"
	"slices"
	"sync"
	"time"
)

const (
	TicksPerSecond = 30
	cameraWidth    = int(1500 / 2)
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

func initGame(world *World) {
	for _, player := range world.Players {
		err := player.Socket.Emit("juegoIniciado")
		if err != nil {
			log.Println("failed to send juegoIniciado", "err", err)
		}
	}
}

func gameLoop(world *World, playersMutex *sync.Mutex) {
	ticker := time.NewTicker(time.Second / TicksPerSecond)
	quit := make(chan struct{})

	amountOfPlayers := len(world.Players)

	playersThatFinished := make([]int, 0, amountOfPlayers)
	playersThatDied := make([]int, 0, amountOfPlayers)

	log.Println("Stating game loop")
	for {
		select {
		case <-ticker.C:
			playersPositions := []PlayerInfo{}

			playersMutex.Lock()
			playersThatFinishedThisTick, playersThatDiedThisTick := world.Update()
			playersMutex.Unlock()

			playersThatFinished = append(playersThatFinished, playersThatFinishedThisTick...)
			playersThatDied = append(playersThatDied, playersThatDiedThisTick...)

			if len(playersThatFinished)+len(playersThatDied) == amountOfPlayers {
				log.Println("race finished")

				slices.Reverse(playersThatDied)

				raceResult := append(playersThatFinished, playersThatDied...)

				for _, player := range world.Players {
					err := player.Socket.Emit("carreraTerminada", raceResult)
					if err != nil {
						log.Println("failed to send carreraTerminada", "err", err)
					}
				}

				ticker.Stop()
				return
			} else {
				for _, player := range world.Players {
					posX := player.Object.Position.X
					posY := player.Object.Position.Y
					hasGravityInverted := player.HasGravityInverted
					isWalking := player.IsWalking
					isDead := player.IsDead

					point := Point{
						X: int(posX),
						Y: int(posY),
					}.FromServerToClient(mapHeight, playerWidth, playerHeight)

					playersPositions = append(playersPositions, PlayerInfo{
						playerNumber:       1, // TODO send more players
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

				for _, player := range world.Players {
					err := player.Socket.Emit("tick", playersPositionsProtocol, cameraX)
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
