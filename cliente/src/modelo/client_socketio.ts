import { io, Socket } from "socket.io-client";
import { graficoJuego } from './graficoJuego';
import { AccionGraficaSetPosicion } from "./AccionGrafica";

interface ServerToClientEvents {
    playerPosition: (positions: {
        playerNumber: number,
        x: number,
        y: number,
    }[]) => void;
}

interface ClientToServerEvents {
    changeGravity: () => void;
}

export class Client {
    private socket!: Socket<ServerToClientEvents, ClientToServerEvents>;

    constructor(graficos: graficoJuego) {
        let socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:8000", {
            autoConnect: true,
            rejectUnauthorized: false,
            transports: ['websocket']
        });

        if (socket.active) {
            console.log("socket active")
        }

        socket.on("connect", () => {
            console.log("socket connected");
        });

        socket.on("disconnect", () => {
            console.log("socket disconnected");
        });

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        socket.on("playerPosition", (playerPosition) => {
            let x = playerPosition[0].x
            let y = playerPosition[0].y

            console.log("received player 1 position (%d, %d)", x, y)

            console.log("received player 2 position (%d, %d)", playerPosition[1].x, playerPosition[1].y)

            graficos.agenda.agregarAccionGrafica(1, new AccionGraficaSetPosicion(graficos, "player_server", y, x));

            graficos.agenda.iniciar();
        });

        this.socket = socket;
    }

    sendChangeGravity() {
        console.log("sending changeGravity")
        this.socket.emit('changeGravity');
    };
}