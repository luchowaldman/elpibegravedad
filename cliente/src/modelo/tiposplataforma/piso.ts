import { EntidadGrafica } from "../entidadgrafica";
import { graficoJuego } from "../graficoJuego";
import { Plataforma } from "../Plataforma";
const tamanio_figura = 100;

export default class Piso extends Plataforma {

  
    constructor(desdeX: number, desdeY: number, hastaX: number, hastaY: number, alto: number) {
        super(desdeX, desdeY, hastaX, hastaY, alto);
        this.tipo = "Piso";
    }

    dibujar(graficos: graficoJuego, index: number): void {
        
        const id = `ent_piso${index + 1}`;

        graficos.AdddEntidad(new EntidadGrafica(id, "piso1", this.desdeX, this.desdeY, 100, this.alto));
        for (let posX = this.desdeX + tamanio_figura; posX < this.hastaX - tamanio_figura; posX += tamanio_figura ) {
            graficos.AdddEntidad(new EntidadGrafica(id, "piso2", posX, this.desdeY, 100, this.alto));
        }
        graficos.AdddEntidad(new EntidadGrafica(id, "piso3", this.hastaX - 100, this.desdeY, 100, this.alto));
        
    }

    cargarImagenes(graficos: graficoJuego): void {
        graficos.AddImagen("piso1");
        graficos.AddImagen("piso2");
        graficos.AddImagen("piso3");
    }
}
