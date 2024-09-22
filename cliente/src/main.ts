import './assets/main.css'
import { graficoJuego }  from './modelo/graficoJuego';
import { JuegoFactory }  from './modelo/juegoFactory';

const juego: graficoJuego = (new JuegoFactory()).juego_ejemplo1();
juego.init();



document.addEventListener('DOMContentLoaded', () => {
    const rangeInput = document.getElementById('camarainput') as HTMLInputElement;
    if (rangeInput) {
        rangeInput.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            juego.setPosicionCamara(parseInt(target.value));
            //console.log(`Nuevo valor: ${target.value}`);
        });
    }

    const btnMover = document.getElementById('btnMover') as HTMLInputElement;
    if (btnMover) {
        btnMover.addEventListener('click', () => {
            const tipo = juego.GetEntidad("tipo");
            tipo?.setVelocity(40, 0);
            tipo?.setAnimacion("animacion");
        });
    }



    
});
