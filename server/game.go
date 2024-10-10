package main

import (
	"log"
	"sync"
	"time"
)

const TicksPerSecond = 30

func gameLoop(playersMutex *sync.Mutex, players *[]*Player) {
	ticker := time.NewTicker(time.Second / TicksPerSecond)
	quit := make(chan struct{})
	log.Println("Stating game loop")
	for {
		select {
		case <-ticker.C:
			playersMutex.Lock()
			if len(*players) != 0 {
				player := (*players)[0]
				player.Advance()

				// TODO could probably be outside mutex lock for better performance
				err := player.Socket.Emit("posicionesDeLosJugadores", []any{
					map[string]any{
						"numeroJugador":          1,
						"x":                      player.PosX,
						"y":                      player.PosY,
						"tieneGravedadInvertida": false,
						"estaCaminando":          false,
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

			playersMutex.Unlock()
		case <-quit:
			ticker.Stop()
			return
		}
	}
}
