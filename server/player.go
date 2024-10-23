package main

import (
	"github.com/solarlune/resolv"
	"github.com/zishang520/socket.io/v2/socket"
)

type Player struct {
	Socket *socket.Socket

	Object *resolv.Object
	Speed  resolv.Vector

	HasGravityInverted bool
	IsWalking          bool
	IsDead             bool
}

func (player *Player) SetSpeed(x, y float64) {
	player.Speed.X = x
	player.Speed.Y = y
}

func (player *Player) InvertGravity() {
	player.HasGravityInverted = !player.HasGravityInverted

	player.SetSpeed(player.Speed.X, -player.Speed.Y)
}
