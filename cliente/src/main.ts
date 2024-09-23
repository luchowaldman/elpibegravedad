import './assets/main.css'
import { AccionEscribirPorConsola, AccionGrafica, AccionGraficaAgregarEntidad, AccionGraficaAnimar, AccionGraficaCambiarVelovidad, AccionGraficaEjecutarSonido } from './modelo/AccionGrafica';
import { EntidadGrafica } from './modelo/entidadgrafica';
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

            

            graficos.AdddEntidad(new EntidadGrafica("ent_piso1", "piso1", 130, 500));
            graficos.AdddEntidad(new EntidadGrafica("ent_piso2", "piso2", 230, 500));
            graficos.AdddEntidad(new EntidadGrafica("ent_piso3", "piso2", 330, 500));
            graficos.AdddEntidad(new EntidadGrafica("ent_piso4", "piso3", 430, 500));

        
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
            graficos.agenda.agregarAccionGrafica(1, new AccionGraficaEjecutarSonido(graficos,"cancion"));
            
            graficos.agenda.agregarAccionGrafica(420, new AccionGraficaCambiarVelovidad(graficos,"player", 70, -100) );
            graficos.agenda.agregarAccionGrafica(420, new AccionGraficaAnimar(graficos,"player", "animacionvolando") );

            
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
