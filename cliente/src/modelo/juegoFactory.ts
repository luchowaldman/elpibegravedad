import { graficoJuego } from './graficoJuego';
import { Imagen } from './imagen';
import { Animacion } from './animacion';
import { EntidadGrafica } from './entidadgrafica';
import { Sonido } from './sonido';
import { AnimacionEntidadGrafica } from './animacionentidadgrafica';
import { AgendaAccionesGrafica }  from './AgendaAccionesGrafica';
import { AccionGrafica, AccionGraficaCambiarVelovidad }  from './AccionGrafica';


export class JuegoFactory {
    juego_ejemplo1(): graficoJuego {
        const juego = new graficoJuego();

        
        juego.sonidos.push(new Sonido('cancion', '/audio/musica_juego.mp3'));


        juego.imagenes.push(new Imagen('sky', '/img/fondocuaderno.jpg'));
        juego.imagenes.push(new Imagen('ground', '/img/piso_02.png'));
        juego.imagenes.push(new Imagen('piso1', '/img/piso_viro_ini.png'));
        juego.imagenes.push(new Imagen('piso2', '/img/piso_viro_med.png'));
        juego.imagenes.push(new Imagen('piso3', '/img/piso_viro_fin.png'));
        juego.imagenes.push(new Imagen('star', 'https://labs.phaser.io/assets/sprites/star.png'));

        // Añadir animaciones al vector 'animaciones'
        juego.animaciones.push(new Animacion('player_caminando', '/img/player_caminando1.png', 70, 100));
        juego.animacionesendadgrafica.push(new AnimacionEntidadGrafica('animacioncaminando', 'player_caminando', 0, 1, 7, -1))
        juego.animaciones.push(new Animacion('player_volando', '/img/player_volando.png', 70, 100));
        juego.animacionesendadgrafica.push(new AnimacionEntidadGrafica('animacionvolando', 'player_volando', 0, 1, 7, -1))

        

        


        


        return juego;

        };

        
    }
