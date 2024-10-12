package main

import (
	"github.com/solarlune/resolv"
	"github.com/zishang520/socket.io/v2/socket"
)

type Player struct {
	Socket *socket.Socket

	Object   *resolv.Object
	Speed    resolv.Vector
	OnGround *resolv.Object

	HasGravityInverted bool
}

func (player *Player) SetSpeed(x, y float64) {
	player.Speed.X = x

	if player.HasGravityInverted {
		player.Speed.Y = y
	} else {
		player.Speed.Y = -y
	}
}

func (player *Player) InvertGravity() {
	player.HasGravityInverted = !player.HasGravityInverted

	player.SetSpeed(player.Speed.X, player.Speed.Y)
}
