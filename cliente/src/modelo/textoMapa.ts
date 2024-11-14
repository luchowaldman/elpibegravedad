import { AccionGraficaMostrarTexto } from "./AccionGrafica";
import { graficoJuego } from "./graficoJuego";
import { Texto } from "./Texto";
export class TextoMapa {
  texto: string;
  desdeX: number;
  desdeY: number;
  largo: number;
  alto: number;
  pixeles: string;
  color: string;
  fuente: string;

  constructor(texto: string, desdeX: number, desdeY: number, largo: number, alto: number, pixeles: string, color: string, fuente: string) {
    console.log("Creando texto", texto);
    this.texto = texto;
    this.desdeX = desdeX;
    this.desdeY = desdeY;
    this.largo = largo;
    this.alto = alto;
    this.pixeles = pixeles;
    this.color = color;
    this.fuente = fuente;
  }

  dibujar(graficos: graficoJuego) {
    console.log("Dibujando texto", this.texto);
    graficos.mostrarTexto(new Texto("", this.desdeX, this.desdeY, this.texto, this.pixeles, this.color, this.fuente));
  }

  cargarImagenes(graficos: graficoJuego): void {

  }
}