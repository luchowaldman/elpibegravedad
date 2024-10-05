import { graficoJuego } from './graficoJuego';

export class JuegoFactory {
    juego_ejemplo1(): graficoJuego {
        const juego = new graficoJuego();

        // Uso de la clase
        
        juego.AddSonido('cancion');
        
        juego.AddImagen('sky');
        juego.AddImagen('ground');
        juego.AddImagen('piso1');
        juego.AddImagen('piso2');
        juego.AddImagen('piso3');
        juego.AddImagen('techo1');
        juego.AddImagen('techo2');
        juego.AddImagen('techo3');
        juego.AddImagen('caja');
        juego.AddImagen('star');
        
        juego.AddAnimacion('player_caminando', 70, 100);
        juego.AddAnimacionEntidadGrafica('animacioncaminando', 'player_caminando', 0, 1, 7, -1);
        juego.AddAnimacion('player_volando', 70, 100);
        juego.AddAnimacionEntidadGrafica('animacionvolando', 'player_volando', 0, 1, 7, -1);
        
        juego.AddAnimacion('lazo', 20, 30);
        juego.AddAnimacionEntidadGrafica('lazo', 'lazo', 0, 2, 4, -1);
                

        


        


        return juego;

        };

        
    }
