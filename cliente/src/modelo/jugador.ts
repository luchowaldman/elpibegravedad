import { AccionGraficaAnimar, AccionGraficaCambiarVelovidad } from "./AccionGrafica";
import { EntidadGrafica } from "./entidadgrafica";
import { graficoJuego } from "./graficoJuego";

export class Jugador {
    id: string = "player";
    color: number;
    x: number;
    y: number;
    entidad: EntidadGrafica | undefined;
    constructor(color: number, x: number, y: number) {
        this.color = color;        
        this.x = x;
        this.y = y;        
    }

    dibujar(graficos: graficoJuego) {
        /*
        graficos.agenda.agregarAccionGrafica(0, new AccionGraficaCambiarVelovidad(graficos,"player", 50, 0) );
        
        */
        this.entidad = new EntidadGrafica(this.id, "player_caminando", this.x, this.y)
        graficos.AdddEntidad(this.entidad);
        this.entidad.setColor(this.color);
        this.animar(graficos, "animacioncaminando");
    }

    animar(graficos: graficoJuego, animacion: string) {
        const frame = graficos.agenda.getFrame();
        graficos.agenda.agregarAccionGrafica(frame, new AccionGraficaAnimar(graficos, this.id, animacion) );
    }

}