import { InicioJugadores } from "./InicioJugadores";
import { Obstaculo } from "./Obstaculo";
import { Plataforma } from "./Plataforma";

import { graficoJuego } from "./graficoJuego";
import { EntidadGrafica } from "./entidadgrafica";

export class Mapa {
    nombre: string = '';
    ancho: number = 0;
    fondo: string = '';
    cancion: string = '';
    plataformas: Plataforma[] = [];
    obstaculos: Obstaculo[] = [];
    inicio_jugadores: InicioJugadores =  new InicioJugadores(0, 0);
    
    async cargarMapa(rutaArchivo: string) {
      try {
        const response = await fetch(rutaArchivo);
        const mapaData = await response.json();
        
      this.nombre = mapaData.nombre;
      this.ancho = mapaData.ancho;
      this.fondo = mapaData.fondo;
      this.cancion = mapaData.cancion;
      this.plataformas = mapaData.plataformas.map((plataforma: Plataforma) => new Plataforma(plataforma.tipo, plataforma.desdeX, plataforma.desdeY, plataforma.hastaX, plataforma.hastaY));
      this.obstaculos = mapaData.obstaculos.map((obstaculo: Obstaculo) => new Obstaculo(obstaculo.tipo, obstaculo.desdeX, obstaculo.desdeY));
      this.inicio_jugadores = new InicioJugadores(mapaData.inicio_jugadores.x, mapaData.inicio_jugadores.y);
      
      console.log(this);
      } catch (error) {
        console.error('Error al cargar el mapa:', error);
      }
    }

    dibujarMapa(graficos: graficoJuego) {
        // Dibujar plataformas
        console.log("ddibu");
        this.plataformas.forEach((plataforma, index) => {
          console.log(plataforma);
            plataforma.dibujar(graficos, index);
        });
    
        // Dibujar obstáculos
        this.obstaculos.forEach((obstaculo, index) => {
          const id = `obs_${index + 1}`;
          graficos.AdddEntidad(new EntidadGrafica(id, obstaculo.tipo, obstaculo.desdeX, obstaculo.desdeY));
        });
    
        // Dibujar jugador
        const jugador = new EntidadGrafica("player", "player_caminando", this.inicio_jugadores.x, this.inicio_jugadores.y);
        graficos.AdddEntidad(jugador);
      }
 }
 
  