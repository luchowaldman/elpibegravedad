package main

import (
	"log"
	"sync"
	"time"
)

const TicksPerSecond = 30

func gameLoop(world *World, playersMutex *sync.Mutex) {
	ticker := time.NewTicker(time.Second / TicksPerSecond)
	quit := make(chan struct{})
	log.Println("Stating game loop")
	for {
		select {
		case <-ticker.C:
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

				// TODO could probably be outside mutex lock for better performance
				err := player.Socket.Emit("posicionesDeLosJugadores", []any{
					map[string]any{
						"numeroJugador":          1,
						"x":                      point.X,
						"y":                      point.Y,
						"tieneGravedadInvertida": hasGravityInverted,
						"estaCaminando":          isWalking,
					},
					// TODO send more players
					// map[string]any{
					// 	"numeroJugador":          2,
					// 	"x":                      100,
					// 	"y":                      100,
					// 	"tieneGravedadInvertida": false,
					// 	"estaCaminando":          false,
					// },
				})
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
