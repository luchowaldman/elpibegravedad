import { EntidadGrafica } from "../Graficos/entidadgrafica";
import { graficoJuego } from "../Graficos/graficoJuego";

export class Obstaculo {
    tipo: string;
    id: string;
    desdeX: number;
    desdeY: number;
    largo: number;
    alto: number;

    constructor(tipo: string, id: string, desdeX: number, desdeY: number, largo: number, alto: number) {
      this.id = id;
      this.tipo = tipo;
      this.desdeX = desdeX;
      this.desdeY = desdeY;
      this.largo = largo;
      this.alto = alto;
    }

    dibujar(graficos: graficoJuego) {
      graficos.AdddEntidad(new EntidadGrafica(this.id, this.tipo, this.desdeX, this.desdeY, this.largo, this.alto));
    }

    cargarImagenes(graficos: graficoJuego): void {
      graficos.AddImagen(this.tipo);
    }
  }