package main

import (
	"log"
	"sync"

	"github.com/zishang520/socket.io/v2/socket"
)

func manageClientConnection(clients []any, playersMutex *sync.Mutex, players *[]*Player) {
	newClient := clients[0].(*socket.Socket)
	newClientID := newClient.Id()

	log.Println("connection established. new client: ", newClientID)

	err := newClient.On("changeGravity", func(datas ...any) {
		log.Println("changeGravity event received")

		// TODO: mutex for each player, not only for the list
		playersMutex.Lock()
		// players[newClient.Id()].InvertGravity()
		(*players)[0].InvertGravity()
		playersMutex.Unlock()
	})

	if err != nil {
		log.Println("failed to register on changeGravity message", "err", err)
		newClient.Disconnect(true)
	}

	err = newClient.On("iniciarJuego", func(datas ...any) {
		log.Println("iniciarJuego event received")

	})

	if err != nil {
		log.Println("failed to register on iniciarJuego message", "err", err)
		newClient.Disconnect(true)
	}

	err = newClient.On("initSala", func(datas ...any) {
		if len(datas) > 0 {
			mapName, ok := datas[0].(string)
			if ok {
				log.Println("initSala event received with map name:", mapName)
			} else {
				log.Println("initSala event received but map name is not a string")
			}
		} else {
			log.Println("initSala event received but no map name provided")
		}
	})

	if err != nil {
		log.Println("Fallo iniciando la sala", "err", err)
		newClient.Disconnect(true)
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
