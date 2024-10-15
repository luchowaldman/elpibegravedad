import { io, Socket } from "socket.io-client";
import { AccionGraficaSetPosicion } from "./AccionGrafica";

interface ServerToClientEvents {
    posicionesDeLosJugadores: (positions: {
        numeroJugador: number,
        x: number,
        y: number,
        tieneGravedadInvertida: boolean,
        estaCaminando: boolean,
    }[]) => void;
}

interface ClientToServerEvents {
    changeGravity: () => void;
}

export class Client {
    private socket!: Socket<ServerToClientEvents, ClientToServerEvents>;
    private onPosicionJugadores(positions: { numeroJugador: number, x: number, y: number, tieneGravedadInvertida: boolean, estaCaminando: boolean }[]) {
        if (this.posicionJugadoresHandler) {
            this.posicionJugadoresHandler(positions);
        }
    }

    private posicionJugadoresHandler?: (positions: { numeroJugador: number, x: number, y: number, tieneGravedadInvertida: boolean, estaCaminando: boolean }[]) => void;

    public setPosicionJugadoresHandler(handler: (positions: { numeroJugador: number, x: number, y: number, tieneGravedadInvertida: boolean, estaCaminando: boolean }[]) => void) {
        this.posicionJugadoresHandler = handler;
    }


    constructor() {
    }

    public connect() {
        
        let socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:8080", {
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

        socket.on("posicionesDeLosJugadores", (posicionesDeLosJugadores) => {
            this.onPosicionJugadores(posicionesDeLosJugadores);
        });
        this.socket = socket;
    }

    sendChangeGravity() {
        console.log("sending changeGravity")
        this.socket.emit('changeGravity');
    };
}