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

	playersMutex.Lock()
	// players[newClientID] = Player{
	// 	Socket: newClient,
	// }
	if len(*players) == 0 {
		*players = []*Player{
			&Player{
				Socket: newClient,
				PosX:   130,
				PosY:   445,
			},
		}
	} else {
		(*players)[0] = &Player{
			Socket: newClient,
			PosX:   130,
			PosY:   445,
		}
	}
	playersMutex.Unlock()

	newClient.On("changeGravity", func(datas ...any) {
		log.Println("changeGravity event received")

		// TODO: mutex for each player, not only for the list
		playersMutex.Lock()
		// players[newClient.Id()].InvertGravity()
		(*players)[0].InvertGravity()
		playersMutex.Unlock()
	})

	newClient.On("disconnect", func(...any) {
		log.Println("client disconnected", newClient.Id())
		// delete(players, newClientID)
		playersMutex.Lock()
		*players = []*Player{}
		playersMutex.Unlock()
	})
}
