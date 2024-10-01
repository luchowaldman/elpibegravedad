import { EntidadGrafica } from "./entidadgrafica";
import { graficoJuego } from "./graficoJuego";

export class Plataforma {
    dibujar(graficos: graficoJuego, index: number) {
        console.log("plataforma", graficos, index)
    }
    tipo: string = "";
    desdeX: number;
    desdeY: number;
    hastaX: number;
    hastaY: number;
  
    constructor(desdeX: number, desdeY: number, hastaX: number, hastaY: number) {
      this.desdeX = desdeX;
      this.desdeY = desdeY;
      this.hastaX = hastaX;
      this.hastaY = hastaY;
    }
  }