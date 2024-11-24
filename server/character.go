package main

import (
	"github.com/solarlune/resolv"
)

const (
	initialCharacterSpeedX float64 = float64(100) / ticksPerSecond
	initialCharacterSpeedY float64 = float64(90) / ticksPerSecond
)

type Character struct {
	Object *resolv.Object
	Speed  resolv.Vector

	HasGravityInverted bool
	IsWalking          bool
	IsDead             bool
	HasFinished        bool
}

func NewCharacter(object *resolv.Object) *Character {
	return &Character{
		Object: object,
	}
}

func (character *Character) SetInitialSpeed() {
	character.Speed.X = initialCharacterSpeedX
	character.Speed.Y = initialCharacterSpeedY
}

func (character *Character) InvertGravity() {
	if character.IsWalking {
		character.HasGravityInverted = !character.HasGravityInverted

		character.Speed.Y = -character.Speed.Y
	}
}
