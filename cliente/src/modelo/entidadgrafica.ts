export class EntidadGrafica {
    

    imagenenescena: Phaser.Physics.Arcade.Sprite ;


    public id: string;
    public nombreImagen: string;
    public x: number;
    public y: number;
    public largo: number;
    public alto: number;

    constructor(id: string, nombreImagen: string, x: number, y: number, largo: number, alto: number) {
        this.nombreImagen = nombreImagen;
        this.id = id;
        this.x = x;
        this.y = y;
        this.largo = largo;
        this.alto = alto;
        if (this.largo == null) {
            this.largo = 1;
        }
        if (this.alto == null) {
            this.alto = 1;
        }
    }

    setEscala(escala: number) {
        this.imagenenescena.setScale(escala);
    }

    
    setFrame(frame: number) {
        this.imagenenescena.setFrame(frame);
    }
    rotar(rotacion: number) {
        this.imagenenescena.angle = rotacion;
    }

    
    setVelocity(x: number, y: number) {
        this.imagenenescena.setVelocityX(x);
        this.imagenenescena.setVelocityY(y);
    }

    // ejemplos de color. Rojo: 0xff0000, Verde: 0x00ff00, Azul: 0x0000ff
    setColor(color: number) {
        this.imagenenescena.setTint(color);
    }
    
    
    setPosicion(x: number, y: number) {
        this.imagenenescena.setX(x);
        this.imagenenescena.setY(y);
    }


    setAnimacion(animacion: string) {
        this.imagenenescena.play(animacion);
    }

    agregar(scene: Phaser.Scene) {
        this.imagenenescena = scene.physics.add.sprite(this.x + (this.largo / 2), this.y + (this.alto / 2), this.nombreImagen);
    }
    


}
