import { ControladorDOM } from './ControladorDOM';
import { AccionGraficaModificarTexto, AccionGraficaMostrarTexto } from './modelo/AccionGrafica';
import { Client } from './modelo/client_socketio';
import { divMapa } from './modelo/divMapa';
import { graficoJuego } from './modelo/graficoJuego';
import { Jugador } from './modelo/jugador';
import { Mapa } from './modelo/mapa';


export class  Aplicacion {
    private controladorDOM = new ControladorDOM();
    private mapas: divMapa[] = [new divMapa('mapa1', '/img/mapa1_icono.png', 'Mapa en lapicera', './mapas/mapa1.json'),
                                new divMapa('mapa2', '/img/mapa1_icono.png', 'Algun mapa no creado', './mapas/EXmapa1.json'),
                                new divMapa('mapa3', '/img/mapa1_icono.png', 'Este menos', './mapas/mapa2.json')];

                                
    private jugadores: Jugador[] = [
        new Jugador("Play1",0x0000ff, 330, 450),
        new Jugador("Play2",0xff0000, 330, 500)
    ];

    private client: Client; 
    private mapa: Mapa;
    private graficos: graficoJuego;

    constructor() {
        this.controladorDOM = new ControladorDOM();
        this.client = new Client();
        this.mapa = new Mapa();
        this.graficos = new graficoJuego();
        this.ConfigGraficos();
        this.SetControlCallBacks();

            

    }

    private ConfigGraficos() {

        
        this.graficos.AddAnimacion('player_caminando', 35, 50);
        this.graficos.AddAnimacionEntidadGrafica('animacioncaminando', 'player_caminando', 0, 1, 7, -1);
        this.graficos.AddAnimacion('player_volando',  35, 50);
        this.graficos.AddAnimacionEntidadGrafica('animacionvolando', 'player_volando', 0, 1, 7, -1);

        
        this.graficos.agenda.agregarAccionGrafica(0 ,new  AccionGraficaMostrarTexto(this.graficos, "status_label", "DOM INICIADO", 600, 100));
        this.graficos.agenda.agregarAccionGrafica(0 ,new  AccionGraficaMostrarTexto(this.graficos, "jugadores_label", "", 500, 300));
    }

    private SetControlCallBacks() {
        this.graficos.controles.setOnKeyPressCallback((key: string) => {
            if (key == "Tecla G") {
            console.log("Envia Cambio Gravedadg");
            this.client?.sendChangeGravity();
            }
            console.log(key);
        });
    }
    
    getMapaJSON(id: string): string | undefined {
        const mapa = this.mapas.find(mapa => mapa.id === id);
        return mapa ? mapa.JSON : undefined;
    }

    DOMIniciado(document: Document) {        

            this.controladorDOM.DOMIniciado(document, this.mapas);
            this.controladorDOM.setonNuevaPartida(this.unirse_partida.bind(this));
            this.controladorDOM.setonClickMapa(this.click_mapa.bind(this));

            const urlParams = new URLSearchParams(window.location.search);
            const partidaId = urlParams.get('partida');
            if (partidaId) {
                this.unirse_partida(partidaId);
            }
    }

    async unirse_partida(partida_id: string) {
        //this.controladorDOM.mostrar_pagina('pagina2');
        console.log("Envia Unirse a partida", partida_id);
        this.client.sendUnirseSala(partida_id);
    }

    private SetLabelGrafico(status_label: string, jugadores_label: string)
    {
        this.graficos.agenda.agregarAccionGrafica(0 ,new  AccionGraficaModificarTexto(this.graficos, "status_label", status_label));        
        this.graficos.agenda.agregarAccionGrafica(0 ,new  AccionGraficaModificarTexto(this.graficos, "jugadores_label", jugadores_label));
    }

    
    async click_mapa(mapa: divMapa) {
        await this.mapa.cargarMapa(mapa.JSON);       
        this.mapa.cargarImagenes(this.graficos);
        this.graficos.agenda.iniciar();        
        this.controladorDOM.mostrar_pagina('pagina2');        
        this.SetLabelGrafico("Cargando Mapa", "Total de Jugadores: 1");
        this.client.sendInitSala(mapa.id);

    }
    

    iniciar() {
        console.log('Aplicación iniciada');
        
        this.client.setPosicionJugadoresHandler(this.handlePosicionJugadores.bind(this));
        this.client.setIniciarJuegoHandler(this.handleIniciarJuego.bind(this));
        this.client.setSalaIniciadaHandler(this.handleSalaIniciada.bind(this));

        this.graficos.controles.setOnKeyPressCallback(this.handleKeyPress.bind(this));

        this.client.connect();
    }

    private handlePosicionJugadores(posicionesDeLosJugadores: any[]) {
        console.log("Posiciones", posicionesDeLosJugadores);
        
        for (let i = 0; i < posicionesDeLosJugadores.length; i++) {
            let x = posicionesDeLosJugadores[i].x;
            let y = posicionesDeLosJugadores[i].y;
            this.jugadores[i].setPosicion(this.graficos, x, y);
        }
    }

    private handleIniciarJuego() {
        console.log("Iniciar Juego");
        this.SetLabelGrafico("", "");
        this.mapa.dibujarMapa(this.graficos);    
        this.jugadores[0].dibujar(this.graficos);
    }

    private async handleSalaIniciada(id: string, mapa: string) {
        console.log("sala iniciada", id, mapa);
        this.controladorDOM.mostrar_compartirpagina(id);
        
        await this.mapa.cargarMapa(this.getMapaJSON(mapa));       
        this.mapa.cargarImagenes(this.graficos);
        await this.graficos.init();
        this.graficos.agenda.iniciar();        
        this.controladorDOM.mostrar_pagina('pagina2');        
        this.SetLabelGrafico("En la sala", "Total de Jugadores: 1");
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
