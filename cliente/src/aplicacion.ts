import { ControladorDOM } from './ControladorDOM';
import { AccionGraficaMostrarTexto } from './modelo/AccionGrafica';
import { Client } from './modelo/client_socketio';
import { divMapa } from './modelo/divMapa';
import { graficoJuego } from './modelo/graficoJuego';
import { Mapa } from './modelo/mapa';


export class  Aplicacion {
    private controladorDOM = new ControladorDOM();
    private mapas: divMapa[] = [new divMapa('nuevoJuego_Mapa1', '/img/mapa1_icono.png', 'Mapa en lapicera', './mapas/mapa1.json'),
                                new divMapa('nuevoJuego_Mapa2', '/img/mapa1_icono.png', 'Algun mapa no creado', './mapas/mapa1.json'),
                                new divMapa('nuevoJuego_Mapa3', '/img/mapa1_icono.png', 'Este menos', './mapas/mapa1.json')];

                                
    private client: Client; 
    private mapa: Mapa;
    private graficos: graficoJuego;



    DOMIniciado(document: Document) {        
            this.controladorDOM.DOMIniciado(document, this.mapas);
            this.controladorDOM.setonNuevaPartida(this.iniciar_partida.bind(this));
            this.controladorDOM.setonClickMapa(this.click_mapa.bind(this));
    }

    iniciar_partida(partida_id: string) {
        this.controladorDOM.mostrar_pagina('pagina2');
    }

    
    async click_mapa(mapa: divMapa) {

        this.client.connect();;
        await this.mapa.cargarMapa(mapa.JSON);       
        this.mapa.cargarImagenes(this.graficos);
        await this.graficos.init();
        this.graficos.agenda.iniciar();
        this.controladorDOM.mostrar_pagina('pagina2');
        
  //      this.mapa.dibujarMapa(this.graficos);    
        setTimeout(() => {
            this.mapa.dibujarMapa(this.graficos);    
        }, 100);
    }
    

    
    constructor() {
        this.controladorDOM = new ControladorDOM();
        this.client = new Client();
        this.mapa = new Mapa();
        this.graficos = new graficoJuego();
        
        this.graficos.AddAnimacion('player_caminando', 35, 50);
        this.graficos.AddAnimacionEntidadGrafica('animacioncaminando', 'player_caminando', 0, 1, 7, -1);
        this.graficos.AddAnimacion('player_volando',  35, 50);
        this.graficos.AddAnimacionEntidadGrafica('animacionvolando', 'player_volando', 0, 1, 7, -1);
        

        this.graficos.controles.setOnKeyPressCallback((key: string) => {
            if (key == "Tecla G") {
            console.log("Envia Cambio Gravedadg");
            this.client?.sendChangeGravity();
            }
            console.log(key);
        });


    }
    iniciar() {
        console.log('Aplicación iniciada');
    }
    detener() {
        console.log('Aplicación detenida');
    }

}
