package main

import (
	"encoding/json"
	"log"
	"os"
)

const (
	mapHeight = 600
)

type Map struct {
	Height       int
	Width        int          `json:"largo"`
	Platforms    []Platform   `json:"plataformas"`
	Obstacles    []Obstacle   `json:"obstaculos"`
	PlayersStart PlayersStart `json:"inicio_jugadores"`
	RaceFinish   RaceFinish   `json:"meta"`

	Solids []Solid
}

type Solid struct {
	coordinates Coordinates
}

type Platform struct {
	Type   string `json:"tipo"`
	FromX  int    `json:"desdeX"`
	FromY  int    `json:"desdeY"`
	ToX    int    `json:"hastaX"`
	Height int    `json:"alto"`
}

type Obstacle struct {
	Type   string `json:"tipo"`
	FromX  int    `json:"desdeX"`
	FromY  int    `json:"desdeY"`
	Width  int    `json:"largo"`
	Height int    `json:"alto"`
}

type PlayersStart struct {
	X int `json:"x"`
	Y int `json:"y"`
}

type RaceFinish struct {
	X      int `json:"x"`
	Y      int `json:"y"`
	Height int `json:"alto"`
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
					Y: platform.FromY + platform.Height,
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
					X: obstacle.FromX + obstacle.Width,
					Y: obstacle.FromY + obstacle.Height,
				},
			}.FromClientToServer(mapHeight),
		})
	}

	gameMap.Solids = solids

	log.Println("Map solids generated", gameMap.Solids)

	return gameMap
}
