import { EntidadGrafica } from "../entidadgrafica";
import { graficoJuego } from "../graficoJuego";
import { Plataforma } from "../Plataforma";
const tamanio_figura = 100;

export default class Piso extends Plataforma {

  
    constructor(desdeX: number, desdeY: number, hastaX: number, hastaY: number) {
        super(desdeX, desdeY, hastaX, hastaY);
        this.tipo = "Piso";
    }

    dibujar(graficos: graficoJuego, index: number): void {
        
        const id = `ent_piso${index + 1}`;
        console.log(id, "Dibuja piso", this.desdeX, this.desdeY);

        graficos.AdddEntidad(new EntidadGrafica(id, "piso1", this.desdeX, this.desdeY));
        for (let posX = this.desdeX + tamanio_figura; posX < this.hastaX - tamanio_figura; posX += tamanio_figura ) {
            console.log(posX);
            graficos.AdddEntidad(new EntidadGrafica(id, "piso2", posX, this.desdeY));
        }
        graficos.AdddEntidad(new EntidadGrafica(id, "piso3", this.hastaX - 100, this.desdeY));
        
    }
}
