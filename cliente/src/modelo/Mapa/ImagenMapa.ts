import { EntidadGrafica } from "../Graficos/entidadgrafica";
import { graficoJuego } from  "../Graficos/graficoJuego";

  export class ImagenMapa {
    imagen: string;
    id: string;
    desdeX: number;
    desdeY: number;
    largo: number;
    alto: number;

    constructor(imagen: string, desdeX: number, desdeY: number, largo: number, alto: number) {
      this.id = imagen + Math.random().toString(36).substring(2, 10);
      this.imagen = imagen;
      this.desdeX = desdeX;
      this.desdeY = desdeY;
      this.largo = largo;
      this.alto = alto;
    }

    dibujar(graficos: graficoJuego) {
      graficos.AdddEntidad(new EntidadGrafica(this.id, this.imagen, this.desdeX, this.desdeY, this.largo, this.alto));
    }

    cargarImagenes(graficos: graficoJuego): void {
      graficos.AddImagen(this.imagen);
    }
  }