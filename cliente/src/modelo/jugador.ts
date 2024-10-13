import { AccionGraficaAnimar, AccionGraficaCambiarVelovidad, AccionGraficaSetPosicion } from "./AccionGrafica";
import { EntidadGrafica } from "./entidadgrafica";
import { graficoJuego } from "./graficoJuego";

export class Jugador {


    
    id: string = "player";
    color: number;
    x: number;
    y: number;
    entidad: EntidadGrafica | undefined;
    constructor(id: string,color: number, x: number, y: number) {
        this.id = id;
        this.color = color;        
        this.x = x;
        this.y = y;        
    }

    dibujar(graficos: graficoJuego) {
        this.entidad = new EntidadGrafica(this.id, "player_caminando", this.x, this.y, 75, 100 );
        graficos.AdddEntidad(this.entidad);
        this.entidad.setColor(this.color);
        this.animar(graficos, "animacioncaminando");
    }

    animar(graficos: graficoJuego, animacion: string) {
        const frame = graficos.agenda.getFrame();
        graficos.agenda.agregarAccionGrafica(frame, new AccionGraficaAnimar(graficos, this.id, animacion) );
    }

    setPosicion(graficos: graficoJuego, x: number, y: number) 
    {
        console.log("setPosicion", x, y);
        const frame = graficos.agenda.getFrame();
        graficos.agenda.agregarAccionGrafica(frame, new AccionGraficaSetPosicion(graficos, this.id, x, y) );
    }

}