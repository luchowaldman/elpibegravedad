package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

const (
	mapHeight = 600
)

type Map struct {
	Height         int
	Width          int          `json:"largo"`
	Platforms      []Platform   `json:"plataformas"`
	Obstacles      []Obstacle   `json:"obstaculos"`
	FatalObstacles []Obstacle   `json:"obstaculos_mortales"`
	PlayersStart   PlayersStart `json:"inicio_jugadores"`
	RaceFinish     RaceFinish   `json:"meta"`

	Solids []Solid
	Fatal  []Solid
}

type Solid struct {
	coordinates Coordinates

	SpeedMultiplier float64
}

type Platform struct {
	Type            string  `json:"tipo"`
	FromX           int     `json:"desdeX"`
	FromY           int     `json:"desdeY"`
	ToX             int     `json:"hastaX"`
	Height          int     `json:"alto"`
	SpeedMultiplier float64 `json:"multiplicador_velocidad"`
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

func loadMap(name string) Map {
	log.Println("Loading map", name)
	resp, err := http.Get(fmt.Sprintf("https://storage.googleapis.com/pibegravedadcliente/mapas/%s.json", name))
	if err != nil {
		log.Fatalln("Error fetching map file", "err", err)
	}
	defer resp.Body.Close()
	configFile := resp.Body

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
			SpeedMultiplier: platform.SpeedMultiplier,
		})
	}

	solids = append(solids, obstaclesToSolids(gameMap.Obstacles)...)

	gameMap.Solids = solids
	gameMap.Fatal = obstaclesToSolids(gameMap.FatalObstacles)

	log.Println("Map solids generated", gameMap.Solids)
	log.Println("Map fatal generated", gameMap.Fatal)

	return gameMap
}

func obstaclesToSolids(obstacles []Obstacle) []Solid {
	solids := make([]Solid, 0, len(obstacles))

	for _, obstacle := range obstacles {
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

	return solids
}
