package main

import (
	"log"
	"net/http"
	"sync"

	"github.com/zishang520/socket.io/v2/socket"
)

const Port = ":8080"

func main() {
	io := socket.NewServer(nil, nil)
	http.Handle("/socket.io/", io.ServeHandler(nil))

	log.Println("Starting sever")

	playersMutex := &sync.Mutex{}
	// players := map[socket.SocketId]Player{}
	players := &[]*Player{}

	err := io.On("connection", func(clients ...any) {
		manageClientConnection(clients, playersMutex, players)
	})
	if err != nil {
		log.Fatalln("Error setting sockert.io on connection", "err", err)
	}

	go func() {
		log.Fatalln(http.ListenAndServe(Port, nil))
	}()

	gameLoop(playersMutex, players)
}
