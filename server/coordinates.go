package main

type Coordinates struct {
	From Point
	To   Point
}

type Point struct {
	X, Y int
}

// client:
//
//	→ x
//	↓
//	y
//
// server:
//
//	y
//	↑
//	→ x

func (coords Coordinates) ToDimensions() (float64, float64, float64, float64) {
	return float64(coords.From.X),
		float64(coords.From.Y),
		float64(coords.To.X - coords.From.X),
		float64(coords.To.Y - coords.From.Y)
}

// transform client coordinates to server coordinates system
func (coords Coordinates) FromClientToServer(mapHeight int) Coordinates {
	return Coordinates{
		From: Point{
			X: coords.From.X,
			Y: mapHeight - coords.To.Y,
		},
		To: Point{
			X: coords.To.X,
			Y: mapHeight - coords.From.Y,
		},
	}
}

// transform server coordinates to client coordinates system
func (point Point) FromServerToClient(mapHeight, objectHeight int) Point {
	// TODO ver esto con luis, esta raro tener que mandarlo por la mitad
	return Point{
		X: point.X,
		Y: mapHeight - (point.Y + objectHeight/2),
	}
}
