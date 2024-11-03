package main

import (
	"github.com/google/uuid"
	"github.com/zishang520/socket.io/v2/socket"
)

type Player struct {
	Socket    *socket.Socket
	Character Character
}

func (player *Player) SendTick(playersPositions []any, cameraX int) error {
	return player.Socket.Emit("tick", playersPositions, cameraX)
}

func (player *Player) SendInicioJuego() error {
	return player.Socket.Emit("inicioJuego")
}

func (player *Player) SendInformacionSala(roomUUID uuid.UUID, mapName string, players []map[string]any) error {
	return player.Socket.Emit("informacionSala", roomUUID.String(), mapName, players)
}

func (player *Player) ToInformacionSalaInfo() map[string]any {
	return map[string]any{
		"numeroJugador": 1,
		"nombre":        "Franco",
	}
}
