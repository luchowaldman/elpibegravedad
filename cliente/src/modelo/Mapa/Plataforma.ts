import { graficoJuego } from "../Graficos/graficoJuego";

export class Plataforma {
    
    dibujar(graficos: graficoJuego, index: number) {
        console.log("plataforma", graficos, index)
    }
    tipo: string = "";
    desdeX: number;
    desdeY: number;
    hastaX: number;
    hastaY: number;
    alto: number;
  
    constructor(desdeX: number, desdeY: number, hastaX: number, hastaY: number, alto: number) {
      this.desdeX = desdeX;
      this.desdeY = desdeY;
      this.hastaX = hastaX;
      this.hastaY = hastaY;
      this.alto = alto;
    }

    cargarImagenes(graficos: graficoJuego) {
      graficos.AddImagen(this.tipo);
    }
  }