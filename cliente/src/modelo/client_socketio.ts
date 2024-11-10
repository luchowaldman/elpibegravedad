import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
    inicioJuego: () => void;
    tick: (posiciones: PosicionJugador[], camaraX: number) => void;
    carreraTerminada: (resultado: number[]) => void;
    informacionSala: (salaID: string, mapa: string, listaJugadores: InformacionJugador[]) => void;
}

export interface InformacionJugador {
    numeroJugador: number,
    nombre: string,
}

export interface PosicionJugador {
    numeroJugador: number,
    x: number,
    y: number,
    tieneGravedadInvertida: boolean,
    estaCaminando: boolean,
    estado: string,
}

export interface ClientToServerEvents {
    changeGravity: () => void;
}

export class Client {
    private socket!: Socket<ServerToClientEvents, ClientToServerEvents>;
    private onPosicionJugadores(posiciones: PosicionJugador[]) {
        if (this.posicionJugadoresHandler) {
            this.posicionJugadoresHandler(posiciones);
        }
    }
    private CamaraHandler?: (camaraX: number) => void;

    public setCamaraHandler(handler: (camaraX: number) => void) {
        this.CamaraHandler = handler;
    }
    private IniciarJuegoHandler?: () => void;

    public setIniciarJuegoHandler(handler: () => void) {
        this.IniciarJuegoHandler = handler;
    }
    private InformacionSalaHandler?: (id: string, mapa: string, listaJugadores: InformacionJugador) => void;

    public setInformacionSalaHandler(handler: (id: string, mapa: string, listaJugadores: InformacionJugador) => void) {
        this.InformacionSalaHandler = handler;
    }

    private carreraTerminadaHandler?: (resultado: number[]) => void;

    public setCarreraTerminadaHandler(handler: (resultado: number[]) => void) {
        this.carreraTerminadaHandler = handler;
    }

    private posicionJugadoresHandler?: (posiciones: PosicionJugador[]) => void;

    public setPosicionJugadoresHandler(handler: (posiciones: PosicionJugador[]) => void) {
        this.posicionJugadoresHandler = handler;
    }
    private connectHandler?: () => void;
    private disconnectHandler?: () => void;
    private connectErrorHandler?: (err: Error) => void;

    public setConnectHandler(handler: () => void) {
        this.connectHandler = handler;
    }

    public setDisconnectHandler(handler: () => void) {
        this.disconnectHandler = handler;
    }

    public setConnectErrorHandler(handler: (err: Error) => void) {
        this.connectErrorHandler = handler;
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


            socket.on("connect", () => {
                console.log("socket connected");
                this.connectHandler?.();
            });

            socket.on("disconnect", () => {
                console.log("socket disconnected");
                this.disconnectHandler?.();
            });

            socket.on("connect_error", (err) => {
                console.log(`connect_error due to ${err.message}`);
                this.connectErrorHandler?.(err);
            });

            socket.on("tick", (posicionesDeLosJugadores, camaraX) => {
                this.onPosicionJugadores(posicionesDeLosJugadores);
                this.CamaraHandler?.(camaraX);
            });

            socket.on("carreraTerminada", (resultado) => {
                console.log("carreraTerminada received %s", resultado)
                this.carreraTerminadaHandler?.(resultado);
            });

            socket.on("inicioJuego", () => {
                console.log("initGame received");
                this.IniciarJuegoHandler?.();
            });



            socket.on("informacionSala", (salaID, mapa, listaJugadores) => {
                console.log("informacionSala received", salaID, mapa, listaJugadores);

                this.InformacionSalaHandler?.(salaID, mapa, listaJugadores);
            });
        }

        this.socket = socket;
    }

    sendChangeGravity() {
        console.log("sending changeGravity")
        this.socket.emit('changeGravity');
    }

    sendInitSala(mapName: string) {
        console.log(`sending initSala with mapName: ${mapName}`);
        this.socket.emit('initSala', mapName);
    }


    sendiniciarJuego() {
        console.log(`sending iniciarJuego`);
        this.socket.emit('iniciarJuego');
    }

    sendUnirseSala(id_sala: string) {
        console.log(`sending initSala with mapName: ${id_sala}`);
        this.socket.emit('unirSala', id_sala);
    }
}