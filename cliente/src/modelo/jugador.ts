import { AccionGraficaAnimar, AccionGraficaCambiarVelovidad, AccionGraficaInvertir, AccionGraficaRotar, AccionGraficaSetPosicion } from "./AccionGrafica";
import { EntidadGrafica } from "./entidadgrafica";
import { graficoJuego } from "./graficoJuego";

export class Jugador {


    
    id: string = "player";
    color: number;
    x: number;
    y: number;
    entidad: EntidadGrafica | undefined;
    esta_caminando: boolean = true;
    tieneGravedadInvertida: boolean = true;
    constructor(id: string,color: number, x: number, y: number) {
        this.id = id;
        this.color = color;        
        this.x = x;
        this.y = y;        
    }

    dibujar(graficos: graficoJuego) {
        this.entidad = new EntidadGrafica(this.id, "player_caminando", this.x, this.y, 35, 50 );
        graficos.AdddEntidad(this.entidad);
        this.entidad.setColor(this.color);
        this.animar(graficos, "animacioncaminando");
    }

    animar(graficos: graficoJuego, animacion: string) {
        const frame = graficos.agenda.getFrame();
        graficos.agenda.agregarAccionGrafica(frame, new AccionGraficaAnimar(graficos, this.id, animacion) );
    }

    rotar(graficos: graficoJuego, rotacion: number) {
        const frame = graficos.agenda.getFrame();
        graficos.agenda.agregarAccionGrafica(frame, new AccionGraficaRotar(graficos, this.id, rotacion) );
    }

    
    invertir(graficos: graficoJuego, value: boolean) {
        const frame = graficos.agenda.getFrame();
        graficos.agenda.agregarAccionGrafica(frame, new AccionGraficaInvertir(graficos, this.id, value) );
    }

    

    setPosicion(graficos: graficoJuego, x: number, y: number, esta_caminando: boolean, tieneGravedadInvertida: boolean) 
    {
        const frame = graficos.agenda.getFrame();
        console.log("compara", this.esta_caminando, esta_caminando);
        if (this.esta_caminando != esta_caminando) 
        {
            
            this.esta_caminando = esta_caminando;
            if (esta_caminando) {
                console.log("caminando");
                this.animar(graficos, "animacioncaminando");
            } else {
                console.log("volando");
                this.animar(graficos, "animacionvolando");
            }

        }
        if (this.tieneGravedadInvertida != tieneGravedadInvertida) 
        {
            this.tieneGravedadInvertida = tieneGravedadInvertida;
            if (tieneGravedadInvertida) {
                this.rotar(graficos, -180);
                this.invertir(graficos, true);
            } else {
                this.invertir(graficos, false);
                this.rotar(graficos, 0);
            }
        }
        graficos.agenda.agregarAccionGrafica(frame, new AccionGraficaSetPosicion(graficos, this.id, x, y) );
    }

}