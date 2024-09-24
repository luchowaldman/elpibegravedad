import { AccionGrafica } from "./AccionGrafica";

export class AgendaAccionesGrafica {
    private framePorSegundo: number;
    private acciones: Map<number, AccionGrafica[]>;
    private inicio: number | null;

    constructor(framePorSegundo: number) {
        this.framePorSegundo = framePorSegundo;
        this.acciones = new Map<number, AccionGrafica[]>();
        this.inicio = null;
    }

    agregarAccionGrafica(frame: number, accion: AccionGrafica): void {
        if (!this.acciones.has(frame)) {
            this.acciones.set(frame, []);
        }
        this.acciones.get(frame)!.push(accion);
    }

    iniciar(): void {
        this.inicio = Date.now();
    }

    actualizar(): void {
        if (this.inicio === null) {
            
            return;
        }

        const tiempoTranscurrido = Date.now() - this.inicio;
        const frameActual = Math.floor((tiempoTranscurrido / 1000) * this.framePorSegundo);

        for (let [frame, acciones] of this.acciones) {
            if (frame <= frameActual) {
                acciones.forEach(accion => accion.ejecutar());
                this.acciones.delete(frame);
            }
        }
    }

    
    getFrame(): number  {
        if (this.inicio === null) {
            return null;
        }

        const tiempoTranscurrido = Date.now() - this.inicio;
        return Math.floor((tiempoTranscurrido / 1000) * this.framePorSegundo);
    }
}
