package main

import (
	"log"
	"sync"
	"sync/atomic"

	"github.com/zishang520/socket.io/v2/socket"
)

var gameStarted atomic.Bool

func manageClientConnection(clients []any, playersMutex *sync.Mutex, players *[]*Player, gameStart chan bool) {
	newClient := clients[0].(*socket.Socket)
	newClientID := newClient.Id()

	log.Println("connection established. new client: ", newClientID)

	err := newClient.On("changeGravity", func(datas ...any) {
		log.Println("changeGravity event received")

		if !gameStarted.Load() {
			log.Println("changeGravity event received when the game has not yet started, ignoring message")

			return
		}

		// TODO: mutex for each player, not only for the list
		playersMutex.Lock()
		// players[newClient.Id()].InvertGravity()
		(*players)[0].Character.InvertGravity()
		playersMutex.Unlock()
	})
	if err != nil {
		log.Println("failed to register on changeGravity message", "err", err)
		newClient.Disconnect(true)

		return
	}

	err = newClient.On("iniciarJuego", func(datas ...any) {
		log.Println("iniciarJuego event received")

		if gameStarted.Load() {
			log.Println("iniciarJuego event received when the game has already begun, ignoring message")

			return
		}

		gameStarted.Store(true)

		playersMutex.Lock()
		for _, player := range *players {
			err = player.SendInicioJuego()
			if err != nil {
				log.Println("failed to send inicioJuego", "err", err)
			}
		}
		playersMutex.Unlock()

		gameStart <- true
	})
	if err != nil {
		log.Println("failed to register on iniciarJuego message", "err", err)
		newClient.Disconnect(true)

		return
	}

	err = newClient.On("unirSala", func(datas ...any) {
		nombresala, ok := datas[0].(string)
		if ok {
			log.Println("unirSala event received with sala name:", nombresala)
			newClient.Emit("salaIniciada", nombresala, "mapa1")
		} else {
			log.Println("unirSala event received but map name is not a string")
		}

	})
	if err != nil {
		log.Println("failed to register on unirSala message", "err", err)
		newClient.Disconnect(true)

		return
	}

	err = newClient.On("initSala", func(datas ...any) {
		if len(datas) > 0 {
			mapName, ok := datas[0].(string)
			if ok {
				log.Println("initSala event received with sala name:", mapName)
				newClient.Emit("salaIniciada", "IDSALA", mapName)
			} else {
				log.Println("initSala event received but map name is not a string")
			}
		} else {
			log.Println("initSala event received but no map name provided")
		}
	})
	if err != nil {
		log.Println("failed to register on initSala message", "err", err)
		newClient.Disconnect(true)

		return
	}

	err = newClient.On("disconnect", func(...any) {
		log.Println("client disconnected", newClient.Id())
		// delete(players, newClientID)
		playersMutex.Lock()
		*players = []*Player{}
		playersMutex.Unlock()
	})
	if err != nil {
		log.Println("failed to register on disconnect message", "err", err)
		newClient.Disconnect(true)

		return
	}

	newPlayer := &Player{
		Socket: newClient,
	}

	playersMutex.Lock()
	// players[newClientID] = Player{
	// 	Socket: newClient,
	// }
	if len(*players) == 0 {
		*players = []*Player{newPlayer}
	} else {
		(*players)[0] = newPlayer
	}
	playersMutex.Unlock()
}
