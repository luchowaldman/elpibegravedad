export class Texto {
    id: string;
    x: number;
    y: number;
    contenido: string;
    tamanoFuente: string;
    color: string;
    fuente: string;
    paddingX: number;
    paddingY: number;
    alineacion: string;
    text: Phaser.GameObjects.Text | undefined;

    constructor(
        id: string,
        x: number,
        y: number,
        contenido: string,
        tamanoFuente: string = '56px',
        color: string = '#0000FF',
        fuente: string = 'Comic Sans MS', // 'Arial', 'Verdana', 'Comic Sans MS', 'Impact', 'Georgia', 'Times New Roman', 'Courier New', 'Lucida Console', 'Tahoma', 'Geneva'
        paddingX: number = 0,
        paddingY: number = 0,
        alineacion: string = 'left'
    ) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.contenido = contenido;
        this.tamanoFuente = tamanoFuente;
        this.color = color;
        this.fuente = fuente;
        this.paddingX = paddingX;
        this.paddingY = paddingY;
        this.alineacion = alineacion;
    }

    
    agregar(scene: Phaser.Scene) {
        this.text = scene.add.text(this.x, this.y, this.contenido, {
            fontSize: this.tamanoFuente,
            color: this.color,
            fontFamily: this.fuente,
            padding: { x: this.paddingX, y: this.paddingY },
            align: this.alineacion
        });
    }

    cambiarContenido(contenido: string) {
        this.text?.setText(contenido);
    }
    

}