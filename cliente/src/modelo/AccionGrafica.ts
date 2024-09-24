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
    x: number;
    y: number;
    grafico: graficoJuego;
    entidad: string;

    constructor(grafico: graficoJuego, entidad: string, x: number, y: number) {
        super(); // Llama al constructor de la clase base si es necesario
        this.grafico = grafico;
        this.entidad = entidad;
        this.x = x;
        this.y = y;
    }

    ejecutar(): void {
        this.grafico.GetEntidad(this.entidad)?.setVelocity(this.x, this.y);
    }
}

export class AccionGraficaSetPosicion extends AccionGrafica {
    grafico: graficoJuego;
    entidad: string;
    x: number;
    y: number;

    constructor(grafico: graficoJuego, entidad: string, x: number, y: number) {
        super(); // Llama al constructor de la clase base si es necesario
        this.entidad = entidad;
        this.grafico = grafico;
        this.x = x;
        this.y = y;
    }

    ejecutar(): void {
        this.grafico.GetEntidad(this.entidad)?.setPosicion(this.x, this.y);
    }
}


export class AccionGraficaAnimar extends AccionGrafica {

    entidad: string;
    key_animacion:string;
    grafico: graficoJuego;

    constructor(grafico: graficoJuego, entidad: string, key_animacion:string) {
        super(); // Llama al constructor de la clase base si es necesario
        this.entidad = entidad;
        this.grafico = grafico;
        this.key_animacion = key_animacion;
    }

    ejecutar(): void {
        this.grafico.GetEntidad(this.entidad)?.setAnimacion(this.key_animacion);
    }
}




export class AccionGraficaRotar extends AccionGrafica {
    entidad: string;
    rotacion:number;
    grafico: graficoJuego;

    constructor(grafico: graficoJuego, entidad: string, rotacion:number) {
        super(); // Llama al constructor de la clase base si es necesario
        this.entidad = entidad;
        this.grafico = grafico;
        this.rotacion = rotacion;
    }

    ejecutar(): void {
        this.grafico.GetEntidad(this.entidad)?.rotar(this.rotacion)
    }
}


export class AccionGraficaEjecutarSonido extends AccionGrafica {
    sonido: string;
    grafico: graficoJuego;

    constructor(grafico: graficoJuego, sonido: string) {
        super(); // Llama al constructor de la clase base si es necesario
        this.sonido = sonido;
        this.grafico = grafico;
    }

    ejecutar(): void {
        this.grafico.GetSonido(this.sonido).tocar();
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
        this.grafico.AdddEntidad(new EntidadGrafica(this.id, this.nombreImagen, this.x, this.y));
    }
}
