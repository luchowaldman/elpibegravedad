import { AccionGraficaAnimar, AccionGraficaCambiarVelovidad, AccionGraficaInvertir, AccionGraficaRotar, AccionGraficaSetPosicion } from "./AccionGrafica";
import { EntidadGrafica } from "./entidadgrafica";
import { graficoJuego } from "./graficoJuego";

export class Jugador {


    
    id: string = "player";
    color: number;
    x: number;
    y: number;
    entidad: EntidadGrafica | undefined;
    animacion: string;
    rotacion: number;

    constructor(id: string,color: number, x: number, y: number) {
        this.id = id;
        this.color = color;        
        this.x = x;
        this.y = y;
        this.animacion = ""        
        this.rotacion = -1000;
    }

    dibujar(graficos: graficoJuego) {
        this.entidad = new EntidadGrafica(this.id, "player_caminando", this.x, this.y, 35, 50 );
        graficos.AdddEntidad(this.entidad);
        this.entidad.setColor(this.color);
        this.animar(graficos, "animacioncaminando");
    }

    animar(graficos: graficoJuego, animacion: string) {
        if (this.animacion != animacion) {
            this.animacion = animacion;
            const frame = graficos.agenda.getFrame();
            graficos.agenda.agregarAccionGrafica(frame, new AccionGraficaAnimar(graficos, this.id, animacion));
        }
    }

    rotar(graficos: graficoJuego, rotacion: number) 
    {
        if (this.rotacion != rotacion) {
            this.rotacion = rotacion;
            const frame = graficos.agenda.getFrame();
            graficos.agenda.agregarAccionGrafica(frame, new AccionGraficaRotar(graficos, this.id, rotacion) );
        }
    }

    
    invertir(graficos: graficoJuego, value: boolean) {
        const frame = graficos.agenda.getFrame();
        graficos.agenda.agregarAccionGrafica(frame, new AccionGraficaInvertir(graficos, this.id, value) );
    }

    

    setPosicion(graficos: graficoJuego, x: number, y: number, esta_caminando: boolean, tieneGravedadInvertida: boolean, estaMuerto: boolean) 
    {
        const frame = graficos.agenda.getFrame();
        if (!estaMuerto) 
        {
            
            this.esta_caminando = esta_caminando;
            if (esta_caminando) {
                this.animar(graficos, "animacioncaminando");
            } else {
                this.animar(graficos, "animacionvolando");
            }
        }
        else {
            this.animar(graficos, "animacionvolando");
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