import { Juego } from './juego';
import { Imagen } from './imagen';
import { Animacion } from './animacion';
import { EntidadGrafica } from './entidadgrafica';
import { Sonido } from './sonido';
import { AnimacionEntidadGrafica } from './animacionentidadgrafica';

export class JuegoFactory {
    juego_ejemplo1(): Juego {
        const juego = new Juego();

        
        juego.sonidos.push(new Sonido('cancion', '/audio/musica_juego.mp3'));


        juego.imagenes.push(new Imagen('sky', '/img/fondocuaderno.jpg'));
        juego.imagenes.push(new Imagen('ground', '/img/piso_02.png'));
        juego.imagenes.push(new Imagen('piso1', '/img/piso_viro_ini.png'));
        juego.imagenes.push(new Imagen('piso2', '/img/piso_viro_med.png'));
        juego.imagenes.push(new Imagen('piso3', '/img/piso_viro_fin.png'));
        juego.imagenes.push(new Imagen('star', 'https://labs.phaser.io/assets/sprites/star.png'));

        // Añadir animaciones al vector 'animaciones'
        juego.animaciones.push(new Animacion('dude', 'https://labs.phaser.io/assets/sprites/dude.png', 32, 48));
        juego.animacionesendadgrafica.push(new AnimacionEntidadGrafica('animacion', 'dude', 0, 7, 10, -1))

        

        


        juego.entidades.push(new EntidadGrafica("ent_piso1", "piso1", 130, 500));
        juego.entidades.push(new EntidadGrafica("ent_piso2", "piso2", 230, 500));
        juego.entidades.push(new EntidadGrafica("ent_piso3", "piso2", 330, 500));
        juego.entidades.push(new EntidadGrafica("ent_piso4", "piso3", 430, 500));

        
        const ent2 = new EntidadGrafica("tipo", "dude", 200, 140);
        juego.entidades.push(ent2);
        return juego;

        };

        
    }
