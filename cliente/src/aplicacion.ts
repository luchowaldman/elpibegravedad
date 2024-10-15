import { ControladorDOM } from './ControladorDOM';
import { divMapa } from './modelo/divMapa';


export class  Aplicacion {
    private controladorDOM = new ControladorDOM();
    private mapas: divMapa[] = [new divMapa('nuevoJuego_Mapa1', '/img/mapa1_icono.png', 'Mapa en lapicera', '/mapas/mapa1.json'),
        new divMapa('nuevoJuego_Mapa2', '/img/mapa1_icono.png', 'Algun mapa no creado', '/mapas/mapa1.json'),
        new divMapa('nuevoJuego_Mapa3', '/img/mapa1_icono.png', 'Este menos', '/mapas/mapa1.json')];




    DOMIniciado(document: Document) {
        
        

            this.controladorDOM.DOMIniciado(document, this.mapas);
            this.controladorDOM.setonNuevaPartida(this.iniciar_partida);
            this.controladorDOM.setonClickMapa(this.click_mapa);
    }

    iniciar_partida(partida_id: string) {
        console.log('Aplicación iniciada', partida_id);
    }

    
    click_mapa(mapa: divMapa) {
        console.log('Aplicación iniciada', mapa);
    }
    
    constructor() {
        this.controladorDOM = new ControladorDOM();
    }
    iniciar() {
        console.log('Aplicación iniciada');
    }
    detener() {
        console.log('Aplicación detenida');
    }

}
