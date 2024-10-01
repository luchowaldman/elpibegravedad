import { graficoJuego } from './graficoJuego';
import { Imagen } from './imagen';
import { Animacion } from './animacion';
import { Sonido } from './sonido';
import { AnimacionEntidadGrafica } from './animacionentidadgrafica';

import { Direcciones } from './Direcciones';

export class JuegoFactory {
    juego_ejemplo1(): graficoJuego {
        const juego = new graficoJuego();

        
        // Uso de la clase
        juego.sonidos.push(new Sonido('cancion', Direcciones.obtenerConstante('cancion')!));
        
        juego.imagenes.push(new Imagen('sky', Direcciones.obtenerConstante('sky')!));
        juego.imagenes.push(new Imagen('ground', Direcciones.obtenerConstante('ground')!));
        juego.imagenes.push(new Imagen('piso1', Direcciones.obtenerConstante('piso1')!));
        juego.imagenes.push(new Imagen('piso2', Direcciones.obtenerConstante('piso2')!));
        juego.imagenes.push(new Imagen('piso3', Direcciones.obtenerConstante('piso3')!));
        juego.imagenes.push(new Imagen('star', Direcciones.obtenerConstante('star')!));
        
        juego.animaciones.push(new Animacion('player_caminando', Direcciones.obtenerConstante('player_caminando')!, 70, 100));
        juego.animacionesendadgrafica.push(new AnimacionEntidadGrafica('animacioncaminando', 'player_caminando', 0, 1, 7, -1));
        juego.animaciones.push(new Animacion('player_volando', Direcciones.obtenerConstante('player_volando')!, 70, 100));
        juego.animacionesendadgrafica.push(new AnimacionEntidadGrafica('animacionvolando', 'player_volando', 0, 1, 7, -1));
        
        juego.animaciones.push(new Animacion('lazo', Direcciones.obtenerConstante('lazo')!, 20, 30));
        juego.animacionesendadgrafica.push(new AnimacionEntidadGrafica('lazo', 'lazo', 0, 2, 4, -1));
        
                

        


        


        return juego;

        };

        
    }
