import './assets/main.css'
import { AccionEscribirPorConsola, AccionGrafica, AccionGraficaAgregarEntidad, AccionGraficaAnimar, AccionGraficaCambiarVelovidad, AccionGraficaEjecutarSonido } from './modelo/AccionGrafica';
import { graficoJuego }  from './modelo/graficoJuego';
import { JuegoFactory }  from './modelo/juegoFactory';

const graficos: graficoJuego = (new JuegoFactory()).juego_ejemplo1();
graficos.init();

document.addEventListener('DOMContentLoaded', () => {
    const rangeInput = document.getElementById('camarainput') as HTMLInputElement;
    if (rangeInput) {
        rangeInput.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            graficos.setPosicionCamara(parseInt(target.value));
            //console.log(`Nuevo valor: ${target.value}`);
        });
    }

    const btnMover = document.getElementById('btnMover') as HTMLInputElement;
    if (btnMover) {
        btnMover.addEventListener('click', () => {

            
            const player = graficos.GetEntidad("player");
            const sonido = graficos.GetSonido("cancion")
            graficos.agenda.agregarAccionGrafica(1, new AccionGraficaCambiarVelovidad(player, 50, 0) );
            graficos.agenda.agregarAccionGrafica(1, new AccionGraficaAnimar(player, "animacioncaminando") );
            graficos.agenda.agregarAccionGrafica(1, new AccionGraficaEjecutarSonido(sonido));
            
            graficos.agenda.agregarAccionGrafica(420, new AccionGraficaCambiarVelovidad(player, 70, -100) );
            graficos.agenda.agregarAccionGrafica(420, new AccionGraficaAnimar(player, "animacionvolando") );
            
            graficos.agenda.iniciar();
        });
    }


    
    const btnAccion = document.getElementById('btnAccion') as HTMLInputElement;
    if (btnAccion) {
        btnAccion.addEventListener('click', () => {
            const frame_actual = graficos.agenda.getFrame(); 
            graficos.agenda.agregarAccionGrafica(frame_actual ,new  AccionGraficaAgregarEntidad(graficos, "bala_1", "player", 90, 90));

        });
    }




    
});
