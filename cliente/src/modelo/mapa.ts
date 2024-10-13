import { InicioJugadores } from "./InicioJugadores";
import { Obstaculo } from "./Obstaculo";
import { Plataforma } from "./Plataforma";

import { graficoJuego } from "./graficoJuego";
import TipoPlataformaFactory from "./tiposplataforma/tipoplataformafactory";

export class Mapa {
    nombre: string = '';
    largo: number = 0;
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
      this.largo = mapaData.largo;
      this.fondo = mapaData.fondo;
      this.cancion = mapaData.cancion;
      this.plataformas = mapaData.plataformas.map((plataforma: Plataforma) => TipoPlataformaFactory.Crear(plataforma.tipo, plataforma.desdeX, plataforma.desdeY, plataforma.hastaX, plataforma.hastaY, plataforma.alto));
      this.obstaculos = mapaData.obstaculos.map((obstaculo: Obstaculo) => new Obstaculo(obstaculo.tipo, obstaculo.id, obstaculo.desdeX, obstaculo.desdeY, obstaculo.largo, obstaculo.alto));
      this.inicio_jugadores = new InicioJugadores(mapaData.inicio_jugadores.x, mapaData.inicio_jugadores.y);
      
      } catch (error) {
        console.error('Error al cargar el mapa:', error);
      }
    }

    dibujarMapa(graficos: graficoJuego) {
        this.plataformas.forEach((plataforma, index) => {
            plataforma.dibujar(graficos, index);
        });
    
        this.obstaculos.forEach((obstaculo) => {
          obstaculo.dibujar(graficos);
          
        });
        
      }

      
    cargarImagenes(graficos: graficoJuego) {
      
      graficos.setLargo(this.largo);
      graficos.AddImagen(this.fondo);
      this.plataformas.forEach((plataforma) => {
        plataforma.cargarImagenes(graficos);
    });

    this.obstaculos.forEach((obstaculo) => {
      obstaculo.cargarImagenes(graficos);
      
    });
  }
 }
 
  