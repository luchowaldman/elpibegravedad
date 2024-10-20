import './assets/main.css'
import { graficoJuego } from './modelo/graficoJuego';
import { Client } from './modelo/client_socketio';

import { AccionGraficaAgregarEntidad, AccionGraficaAnimar, AccionGraficaCambiarVelovidad, AccionGraficaMostrarTexto, AccionGraficaEliminarTexto, AccionGraficaRotar, AccionGraficaModificarTexto } from './modelo/AccionGrafica';
import { EntidadGrafica } from './modelo/entidadgrafica';
import { Mapa } from './modelo/mapa';
import { Jugador } from './modelo/jugador';

let client: Client | undefined;
client = new Client();
client.connect();
const mapa: Mapa = new Mapa();
const graficos: graficoJuego = new graficoJuego();


document.addEventListener('DOMContentLoaded', () => {

    console.log("DOM Caragado");

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
            graficos.agenda.agregarAccionGrafica(0, new AccionGraficaAgregarEntidad(graficos, "player_server", "player_caminando", 130, 445));

        });
    }


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


            graficos.agenda.agregarAccionGrafica(0, new AccionGraficaRotar(graficos, "tech_piso1", 10));
            graficos.agenda.agregarAccionGrafica(0, new AccionGraficaRotar(graficos, "tech_piso2", 10));
            graficos.agenda.agregarAccionGrafica(0, new AccionGraficaRotar(graficos, "tech_piso3", 10));




            const ent2 = new EntidadGrafica("player", "player_caminando", 130, 445);
            graficos.AdddEntidad(ent2);

            /*          
                      graficos.agenda.agregarAccionGrafica(0 ,new  AccionGraficaAgregarEntidad(graficos, "bala_1", "player", 90, 90));
                      graficos.agenda.agregarAccionGrafica(0 ,new  AccionGraficaAgregarEntidad(graficos, "bala_1", "player", 90, 90));
                      graficos.agenda.agregarAccionGrafica(0 ,new  AccionGraficaAgregarEntidad(graficos, "bala_1", "player", 90, 90));
                      graficos.agenda.agregarAccionGrafica(0 ,new  AccionGraficaAgregarEntidad(graficos, "bala_1", "player", 90, 90));
          */
            graficos.agenda.agregarAccionGrafica(1, new AccionGraficaCambiarVelovidad(graficos, "player", 50, 0));
            graficos.agenda.agregarAccionGrafica(1, new AccionGraficaAnimar(graficos, "player", "animacioncaminando"));
            //            graficos.agenda.agregarAccionGrafica(1, new AccionGraficaEjecutarSonido(graficos,"cancion"));

            graficos.agenda.agregarAccionGrafica(420, new AccionGraficaCambiarVelovidad(graficos, "player", 70, -100));
            graficos.agenda.agregarAccionGrafica(420, new AccionGraficaAnimar(graficos, "player", "animacionvolando"));


            graficos.agenda.iniciar();

        });
    }



    const btnAstronauta = document.getElementById('btnAstronauta') as HTMLInputElement;
    if (btnAstronauta) {
        btnAstronauta.addEventListener('click', () => {
            const frame_actual = graficos.agenda.getFrame();
            graficos.agenda.agregarAccionGrafica(frame_actual, new AccionGraficaAgregarEntidad(graficos, "play", "player_caminando", 90, 90));
            for (let i = 0; i < 10; i++) {
                const fr = 45;
                const ft = 60;
                graficos.agenda.agregarAccionGrafica(frame_actual + (i * ft), new AccionGraficaRotar(graficos, "play", i * fr));
            }


        });
    }



    const btnLazo = document.getElementById('btnLazo') as HTMLInputElement;
    if (btnLazo) {
        btnLazo.addEventListener('click', () => {

            const frame_actual = graficos.agenda.getFrame();
            graficos.agenda.agregarAccionGrafica(frame_actual, new AccionGraficaAgregarEntidad(graficos, "lazo", "lazo", 300, 450));
            graficos.agenda.agregarAccionGrafica(frame_actual, new AccionGraficaCambiarVelovidad(graficos, "lazo", 100, -10));
            graficos.agenda.agregarAccionGrafica(frame_actual, new AccionGraficaAnimar(graficos, "lazo", "lazo"));

        });
    }





});
