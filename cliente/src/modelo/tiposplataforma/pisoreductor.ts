import { EntidadGrafica } from "../Graficos/entidadgrafica";
import { graficoJuego } from "../Graficos/graficoJuego";
import { Plataforma } from "../Mapa/Plataforma";

const tamanio_figura = 100;

export default class PisoReductor extends Plataforma {

  
    constructor(desdeX: number, desdeY: number, hastaX: number, hastaY: number, alto: number) {
        super(desdeX, desdeY, hastaX, hastaY, alto);
        this.tipo = "Piso";
    }

    dibujar(graficos: graficoJuego, index: number): void {
        
        const id = `ent_piso${index + 1}`;

        graficos.AdddEntidad(new EntidadGrafica(id, "piso_div_1", this.desdeX, this.desdeY, 100, this.alto));
        for (let posX = this.desdeX + tamanio_figura; posX < this.hastaX - tamanio_figura; posX += tamanio_figura ) {
            graficos.AdddEntidad(new EntidadGrafica(id, "piso_div_2", posX, this.desdeY, 100, this.alto));
        }
        graficos.AdddEntidad(new EntidadGrafica(id, "piso_div_3", this.hastaX - 100, this.desdeY, 100, this.alto));
        
    }

    cargarImagenes(graficos: graficoJuego): void {
        graficos.AddImagen("piso_div_1");
        graficos.AddImagen("piso_div_2");
        graficos.AddImagen("piso_div_3");
    }
}
