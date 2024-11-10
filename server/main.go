package main

import (
	"log"
	"net/http"
	"time"

	"github.com/zishang520/socket.io/v2/socket"
)

const Port = ":8080"

func main() {
	gameMap := loadMap()

	log.Println("Starting sever")

	io := socket.NewServer(nil, nil)
	http.Handle("/socket.io/", io.ServeHandler(nil))

	gameStart := make(chan *Room)

	err := io.On("connection", func(clients ...any) {
		manageClientConnection(clients, gameStart)
	})
	if err != nil {
		log.Fatalln("Error setting socket.io on connection", "err", err)
	}

	go func() {
		log.Fatalln(http.ListenAndServe(Port, nil))
	}()

	log.Println("Waiting for players")
	room := <-gameStart

	log.Println("Creating world")
	world := NewWorld(gameMap, room.Players)

	gameLoop(world, room)

	// TODO eliminar, es para que el server no muera al terminar la carrera
	for {
		time.Sleep(5 * time.Second)
	}
}
