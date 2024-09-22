import { Juego } from './juego';
import { Imagen } from './imagen';
import { Animacion } from './animacion';
import { EntidadGrafica } from './entidadgrafica';
import { Sonido } from './sonido';

export class JuegoFactory {
    juego_ejemplo1(): Juego {
        const juego = new Juego();

        
        juego.sonidos.push(new Sonido('cancion', '/audio/musica_juego.mp3'));


        juego.imagenes.push(new Imagen('sky', 'https://labs.phaser.io/assets/skies/space3.png'));
        juego.imagenes.push(new Imagen('ground', '/img/piso_02.png'));
        juego.imagenes.push(new Imagen('star', 'https://labs.phaser.io/assets/sprites/star.png'));

        // Añadir animaciones al vector 'animaciones'
        juego.animaciones.push(new Animacion('dude', 'https://labs.phaser.io/assets/sprites/dude.png', 32, 48));

        const ent = new EntidadGrafica("pared1", "ground", 200, 200);
        ent.escala = 1.4;
        juego.entidades.push(ent);


        juego.entidades.push(new EntidadGrafica("parte2", "ground", 430, 200));
        juego.entidades.push(new EntidadGrafica("parte3", "ground", 630, 200));

        
        const ent2 = new EntidadGrafica("tipo", "dude", 200, 140);
        ent2.numero_frame = 5;
        ent2.velocidadX = 40;
        juego.entidades.push(ent2);
        return juego;

        };

        
    }
