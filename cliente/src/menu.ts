import { Aplicacion } from './aplicacion';

const aplicacion = new Aplicacion();
aplicacion.iniciar();


document.addEventListener('DOMContentLoaded', () => {
    
    
    aplicacion.DOMIniciado();
    const nuevoJuego = document.getElementById('nuevoJuego_Mapa1') as HTMLInputElement;
    if (nuevoJuego) {
        console.log("rangeInput", nuevoJuego);
    }
    
});
