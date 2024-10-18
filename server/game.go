package main

import (
	"log"
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

			maxPosX := 0
			playersPositionsProtocol := make([]any, 0, len(playersPositions))

			for _, playersPosition := range playersPositions {
				if playersPosition.posX > maxPosX {
					maxPosX = playersPosition.posX
				}

				playersPositionsProtocol = append(playersPositionsProtocol, playersPosition.ToMap())
			}

			cameraX := maxPosX - cameraWidth
			if cameraX < 0 {
				cameraX = 0
			}

			for _, player := range *world.Players {
				err := player.Socket.Emit("tick", playersPositionsProtocol, cameraX)
				if err != nil {
					log.Println("failed to send posicionesDeLosJugadores", "err", err)
				}
			}
		case <-quit:
			ticker.Stop()
			return
		}
	}
}
