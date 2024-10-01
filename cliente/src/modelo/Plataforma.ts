import { EntidadGrafica } from "./entidadgrafica";
import { graficoJuego } from "./graficoJuego";

export class Plataforma {
    dibujar(graficos: graficoJuego, index: number) {
        
        const id = `ent_piso${index + 1}`;
        console.log(id, this.tipo, this.desdeX, this.desdeY);
        graficos.AdddEntidad(new EntidadGrafica(id, this.tipo, this.desdeX, this.desdeY));
    }
    tipo: string;
    desdeX: number;
    desdeY: number;
    hastaX: number;
    hastaY: number;
  
    constructor(tipo: string, desdeX: number, desdeY: number, hastaX: number, hastaY: number) {
      this.tipo = tipo;
      this.desdeX = desdeX;
      this.desdeY = desdeY;
      this.hastaX = hastaX;
      this.hastaY = hastaY;
    }
  }