package main

import (
	"encoding/json"
	"log"
	"os"
)

type Map struct {
	Width        int          `json:"ancho"`
	Platforms    []Platform   `json:"plataformas"`
	Obstacles    []Obstacle   `json:"obstaculos"`
	PlayersStart PlayersStart `json:"inicio_jugadores"`
}

type Platform struct {
	Type  string `json:"tipo"`
	FromX int    `json:"desdeX"`
	FromY int    `json:"desdeY"`
	ToX   int    `json:"hastaX"`
	ToY   int    `json:"hastaY"`
}

type Obstacle struct {
	Type  string `json:"tipo"`
	FromX int    `json:"desdeX"`
	FromY int    `json:"desdeY"`
}

type PlayersStart struct {
	X int `json:"x"`
	Y int `json:"y"`
}

func loadMap() Map {
	log.Println("Loading map")

	configFile, err := os.Open("mapas/mapa1.json")
	if err != nil {
		log.Fatalln("Error opening map file", "err", err)
	}

	var gameMap Map

	jsonParser := json.NewDecoder(configFile)
	if err = jsonParser.Decode(&gameMap); err != nil {
		log.Fatalln("Error parsing map file", "err", err)
	}

	log.Println("Map loaded", gameMap)

	return gameMap
}
