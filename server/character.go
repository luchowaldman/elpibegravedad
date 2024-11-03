package main

import (
	"github.com/solarlune/resolv"
)

type Character struct {
	Object *resolv.Object
	Speed  resolv.Vector

	HasGravityInverted bool
	IsWalking          bool
	IsDead             bool
}

func NewCharacter(object *resolv.Object) *Character {
	return &Character{
		Object: object,
	}
}

func (character *Character) SetSpeed(x, y float64) {
	character.Speed.X = x
	character.Speed.Y = y
}

func (character *Character) InvertGravity() {
	if character.IsWalking {
		character.HasGravityInverted = !character.HasGravityInverted

		character.SetSpeed(character.Speed.X, -character.Speed.Y)
	}
}
