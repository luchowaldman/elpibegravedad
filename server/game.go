package main

import (
	"log"
	"sync"
	"time"
)

type PlayerInfo struct {
	playerNumber       int
	posX               int
	posY               int
	hasGravityInverted bool
	isWalking          bool
}

func (playerInfo PlayerInfo) ToMap() map[string]any {
	return map[string]any{
		"numeroJugador":          playerInfo.playerNumber,
		"x":                      playerInfo.posX,
		"y":                      playerInfo.posY,
		"tieneGravedadInvertida": playerInfo.hasGravityInverted,
		"estaCaminando":          playerInfo.isWalking,
	}
}

const TicksPerSecond = 30

func gameLoop(world *World, playersMutex *sync.Mutex) {
	ticker := time.NewTicker(time.Second / TicksPerSecond)
	quit := make(chan struct{})
	log.Println("Stating game loop")
	for {
		select {
		case <-ticker.C:
			playersPositions := []PlayerInfo{}

			for _, player := range *world.Players {
				playersMutex.Lock()
				world.Update()

				posX := player.Object.Position.X
				posY := player.Object.Position.Y
				hasGravityInverted := player.HasGravityInverted
				isWalking := player.IsWalking
				playersMutex.Unlock()

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
				})
			}

			playersPositionsProtocol := make([]any, 0, len(playersPositions))
			for _, playersPosition := range playersPositions {
				playersPositionsProtocol = append(playersPositionsProtocol, playersPosition.ToMap())
			}

			for _, player := range *world.Players {
				err := player.Socket.Emit("tick", playersPositionsProtocol, 0)
				if err != nil {
					log.Println("failed to send posicionesDeLosJugadores", "err", err)
				}
			}

			// cameraX := posX
		case <-quit:
			ticker.Stop()
			return
		}
	}
}
