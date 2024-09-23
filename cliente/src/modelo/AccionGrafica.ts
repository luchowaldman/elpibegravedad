import { EntidadGrafica } from "./entidadgrafica";
import { graficoJuego } from "./graficoJuego";
import { Sonido } from "./sonido";

export class AccionGrafica {
    ejecutar(): void {
        console.log("Acción gráfica ejecutada");
    }
}




export class AccionEscribirPorConsola extends AccionGrafica {
    texto: string;

    constructor(texto: string) {
        super(); // Llama al constructor de la clase base si es necesario
        this.texto = texto;
    }

    ejecutar(): void {
        console.log(this.texto);
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
        this.entidad.setPosicion(40, 0);
    }
}


export class AccionGraficaAnimar extends AccionGrafica {
    entidad: EntidadGrafica;
    key_animacion:string;

    constructor(entidad: EntidadGrafica, key_animacion:string) {
        super(); // Llama al constructor de la clase base si es necesario
        this.entidad = entidad;
        this.key_animacion = key_animacion;
    }

    ejecutar(): void {
        this.entidad.setAnimacion(this.key_animacion);
    }
}

export class AccionGraficaEjecutarSonido extends AccionGrafica {
    sonido: Sonido;

    constructor(sonido: Sonido) {
        super(); // Llama al constructor de la clase base si es necesario
        this.sonido = sonido;
    }

    ejecutar(): void {
        this.sonido.tocar();
    }
}


export class AccionGraficaAgregarEntidad extends AccionGrafica {
    
    public id: string;
    public nombreImagen: string;
    public x: number;
    public y: number;
    private grafico: graficoJuego;

    constructor(grafico: graficoJuego, id: string, nombreImagen: string, x: number, y: number)
    {
        super();
        this.grafico = grafico;
        this.id = id;
        this.nombreImagen = nombreImagen;
        this.x = x;
        this.y = y;
        
    }
    

    ejecutar(): void {
        this.grafico.entidades.push(new EntidadGrafica(this.id, this.nombreImagen, this.x, this.y))
        
        console.log("rompelaaaaa");
    }
}
