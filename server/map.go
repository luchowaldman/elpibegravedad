package main

import (
	"encoding/json"
	"log"
	"os"
)

const (
	mapHeight              = 600
	platformHeight         = 20
	obstacleHeightAndWidth = 50
)

type Map struct {
	Height       int
	Width        int          `json:"ancho"`
	Platforms    []Platform   `json:"plataformas"`
	Obstacles    []Obstacle   `json:"obstaculos"`
	PlayersStart PlayersStart `json:"inicio_jugadores"`

	Solids []Solid
}

type Solid struct {
	coordinates Coordinates
}

type Platform struct {
	Type  string `json:"tipo"`
	FromX int    `json:"desdeX"`
	FromY int    `json:"desdeY"`
	ToX   int    `json:"hastaX"`
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

	gameMap := Map{
		Height: mapHeight,
	}

	jsonParser := json.NewDecoder(configFile)
	if err = jsonParser.Decode(&gameMap); err != nil {
		log.Fatalln("Error parsing map file", "err", err)
	}

	solids := make([]Solid, 0, len(gameMap.Platforms)+len(gameMap.Obstacles))

	log.Println("Map loaded", gameMap)

	for _, platform := range gameMap.Platforms {
		solids = append(solids, Solid{
			coordinates: Coordinates{
				From: Point{
					X: platform.FromX,
					Y: platform.FromY,
				},
				To: Point{
					X: platform.ToX,
					Y: platform.FromY + platformHeight, // platforms have a fixed height
				},
			}.FromClientToServer(mapHeight),
		})
	}

	for _, obstacle := range gameMap.Obstacles {
		solids = append(solids, Solid{
			coordinates: Coordinates{
				From: Point{
					X: obstacle.FromX,
					Y: obstacle.FromY,
				},
				To: Point{
					X: obstacle.FromX + obstacleHeightAndWidth, // obstacles are always square
					Y: obstacle.FromY + obstacleHeightAndWidth, // obstacles are always square
				},
			}.FromClientToServer(mapHeight),
		})
	}

	gameMap.Solids = solids

	log.Println("Map solids generated", gameMap.Solids)

	return gameMap
}
