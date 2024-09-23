package main

import (
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/zishang520/socket.io/v2/socket"
)

func main() {
	io := socket.NewServer(nil, nil)
	http.Handle("/socket.io/", io.ServeHandler(nil))
	go http.ListenAndServe(":8000", nil)

	gravityOn := true

	io.On("connection", func(clients ...any) {
		client := clients[0].(*socket.Socket)
		log.Println("conection stablished. new client: ", client.Id())
		client.On("event", func(datas ...any) {
			log.Println("event: ", datas)
		})
		client.On("changeGravity", func(datas ...any) {
			log.Println("changeGravity event received")

			if gravityOn {
				gravityOn = false
				client.Emit("playerPosition", 130, 400)
			} else {
				gravityOn = true
				client.Emit("playerPosition", 130, 445)
			}
		})
		client.On("disconnect", func(...any) {
			log.Println("client disconnected", client.Id())
		})
	})

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
