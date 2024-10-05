import { EntidadGrafica } from "./entidadgrafica";
import { graficoJuego } from "./graficoJuego";

  
  export class Obstaculo {
    
   
    dibujar(graficos: graficoJuego) {
      graficos.AdddEntidad(new EntidadGrafica(this.id, this.tipo, this.desdeX, this.desdeY));
    }
    tipo: string;
    id: string;
    desdeX: number;
    desdeY: number;
  
    constructor(tipo: string, id: string, desdeX: number, desdeY: number) {
      this.id = id;
      this.tipo = tipo;
      this.desdeX = desdeX;
      this.desdeY = desdeY;
    }

    cargarImagenes(graficos: graficoJuego): void {
      graficos.AddImagen(this.tipo);
  }
  }
  