package main

import (
	"log"
	"net/http"
	"sync"

	"github.com/zishang520/socket.io/v2/socket"
)

const Port = ":8080"

func main() {
	gameMap := loadMap()

	log.Println("Starting sever")

	io := socket.NewServer(nil, nil)
	http.Handle("/socket.io/", io.ServeHandler(nil))

	playersMutex := &sync.Mutex{}
	// players := map[socket.SocketId]Player{}
	players := &[]*Player{}

	err := io.On("connection", func(clients ...any) {
		manageClientConnection(clients, playersMutex, players, gameMap)
	})
	if err != nil {
		log.Fatalln("Error setting sockert.io on connection", "err", err)
	}

	go func() {
		log.Fatalln(http.ListenAndServe(Port, nil))
	}()

	gameLoop(playersMutex, players)
}
