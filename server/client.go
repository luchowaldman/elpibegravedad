package main

import (
	"log"
	"sync/atomic"

	"github.com/zishang520/socket.io/v2/socket"
)

var (
	gameStarted atomic.Bool
	room        = NewRoom()
)

const mapName = "mapa1"

func manageClientConnection(clients []any, gameStart chan *Room) {
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
		room.Mutex.Lock()
		// players[newClient.Id()].InvertGravity()
		room.Players[0].Character.InvertGravity()
		room.Mutex.Unlock()
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

		room.Mutex.Lock()
		for _, player := range room.Players {
			err = player.SendInicioJuego()
			if err != nil {
				log.Println("failed to send inicioJuego", "err", err)
			}
		}
		room.Mutex.Unlock()

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
		// delete(players, newClientID)
		room.Mutex.Lock()
		room.Players = []*Player{}
		room.Mutex.Unlock()
	})
	if err != nil {
		log.Println("failed to register on disconnect message", "err", err)
		newClient.Disconnect(true)

		return
	}

	newPlayer := &Player{
		Socket: newClient,
	}

	room.Mutex.Lock()
	room.AddPlayer(newPlayer)

	playersInfo := make([]map[string]any, 0, len(room.Players))

	for _, player := range room.Players {
		playersInfo = append(playersInfo, player.ToInformacionSalaInfo())
	}

	for _, player := range room.Players {
		err := player.SendInformacionSala(room.ID, mapName, playersInfo)
		if err != nil {
			log.Println("failed to send informacionSala", "err", err)
		}
	}

	room.Mutex.Unlock()
}
