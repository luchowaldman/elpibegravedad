package main

import (
	"log"
	"net/http"

	"github.com/zishang520/socket.io/v2/socket"
)

const Port = ":8080"

func main() {

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

	log.Fatalln(http.ListenAndServe(Port, nil))
}
