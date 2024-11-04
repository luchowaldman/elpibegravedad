package main

import (
	"log"

	"github.com/zishang520/socket.io/v2/socket"
)

var room = NewRoom("mapa1")

func manageClientConnection(clients []any, gameStart chan *Room) {
	newClient := clients[0].(*socket.Socket)
	newClientID := newClient.Id()

	log.Println("connection established. new client: ", newClientID)

	if room.GameStarted.Load() {
		log.Println("connection established received when the game has already begun, rejecting client")
		newClient.Disconnect(true)

		return
	}

	newPlayer := NewPlayer(newClient)

	err := newClient.On("changeGravity", func(datas ...any) {
		log.Println("changeGravity event received")

		if !room.GameStarted.Load() {
			log.Println("changeGravity event received when the game has not yet started, ignoring message")

			return
		}

		// TODO: mutex for each player, not only for the list
		room.Mutex.Lock()
		newPlayer.Character.InvertGravity()
		room.Mutex.Unlock()
	})
	if err != nil {
		log.Println("failed to register on changeGravity message", "err", err)
		newClient.Disconnect(true)

		return
	}

	err = newClient.On("iniciarJuego", func(datas ...any) {
		log.Println("iniciarJuego event received")

		room.StartGame()

		gameStart <- room
	})
	if err != nil {
		log.Println("failed to register on iniciarJuego message", "err", err)
		newClient.Disconnect(true)

		return
	}

	// TODO sprint 5, manage unirSala message
	// err = newClient.On("unirSala", func(datas ...any) {
	// 	nombresala, ok := datas[0].(string)
	// 	if ok {
	// 		log.Println("unirSala event received with sala name:", nombresala)
	// 		newClient.Emit("salaIniciada", nombresala, "mapa1")
	// 	} else {
	// 		log.Println("unirSala event received but map name is not a string")
	// 	}

	// })
	// if err != nil {
	// 	log.Println("failed to register on unirSala message", "err", err)
	// 	newClient.Disconnect(true)

	// 	return
	// }

	// TODO sprint 5, manage initSala message
	// err = newClient.On("initSala", func(datas ...any) {
	// 	if len(datas) > 0 {
	// 		mapName, ok := datas[0].(string)
	// 		if ok {
	// 			log.Println("initSala event received with sala name:", mapName)
	// 			newClient.Emit("salaIniciada", "IDSALA", mapName)
	// 		} else {
	// 			log.Println("initSala event received but map name is not a string")
	// 		}
	// 	} else {
	// 		log.Println("initSala event received but no map name provided")
	// 	}
	// })
	// if err != nil {
	// 	log.Println("failed to register on initSala message", "err", err)
	// 	newClient.Disconnect(true)

	// 	return
	// }

	err = newClient.On("disconnect", func(...any) {
		log.Println("client disconnected", newClient.Id())

		room.RemovePlayer(newPlayer)
	})
	if err != nil {
		log.Println("failed to register on disconnect message", "err", err)
		newClient.Disconnect(true)

		return
	}

	room.AddPlayer(newPlayer)
}
