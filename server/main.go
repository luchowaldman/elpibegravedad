package main

import (
	"log"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"syscall"

	"github.com/zishang520/socket.io/v2/socket"
)

const Port = ":8080"

func main() {
	io := socket.NewServer(nil, nil)
	http.Handle("/socket.io/", io.ServeHandler(nil))

	log.Println("Starting sever")

	go func() {
		log.Fatalln(http.ListenAndServe(Port, nil))
	}()

	playersMutex := &sync.Mutex{}
	// players := map[socket.SocketId]Player{}
	players := &[]*Player{}

	err := io.On("connection", func(clients ...any) {
		manageClientConnection(clients, playersMutex, players)
	})
	if err != nil {
		log.Fatalln("Error setting sockert.io on connection", "err", err)
	}

	startGame(playersMutex, players)

	exit := make(chan struct{})
	SignalC := make(chan os.Signal)

	signal.Notify(SignalC, os.Interrupt, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT)
	go func() {
		for s := range SignalC {
			switch s {
			case os.Interrupt, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT:
				close(exit)
				return
			}
		}
	}()

	<-exit
	io.Close(nil)
	os.Exit(0)
}
