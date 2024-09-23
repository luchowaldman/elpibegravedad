import { EntidadGrafica } from "./entidadgrafica";

export class AccionGrafica {
    ejecutar(): void {
        console.log("Acción gráfica ejecutada");
    }
}

export class AccionGraficaCambiarVelovidad extends AccionGrafica {
    entidad: EntidadGrafica;
    x: number;
    y: number;

    constructor(entidad: EntidadGrafica, x: number, y: number) {
        super(); // Llama al constructor de la clase base si es necesario
        this.entidad = entidad;
        this.x = x;
        this.y = y;
    }

    ejecutar(): void {
        this.entidad.setVelocity(this.x, this.y);
    }
}

export class AccionGraficaSetPosicion extends AccionGrafica {
    entidad: EntidadGrafica;
    x: number;
    y: number;

    constructor(entidad: EntidadGrafica, x: number, y: number) {
        super(); // Llama al constructor de la clase base si es necesario
        this.entidad = entidad;
        this.x = x;
        this.y = y;
    }

    ejecutar(): void {
        this.entidad.setPosicion(this.x, this.y);
    }
}


export class AccionGraficaAnimar extends AccionGrafica {
    entidad: EntidadGrafica;
    key_animacion: string;

    constructor(entidad: EntidadGrafica, key_animacion: string) {
        super(); // Llama al constructor de la clase base si es necesario
        this.entidad = entidad;
        this.key_animacion = key_animacion;
    }

    ejecutar(): void {
        this.entidad.setAnimacion(this.key_animacion);
    }
}
