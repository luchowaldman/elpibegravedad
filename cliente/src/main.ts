import './assets/main.css'
import { AccionGrafica, AccionGraficaAnimar, AccionGraficaCambiarVelovidad } from './modelo/AccionGrafica';
import { graficoJuego } from './modelo/graficoJuego';
import { JuegoFactory } from './modelo/juegoFactory';
import { Client } from './modelo/client_socketio';

const graficos: graficoJuego = (new JuegoFactory()).juego_ejemplo1();
graficos.init();

var client = new Client(graficos);

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
            client.sendChangeGravity();
        });
    }
});
