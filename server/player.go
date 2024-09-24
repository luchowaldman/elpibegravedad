package main

import "github.com/zishang520/socket.io/v2/socket"

type Player struct {
	Socket *socket.Socket

	PosX int
	PosY int

	HasGravityInverted bool
}

func (player *Player) InvertGravity() {
	player.HasGravityInverted = !player.HasGravityInverted
}

func (player *Player) Advance() {
	if player.HasGravityInverted {
		player.PosY = player.PosY + 1
	} else {
		player.PosY = player.PosY - 1
	}

	player.PosX = player.PosX + 1
}
