package main

import (
	"github.com/zishang520/socket.io/v2/socket"
)

type Player struct {
	Socket    *socket.Socket
	Character Character
}

func (player *Player) SendTick(playersPositions []any, cameraX int) error {
	return player.Socket.Emit("tick", playersPositions, cameraX)
}
