import { Aplicacion } from './aplicacion';

const aplicacion = new Aplicacion();
aplicacion.iniciar();


/*
let client: Client | undefined; 
client = new Client();
const mapa: Mapa = new Mapa();
const graficos: graficoJuego = new graficoJuego();


client.setPosicionJugadoresHandler((posicionesDeLosJugadores) => {

    console.log(posicionesDeLosJugadores)
    for (let i = 0; i < posicionesDeLosJugadores.length; i++) {
        let x = posicionesDeLosJugadores[i].x
        let y = posicionesDeLosJugadores[i].y
        

        
        console.log("received player %s position (%d, %d)", i, x, y)
        jugadores[i].setPosicion(graficos, x, y);
    }
});

await mapa.cargarMapa("./mapas/mapa1.json");
/*


            // TODO hacer un for para todos los jugadores
            // console.log("received player 2 position (%d, %d)", posicionesDeLosJugadores[1].x, posicionesDeLosJugadores[1].y)
            console.log(posicionesDeLosJugadores);
            let x = posicionesDeLosJugadores[0].x
            let y = posicionesDeLosJugadores[0].y

            console.log("received player 1 position (%d, %d)", x, y)
            graficos.agenda.agregarAccionGrafica(1, new AccionGraficaSetPosicion(graficos, "player_server", y, x));
            graficos.agenda.iniciar();
*/
/*

import { graficoJuego } from './modelo/graficoJuego';
import { Client } from './modelo/client_socketio';
import { AccionGraficaAgregarEntidad, AccionGraficaAnimar, AccionGraficaCambiarVelovidad, AccionGraficaMostrarTexto, AccionGraficaEliminarTexto, AccionGraficaRotar, AccionGraficaModificarTexto } from './modelo/AccionGrafica';
import { EntidadGrafica } from './modelo/entidadgrafica';
import { Mapa } from './modelo/mapa';
import { Jugador } from './modelo/jugador';


graficos.AddAnimacion('player_caminando', 70, 100);
graficos.AddAnimacionEntidadGrafica('animacioncaminando', 'player_caminando', 0, 1, 7, -1);
graficos.AddAnimacion('player_volando', 70, 100);
graficos.AddAnimacionEntidadGrafica('animacionvolando', 'player_volando', 0, 1, 7, -1);
graficos.AddAnimacion('player_muriendo', 70, 100);
graficos.AddAnimacionEntidadGrafica('animacionmuriendo', 'player_muriendo', 0, 1, 7, -1);



mapa.cargarImagenes(graficos);
await graficos.init();
graficos.agenda.iniciar();
graficos.agenda.agregarAccionGrafica(0 ,new  AccionGraficaMostrarTexto(graficos, "texto1", "Cargando Mapa...", 600, 100));

const jugadores: Jugador[] = [
    new Jugador("Play1",0x0000ff, 330, 535),
    new Jugador("Play2",0xff0000, 330, 535)
];

setTimeout(() => {
    mapa.dibujarMapa(graficos);    
    
    graficos.agenda.agregarAccionGrafica(0 ,new  AccionGraficaModificarTexto(graficos, "texto1", "Conectando con servidor..."));


    jugadores[0].dibujar(graficos);
    jugadores[1].dibujar(graficos);
    graficos.agenda.agregarAccionGrafica(200 ,new  AccionGraficaModificarTexto(graficos, "texto1", ""));
    graficos.agenda.agregarAccionGrafica(200 ,new  AccionGraficaEliminarTexto(graficos, "texto1"));
    
    
}, 100);


setTimeout(() => {
    jugadores[1].animar(graficos, "animacionmuriendo");
}, 2000);
*/
document.addEventListener('DOMContentLoaded', () => {


    aplicacion.DOMIniciado();
    const nuevoJuego = document.getElementById('nuevoJuego_Mapa1') as HTMLInputElement;
    if (nuevoJuego) {
        console.log("rangeInput", nuevoJuego);
    }

});


graficos.controles.setOnKeyPressCallback((key: string) => {
    if (key == "Tecla G") {
        console.log("Envia Cambio Gravedadg");
        client?.sendChangeGravity();
    }
    console.log(key);
});


client.setPosicionJugadoresHandler((posicionesDeLosJugadores) => {

    console.log(posicionesDeLosJugadores)
    for (let i = 0; i < posicionesDeLosJugadores.length; i++) {
        let x = posicionesDeLosJugadores[i].x
        let y = posicionesDeLosJugadores[i].y



        console.log("received player %s position (%d, %d)", i, x, y)
        jugadores[i].setPosicion(graficos, x, y);
    }
});

await mapa.cargarMapa("./mapas/mapa1.json");
graficos.AddAnimacion('player_caminando', 35, 50);
graficos.AddAnimacionEntidadGrafica('animacioncaminando', 'player_caminando', 0, 1, 7, -1);
graficos.AddAnimacion('player_volando', 35, 50);
graficos.AddAnimacionEntidadGrafica('animacionvolando', 'player_volando', 0, 1, 7, -1);



mapa.cargarImagenes(graficos);
await graficos.init();
graficos.agenda.iniciar();
graficos.agenda.agregarAccionGrafica(0, new AccionGraficaMostrarTexto(graficos, "texto1", "Cargando Mapa...", 600, 100));

const jugadores: Jugador[] = [
    new Jugador("Play1", 0x0000ff, 330, 450),
    new Jugador("Play2", 0xff0000, 330, 200)
];

setTimeout(() => {
    mapa.dibujarMapa(graficos);

    graficos.agenda.agregarAccionGrafica(0, new AccionGraficaModificarTexto(graficos, "texto1", "Conectando con servidor..."));


    jugadores[0].dibujar(graficos);
    jugadores[1].dibujar(graficos);
    graficos.agenda.agregarAccionGrafica(200, new AccionGraficaModificarTexto(graficos, "texto1", ""));
    graficos.agenda.agregarAccionGrafica(200, new AccionGraficaEliminarTexto(graficos, "texto1"));


}, 100);


setTimeout(() => {
    jugadores[1].animar(graficos, "animacionvolando");
}, 2000);

