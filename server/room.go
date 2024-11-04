package main

import (
	"log"
	"sync"
	"sync/atomic"

	"github.com/elliotchance/pie/v2"
	"github.com/google/uuid"
)

type Room struct {
	ID           uuid.UUID
	Mutex        *sync.Mutex
	Players      []*Player
	GameStarted  atomic.Bool
	MapName      string
	NextPlayerID int
}

func NewRoom(mapName string) *Room {
	return &Room{
		ID:           uuid.New(),
		Mutex:        &sync.Mutex{},
		MapName:      mapName,
		NextPlayerID: 1,
	}
}

func (room *Room) AddPlayer(newPlayer *Player) {
	room.Mutex.Lock()

	newPlayer.ID = room.NextPlayerID
	room.NextPlayerID++

	room.Players = append(room.Players, newPlayer)
	room.sendInformacionSala()

	room.Mutex.Unlock()
}

func (room *Room) RemovePlayer(oldPlayer *Player) {
	room.Mutex.Lock()

	// if the game didn't start yet, remove the player
	if !room.GameStarted.Load() {
		room.Players = pie.Filter(room.Players, func(player *Player) bool {
			return player != oldPlayer
		})

		room.sendInformacionSala()
	}

	oldPlayer.Socket = nil
	room.Mutex.Unlock()
}

func (room *Room) StartGame() {
	room.Mutex.Lock()

	if room.GameStarted.Load() {
		log.Println("iniciarJuego event received when the game has already begun, ignoring message")

		return
	}

	room.GameStarted.Store(true)

	for _, player := range room.Players {
		err := player.SendInicioJuego()
		if err != nil {
			log.Println("failed to send inicioJuego", "err", err)
		}
	}

	room.Mutex.Unlock()
}

func (room *Room) sendInformacionSala() {
	playersInfo := make([]map[string]any, 0, len(room.Players))

	for _, player := range room.Players {
		playersInfo = append(playersInfo, player.ToInformacionSalaInfo())
	}

	for _, player := range room.Players {
		err := player.SendInformacionSala(room.ID, room.MapName, playersInfo)
		if err != nil {
			log.Println("failed to send informacionSala", "err", err)
		}
	}
}
