package main

import (
	"sync"

	"github.com/google/uuid"
)

type Room struct {
	ID      uuid.UUID
	Mutex   *sync.Mutex
	Players []*Player
}

func NewRoom() *Room {
	return &Room{
		ID:    uuid.New(),
		Mutex: &sync.Mutex{},
	}
}

func (room *Room) AddPlayer(newPlayer *Player) {
	// players[newClientID] = Player{
	// 	Socket: newClient,
	// }

	room.Players = append(room.Players, newPlayer)
}
