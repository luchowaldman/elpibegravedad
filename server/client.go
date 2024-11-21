package main

import (
	"log"

	"github.com/google/uuid"
	"github.com/zishang520/socket.io/v2/socket"
)

var rooms = map[uuid.UUID]*Room{}

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

		started := newPlayer.Room.StartGame()
		if !started {
			log.Println("iniciarJuego event received when the game has already started, ignoring message")

			return
		}

		gameStart <- newPlayer.Room
	})
	if err != nil {
		log.Println("failed to register on iniciarJuego message", "err", err)
		newClient.Disconnect(true)

		return
	}

	err = newClient.On("unirSala", func(datas ...any) {
		if len(datas) == 2 {
			roomID := datas[0].(string)
			playerName := datas[0].(string)

			log.Println("unirSala event received with:", roomID, playerName)

			roomUUID, err := uuid.Parse(roomID)
			if err != nil {
				log.Println("unirSala event received with invalid room id")

				return
			}

			room, roomExists := rooms[roomUUID]

			if !roomExists {
				log.Println("unirSala event received with not existent room id")

				return
			}

			if room.GameStarted.Load() {
				log.Println("unirSala event received when the game has already begun, rejecting client")

				return
			}

			newPlayer.Name = playerName
			room.AddPlayer(newPlayer)
		} else {
			log.Println("unirSala event received without correct params")
		}
	})
	if err != nil {
		log.Println("failed to register on unirSala message", "err", err)
		newClient.Disconnect(true)

		return
	}

	err = newClient.On("crearSala", func(datas ...any) {
		if len(datas) == 2 {
			mapName := datas[0].(string)
			playerName := datas[1].(string)

			log.Println("crearSala event received with:", mapName, playerName)

			newRoom := NewRoom(mapName)

			newPlayer.Name = playerName
			newRoom.AddPlayer(newPlayer)

			rooms[newRoom.ID] = newRoom

			log.Println("Room ", newRoom.ID, " created, waiting for players")
		} else {
			log.Println("crearSala event received without correct params")
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
			delete(rooms, newPlayer.Room.ID)
		}
	})
	if err != nil {
		log.Println("failed to register on disconnect message", "err", err)
		newClient.Disconnect(true)

		return
	}
}
