package main

import (
	"github.com/google/uuid"
	"github.com/zishang520/socket.io/v2/socket"
)

type Player struct {
	ID        int
	Name      string
	Socket    *socket.Socket
	Room      *Room
	Character *Character
}

func NewPlayer(socket *socket.Socket) *Player {
	return &Player{
		Socket: socket,
	}
}

func (player *Player) SendTick(playersPositions []any, cameraX int) error {
	return player.emit("tick", playersPositions, cameraX)
}

func (player *Player) SendInicioJuego() error {
	return player.emit("inicioJuego")
}

func (player *Player) SendInformacionSala(roomUUID uuid.UUID, mapName string, players []map[string]any) error {
	return player.emit("informacionSala", roomUUID.String(), mapName, players)
}

func (player *Player) ToInformacionSalaInfo() map[string]any {
	return map[string]any{
		"numeroJugador": player.ID,
		"nombre":        player.Name,
	}
}

func (player *Player) SendCarreraTerminada(raceResult []map[string]any) error {
	return player.emit("carreraTerminada", raceResult)
}

func (player *Player) emit(ev string, args ...any) error {
	if player.Socket == nil {
		return nil
	}

	return player.Socket.Emit(ev, args...)
}
