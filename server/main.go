package main

import (
	"log"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"

	"github.com/zishang520/socket.io/v2/socket"
)

const FPSAmount = 30 // frames per second

func main() {
	io := socket.NewServer(nil, nil)
	http.Handle("/socket.io/", io.ServeHandler(nil))
	go func() {
		log.Fatalln(http.ListenAndServe(":8000", nil))
	}()

	playersMutex := &sync.Mutex{}
	// players := map[socket.SocketId]Player{}
	var player *Player

	io.On("connection", func(clients ...any) {
		newClient := clients[0].(*socket.Socket)
		newClientID := newClient.Id()

		log.Println("connection established. new client: ", newClientID)

		playersMutex.Lock()
		// players[newClientID] = Player{
		// 	Socket: newClient,
		// }
		player = &Player{
			Socket: newClient,
			PosX:   130,
			PosY:   445,
		}
		playersMutex.Unlock()

		newClient.On("changeGravity", func(datas ...any) {
			log.Println("changeGravity event received")

			// TODO: mutex for each player, not only for the list
			playersMutex.Lock()
			// players[newClient.Id()].InvertGravity()
			player.InvertGravity()
			playersMutex.Unlock()
		})

		newClient.On("disconnect", func(...any) {
			log.Println("client disconnected", newClient.Id())
			// delete(players, newClientID)
			playersMutex.Lock()
			player = nil
			playersMutex.Unlock()
		})
	})

	// game loop
	ticker := time.NewTicker(time.Second / FPSAmount)
	quit := make(chan struct{})
	go func() {
		for {
			select {
			case <-ticker.C:
				playersMutex.Lock()
				if player != nil {
					player.Advance()

					// TODO could probably be outside mutex lock for better performance
					player.Socket.Emit("playerPosition", []any{
						map[string]any{
							"playerNumber": 1,
							"x":            player.PosX,
							"y":            player.PosY,
						},
						map[string]any{
							"playerNumber": 2,
							"x":            100,
							"y":            100,
						},
					})
				}

				playersMutex.Unlock()
			case <-quit:
				ticker.Stop()
				return
			}
		}
	}()

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
