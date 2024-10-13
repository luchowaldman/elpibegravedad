import './assets/main.css'
import { graficoJuego } from './modelo/graficoJuego';
import { Client } from './modelo/client_socketio';

import { AccionGraficaAgregarEntidad, AccionGraficaAnimar, AccionGraficaCambiarVelovidad, AccionGraficaMostrarTexto, AccionGraficaEliminarTexto, AccionGraficaRotar, AccionGraficaModificarTexto } from './modelo/AccionGrafica';
import { EntidadGrafica } from './modelo/entidadgrafica';
import { Mapa } from './modelo/mapa';
import { Jugador } from './modelo/jugador';

let client: Client | undefined; 
client = new Client();
const mapa: Mapa = new Mapa();
const graficos: graficoJuego = (new graficoJuego());


document.addEventListener('DOMContentLoaded', () => {

    console.log("DOM Caragado");
    const rangeInput = document.getElementById('camarainput') as HTMLInputElement;
    if (rangeInput) {
        console.log("rangeInput", rangeInput);
        rangeInput.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            graficos.setPosicionCamara(parseInt(target.value));
        });
    }

    

    const btnIniciarCliente = document.getElementById('btnIniciarCliente') as HTMLInputElement;
    if (btnIniciarCliente) {
        btnIniciarCliente.addEventListener('click', () => {
            client = new Client();
            graficos.agenda.agregarAccionGrafica(0 ,new  AccionGraficaAgregarEntidad(graficos, "player_server", "player_caminando", 130, 445));

        });
    }


    const btnIniciarAgenda= document.getElementById('btnIniciarAgenda') as HTMLInputElement;
    if (btnIniciarAgenda) {
        btnIniciarAgenda.addEventListener('click', async () => {
            
                graficos.agenda.iniciar();


        });
    };
    

    
    const btnCargarMapa= document.getElementById('btnCargarMapa') as HTMLInputElement;
    if (btnCargarMapa) {
        btnCargarMapa.addEventListener('click', async () => {
            
        });
    };

    const btnCambiarGravedad = document.getElementById('btnCambirGravedad') as HTMLInputElement;
    if (btnCambiarGravedad) {
        btnCambiarGravedad.addEventListener('click', () => {
            client?.sendChangeGravity();

        });
    }


    const btnMover = document.getElementById('btnMover') as HTMLInputElement;
    if (btnMover) {
        btnMover.addEventListener('click', () => {



            graficos.AdddEntidad(new EntidadGrafica("ent_piso1", "piso1", 130, 500));
            graficos.AdddEntidad(new EntidadGrafica("ent_piso2", "piso2", 230, 500));
            graficos.AdddEntidad(new EntidadGrafica("ent_piso3", "piso2", 330, 500));
            graficos.AdddEntidad(new EntidadGrafica("ent_piso4", "piso3", 430, 500));

            
            graficos.AdddEntidad(new EntidadGrafica("tech_piso1", "piso1", 550, 100));
            graficos.AdddEntidad(new EntidadGrafica("tech_piso2", "piso2", 645, 117));
            graficos.AdddEntidad(new EntidadGrafica("tech_piso3", "piso3", 740, 134));

            
            graficos.agenda.agregarAccionGrafica(0,new  AccionGraficaRotar(graficos, "tech_piso1", 10));
            graficos.agenda.agregarAccionGrafica(0,new  AccionGraficaRotar(graficos, "tech_piso2", 10));
            graficos.agenda.agregarAccionGrafica(0,new  AccionGraficaRotar(graficos, "tech_piso3", 10));



        
            const ent2 = new EntidadGrafica("player", "player_caminando", 130, 445);
            graficos.AdddEntidad(ent2);

  /*          
            graficos.agenda.agregarAccionGrafica(0 ,new  AccionGraficaAgregarEntidad(graficos, "bala_1", "player", 90, 90));
            graficos.agenda.agregarAccionGrafica(0 ,new  AccionGraficaAgregarEntidad(graficos, "bala_1", "player", 90, 90));
            graficos.agenda.agregarAccionGrafica(0 ,new  AccionGraficaAgregarEntidad(graficos, "bala_1", "player", 90, 90));
            graficos.agenda.agregarAccionGrafica(0 ,new  AccionGraficaAgregarEntidad(graficos, "bala_1", "player", 90, 90));
*/
            graficos.agenda.agregarAccionGrafica(1, new AccionGraficaCambiarVelovidad(graficos,"player", 50, 0) );
            graficos.agenda.agregarAccionGrafica(1, new AccionGraficaAnimar(graficos,"player", "animacioncaminando") );
//            graficos.agenda.agregarAccionGrafica(1, new AccionGraficaEjecutarSonido(graficos,"cancion"));
            
            graficos.agenda.agregarAccionGrafica(420, new AccionGraficaCambiarVelovidad(graficos,"player", 70, -100) );
            graficos.agenda.agregarAccionGrafica(420, new AccionGraficaAnimar(graficos,"player", "animacionvolando") );

            
            graficos.agenda.iniciar();
            
        });
    }


    
    const btnAstronauta = document.getElementById('btnAstronauta') as HTMLInputElement;
    if (btnAstronauta) {
        btnAstronauta.addEventListener('click', () => {
            const frame_actual = graficos.agenda.getFrame(); 
            graficos.agenda.agregarAccionGrafica(frame_actual ,new  AccionGraficaAgregarEntidad(graficos, "play", "player_caminando", 90, 90));
            for (let i = 0; i < 10; i++) {
                const fr = 45;
                const ft = 60;
                graficos.agenda.agregarAccionGrafica(frame_actual + (i * ft),new  AccionGraficaRotar(graficos, "play", i * fr));
            }
            
            
        });
    }


    
    const btnLazo = document.getElementById('btnLazo') as HTMLInputElement;
    if (btnLazo) {
        btnLazo.addEventListener('click', () => {
            
            const frame_actual = graficos.agenda.getFrame(); 
            graficos.agenda.agregarAccionGrafica(frame_actual ,new  AccionGraficaAgregarEntidad(graficos, "lazo", "lazo", 300, 450));
            graficos.agenda.agregarAccionGrafica(frame_actual ,new  AccionGraficaCambiarVelovidad(graficos, "lazo", 100, -10));
            graficos.agenda.agregarAccionGrafica(frame_actual ,new  AccionGraficaAnimar(graficos, "lazo", "lazo"));
            
        });
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
graficos.AddAnimacion('player_caminando', 70, 100);
graficos.AddAnimacionEntidadGrafica('animacioncaminando', 'player_caminando', 0, 1, 7, -1);
graficos.AddAnimacion('player_volando', 70, 100);
graficos.AddAnimacionEntidadGrafica('animacionvolando', 'player_volando', 0, 1, 7, -1);



mapa.cargarImagenes(graficos);
await graficos.init();
graficos.agenda.iniciar();
graficos.agenda.agregarAccionGrafica(0 ,new  AccionGraficaMostrarTexto(graficos, "texto1", "Cargando Mapa...", 600, 100));

const jugadores: Jugador[] = [
    new Jugador("Play1",0x0000ff, 330, 450),
    new Jugador("Play2",0xff0000, 330, 200)
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
    jugadores[1].animar(graficos, "animacionvolando");
}, 2000);

