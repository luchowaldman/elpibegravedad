package main

import (
	"log"

	"github.com/zishang520/socket.io/v2/socket"
)

func manageClientConnection(clients []any, gameStart chan *Room) {
	newClient := clients[0].(*socket.Socket)
	newClientID := newClient.Id()

	log.Println("connection established. new client: ", newClientID)

	newPlayer := NewPlayer(newClient)

	err := newClient.On("changeGravity", func(datas ...any) {
		log.Println("changeGravity event received")

		if !newPlayer.Room.GameStarted.Load() {
			log.Println("changeGravity event received when the game has not yet started, ignoring message")

			return
		}

		// TODO: mutex for each player, not only for the list
		newPlayer.Room.Mutex.Lock()
		newPlayer.Character.InvertGravity()
		newPlayer.Room.Mutex.Unlock()
	})
	if err != nil {
		log.Println("failed to register on changeGravity message", "err", err)
		newClient.Disconnect(true)

		return
	}

	err = newClient.On("iniciarJuego", func(datas ...any) {
		log.Println("iniciarJuego event received")

		newPlayer.Room.StartGame()

		gameStart <- newPlayer.Room
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

	// if room.GameStarted.Load() {
	// 	log.Println("connection established received when the game has already begun, rejecting client")
	// 	newClient.Disconnect(true)

	// 	return
	// }

	// })
	// if err != nil {
	// 	log.Println("failed to register on unirSala message", "err", err)
	// 	newClient.Disconnect(true)

	// 	return
	// }

	err = newClient.On("crearSala", func(datas ...any) {
		if len(datas) != 2 {
			mapName := datas[0].(string)
			playerName := datas[1].(string)

			log.Println("crearSala event received with:", mapName, playerName)

			newPlayer.Name = playerName
			newPlayer.Room = NewRoom(mapName)

			newPlayer.Room.AddPlayer(newPlayer)
		} else {
			log.Println("crearSala event received but no all the params were sent")
		}
	})
	if err != nil {
		log.Println("failed to register on crearSala message", "err", err)
		newClient.Disconnect(true)

		return
	}

	err = newClient.On("disconnect", func(...any) {
		log.Println("client disconnected", newClient.Id())

		playersAmount := newPlayer.Room.RemovePlayer(newPlayer)
		if playersAmount == 0 {
			//delete room
		}
	})
	if err != nil {
		log.Println("failed to register on disconnect message", "err", err)
		newClient.Disconnect(true)

		return
	}
}
