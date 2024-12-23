import { EntidadGrafica } from "../Graficos/entidadgrafica";
import { graficoJuego } from "../Graficos/graficoJuego";
import { ImagenMapa } from "./ImagenMapa";
import { InicioJugadores } from "./InicioJugadores";
import { Meta } from "./meta";
import { Obstaculo } from "./Obstaculo";
import { Plataforma } from "./Plataforma";
import { TextoMapa } from "./textoMapa";
import TipoPlataformaFactory from "./tiposplataforma/tipoplataformafactory";

export class Mapa {
    nombre: string = '';
    largo: number = 0;
    fondo: string = '';
    cancion: string = '';
    plataformas: Plataforma[] = [];
    obstaculos: Obstaculo[] = [];
    obstaculos_mortales: Obstaculo[] = [];
    inicio_jugadores: InicioJugadores =  new InicioJugadores(0, 0);
    meta: Meta = new Meta(0, 0, 0);
    imagenes: ImagenMapa[] = [];
    textos: TextoMapa[] = [];
    
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
      this.obstaculos_mortales = mapaData.obstaculos_mortales.map((obstaculo: Obstaculo) => new Obstaculo(obstaculo.tipo, obstaculo.id, obstaculo.desdeX, obstaculo.desdeY, obstaculo.largo, obstaculo.alto));
      this.imagenes = mapaData.imagenes.map((imagen: ImagenMapa) => new ImagenMapa(imagen.imagen, imagen.desdeX, imagen.desdeY, imagen.largo, imagen.alto));
      this.textos = mapaData.textos.map((texto: TextoMapa) => new TextoMapa(texto.texto, texto.desdeX, texto.desdeY, texto.largo, texto.alto, texto.pixeles, texto.color, texto.fuente));
      this.inicio_jugadores = new InicioJugadores(mapaData.inicio_jugadores.x, mapaData.inicio_jugadores.y);
      this.meta = new Meta(mapaData.meta.x, mapaData.meta.y, mapaData.meta.alto);
      
      } catch (error) {
        console.error('Error al cargar el mapa:', error);
      }
    }

    dibujarMapa(graficos: graficoJuego) {

        this.imagenes.forEach((imagen) => {
          imagen.dibujar(graficos);
        });

        this.textos.forEach((t) => {
          t.dibujar(graficos);
        });


        this.plataformas.forEach((plataforma, index) => {
          console.log("Dibujando plataforma");
            plataforma.dibujar(graficos, index);
        });
    
        this.obstaculos.forEach((obstaculo) => {
          obstaculo.dibujar(graficos);
          
        });
        this.obstaculos_mortales.forEach((obstaculo) => {
          obstaculo.dibujar(graficos);
        });

        graficos.AdddEntidad(new EntidadGrafica("meta", "meta", this.meta.x, this.meta.y, 50, 600));
      }

      
    cargarImagenes(graficos: graficoJuego) {
      
      graficos.setLargo(this.largo);
      graficos.AddImagen(this.fondo);
      graficos.AddImagen("meta");
      this.plataformas.forEach((plataforma) => {
        plataforma.cargarImagenes(graficos);
    });

    this.obstaculos.forEach((obstaculo) => {
      obstaculo.cargarImagenes(graficos);
      
    });
    this.obstaculos_mortales.forEach((obstaculo) => {
      obstaculo.cargarImagenes(graficos);
      
    });
    this.imagenes.forEach((imagen) => {
      imagen.cargarImagenes(graficos);
    });

    graficos.AddSonido(this.cancion);
 }
}
 
  