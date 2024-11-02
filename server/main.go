package main

import (
	"log"
	"net/http"
	"sync"
	"time"

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

	gameStart := make(chan bool)

	err := io.On("connection", func(clients ...any) {
		// TODO manejar conexiones de mas
		manageClientConnection(clients, playersMutex, players, gameStart)
	})
	if err != nil {
		log.Fatalln("Error setting sockert.io on connection", "err", err)
	}

	go func() {
		log.Fatalln(http.ListenAndServe(Port, nil))
	}()

	log.Println("Waiting for players")
	<-gameStart

	log.Println("Creating world")
	world := NewWorld(gameMap, *players)

	gameLoop(world, playersMutex)
	for {
		time.Sleep(5 * time.Second)
	}
}
