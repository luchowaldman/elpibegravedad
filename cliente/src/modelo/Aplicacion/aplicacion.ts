import { Client, InformacionJugador, PosicionJugador } from "../client_socketio";
import { ControladorDOM } from "../DOM/ControladorDOM";
import { divMapa } from "../DOM/divMapa";
import { AccionGraficaMostrarTexto, AccionGraficaSetPosicionTexto, AccionGraficaModificarTexto, AccionGraficaEjecutarSonido } from "../Graficos/AccionGrafica";
import { graficoJuego } from "../Graficos/graficoJuego";
import { Jugador } from "../Graficos/jugador";
import { Mapa } from "../Mapa/mapa";

const posYLabelStatus = 100;
const posYLabelJugadores = 300;

export class Aplicacion {
    private controladorDOM = new ControladorDOM();
    private mapas: divMapa[] = [new divMapa('mapa1', 'img/mapa1_icono.png', 'Mapa inicial', 'mapas/mapa1.json'),
    new divMapa('charly', 'img/charly_icono.png', 'Charly Garcia', 'mapas/charly.json'),
    new divMapa('mapa3', 'img/mapa1_icono.png', 'Mapa 3', 'mapas/mapa3.json'),
    new divMapa('demo', 'img/mapa1_icono.png', 'Demo', 'mapas/demo.json')];


    private jugadores: Jugador[] = [
        new Jugador("Play1", 0x0000ff, -100, -100),
        new Jugador("Play2", 0xff0000, -100, -100),
        new Jugador("Play3", 0x00ff00, -100, -100),
        new Jugador("Play5", 0xffff00, -100, -100),
        new Jugador("Play6", 0xff00ff, -100, -100),
        new Jugador("Play7", 0x00ffff, -100, -100),
        new Jugador("Play8", 0xffa500, -100, -100)
    ];

    private client: Client;
    private mapa: Mapa;
    private graficos: graficoJuego;
    private nombreususario: string;

    constructor(urlserver: string, nombreususario: string) {
        this.nombreususario = nombreususario;
        this.controladorDOM = new ControladorDOM();
        this.client = new Client(urlserver);
        this.mapa = new Mapa();
        this.graficos = new graficoJuego();
        this.ConfigGraficos();

    }


    iniciar() {
        console.log('Aplicación iniciada');
        this.ConfigurarCliente();
        this.graficos.controles.setOnKeyPressHandler(this.handleKeyPress.bind(this));
        this.client.connect();
    }
    private ConfigurarCliente() {

        this.client.setPosicionJugadoresHandler(this.handlePosicionJugadores.bind(this));
        this.client.setIniciarJuegoHandler(this.handleIniciarJuego.bind(this));
        this.client.setInformacionSalaHandler(this.handleInformacionSala.bind(this));
        this.client.setConnectHandler(this.handleConnect.bind(this));
        this.client.setDisconnectHandler(this.handleDisconnect.bind(this));
        this.client.setConnectErrorHandler(this.handleConnectError.bind(this));
        this.client.setCamaraHandler(this.handleCamara.bind(this));
        this.client.setCarreraTerminadaHandler(this.handleTerminoCarrera.bind(this));
    }

    DOMIniciado(document: Document) {

        this.controladorDOM.DOMIniciado(document, this.mapas);
        this.controladorDOM.setonNuevaPartida(this.unirse_partida.bind(this));
        this.controladorDOM.setonClickMapa(this.click_mapa.bind(this));

    }



    private ConfigGraficos() {
        this.graficos.AddAnimacion('player_caminando', 35, 50);
        this.graficos.AddAnimacionEntidadGrafica('animacioncaminando', 'player_caminando', 0, 1, 7, -1);
        this.graficos.AddAnimacion('player_volando', 35, 50);
        this.graficos.AddAnimacionEntidadGrafica('animacionvolando', 'player_volando', 0, 1, 7, -1);
        this.graficos.AddAnimacion('player_muriendo', 35, 50);
        this.graficos.AddAnimacionEntidadGrafica('animacionmuriendo', 'player_muriendo', 0, 1, 7, -1);
        this.graficos.AddAnimacion('player_festejando', 35, 50);
        this.graficos.AddAnimacionEntidadGrafica('animacionfestejando', 'player_festejando', 0, 1, 7, -1);



        this.graficos.agenda.agregarAccionGrafica(0, new AccionGraficaMostrarTexto(this.graficos, "status_label", "DOM INICIADO", 600, posYLabelStatus));
        this.graficos.agenda.agregarAccionGrafica(0, new AccionGraficaMostrarTexto(this.graficos, "jugadores_label", "", 500, posYLabelJugadores));
    }


    getMapaJSON(id: string): string | undefined {
        const mapa = this.mapas.find(mapa => mapa.id === id);
        return mapa ? mapa.JSON : undefined;
    }


    async unirse_partida(partida_id: string) {

        console.log("Envia Unirse a partida", partida_id);
        this.client.sendUnirseSala(partida_id, this.nombreususario);
    }


    private CentrarLabels() {

        const pos = this.graficos.getPosicionCamara();
        this.graficos.agenda.agregarAccionGrafica(0, new AccionGraficaSetPosicionTexto(this.graficos, "status_label", pos + 600, posYLabelStatus));
        this.graficos.agenda.agregarAccionGrafica(0, new AccionGraficaSetPosicionTexto(this.graficos, "jugadores_label", pos + 500, posYLabelJugadores));
    }

    private SetLabelGrafico(status_label: string, jugadores_label: string) {

        this.graficos.agenda.agregarAccionGrafica(0, new AccionGraficaModificarTexto(this.graficos, "status_label", status_label));
        this.graficos.agenda.agregarAccionGrafica(0, new AccionGraficaModificarTexto(this.graficos, "jugadores_label", jugadores_label));

    }


    async click_mapa(mapa: divMapa) {
        await this.mapa.cargarMapa(mapa.JSON);
        this.mapa.cargarImagenes(this.graficos);
        this.graficos.agenda.iniciar();
        this.controladorDOM.mostrar_pagina('pagina2');
        this.SetLabelGrafico("Cargando Mapa", "Total de Jugadores: 1");
        this.client.sendInitSala(mapa.id, this.nombreususario);

    }


    private handleConnect() {

        console.log("Conectado");

        const urlParams = new URLSearchParams(window.location.search);
        const partidaId = urlParams.get('partida');
        this.controladorDOM.mostrar_pagina('pagina1');
        if (partidaId) {
            this.unirse_partida(partidaId);
        }
    }
    private handleDisconnect() {
        console.log("Desconectado");
        this.controladorDOM.mostrar_error("Desconectado");
    }
    private handleConnectError() {
        console.log("Error en la conexion");
        this.controladorDOM.mostrar_error("Error en la conexion");
    }
    private handlePosicionJugadores(posicionesDeLosJugadores: PosicionJugador[]) {

        for (let i = 0; i < posicionesDeLosJugadores.length; i++) {
            const x = posicionesDeLosJugadores[i].x;
            const y = posicionesDeLosJugadores[i].y;
            this.jugadores[i].setPosicion(this.graficos, x, y, posicionesDeLosJugadores[i].estaCaminando, posicionesDeLosJugadores[i].tieneGravedadInvertida, posicionesDeLosJugadores[i].estado);
        }
    }


    private handleTerminoCarrera(resultado: InformacionJugador[]) {
        this.CentrarLabels();
        this.SetLabelGrafico("Carrera Terminada", "Ganador: " + resultado[0].nombre);
    }

    private handleCamara() {

        this.client.setCamaraHandler((camaraX) => {
            this.graficos.setPosicionCamara(camaraX);
        });
    }

    private handleIniciarJuego() {
        this.SetLabelGrafico("Iniciando", "3 ...");
        setTimeout(() => {
            this.SetLabelGrafico("Iniciando", "... 2 ...");
            setTimeout(() => {
                this.SetLabelGrafico("Iniciando", "     ....  1");
                setTimeout(() => {
                    this.SetLabelGrafico("Iniciado", "A correr");
                    setTimeout(() => {
                        this.SetLabelGrafico("", "");
                        if (localStorage.getItem('music') == 'si') {
                            this.graficos.agenda.agregarAccionGrafica(1, new AccionGraficaEjecutarSonido(this.graficos, this.mapa.cancion));
                        }
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
        this.mapa.dibujarMapa(this.graficos);
        this.jugadores.forEach(jugador => jugador.dibujar(this.graficos));
    }

    private cargado: boolean = false;
    private async handleInformacionSala(id: string, mapa: string, listaJugadores: InformacionJugador[]) {
        console.log("sala iniciada", id, mapa);
        if (!this.cargado) {

            this.cargado = true;

            const url = `https://storage.googleapis.com/pibegravedadcliente/index.html`;
            this.controladorDOM.mostrar_compartirpagina(url, id);
            const mapaJSON = this.getMapaJSON(mapa);
            if (mapaJSON == undefined) {
                console.log("Error al cargar el mapa");
                return;
            }
            await this.mapa.cargarMapa(mapaJSON);
            this.mapa.cargarImagenes(this.graficos);
            await this.graficos.init();
            this.graficos.agenda.iniciar();
            this.controladorDOM.mostrar_pagina('pagina2');
        }

        let nombrejugadores = ""
        let cont = 0;
        listaJugadores.forEach(jugador => {
            if (cont != 0) {
                if (cont % 2 == 0)
                    nombrejugadores = nombrejugadores.concat("\n");
                else
                    nombrejugadores = nombrejugadores.concat(",");
            }
            cont++;
            nombrejugadores = nombrejugadores.concat(jugador.nombre);
        });

        listaJugadores.map(jugador => jugador.nombre).join('\n');

        this.SetLabelGrafico(`En la sala, ${this.nombreususario}`, `${listaJugadores.length} Jugadores: \n ${nombrejugadores}`);
    }


    private handleKeyPress(key: string) {
        console.log("Tecla", key);
        if (key == "Tecla G") {
            console.log("Envia Cambio Gravedad");
            this.client?.sendChangeGravity();
        }
        if (key == "Tecla I") {
            console.log("Envia iniciar juego");
            this.client?.sendiniciarJuego();
        }
        console.log(key);
    }



    detener() {
        console.log('Aplicación detenida');
    }

}
