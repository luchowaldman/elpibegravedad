export class EntidadGrafica {



    public id: string;
    public nombreImagen: string;
    public x: number;
    public y: number;
    
    
    imagenenescena: Phaser.Physics.Arcade.Sprite;

    constructor(id: string, nombreImagen: string, x: number, y: number)
    {
        this.id = id;
        this.nombreImagen = nombreImagen;
        this.x = x;
        this.y = y;
        
    }

    setEscala(escala: number) {
        this.imagenenescena.setScale(escala);
    }

    
    setFrame(frame: number) {
        this.imagenenescena.setFrame(frame);
    }

    
    setVelocity(x: number, y: number) {
        this.imagenenescena.setVelocityX(x);
        this.imagenenescena.setVelocityY(y);
    }

    
    setAnimacion(animacion: string) {
        this.imagenenescena.play(animacion);
    }

    agregar(scene: Phaser.Scene) {
        this.imagenenescena = scene.physics.add.sprite(this.x, this.y, this.nombreImagen);



    }


}
