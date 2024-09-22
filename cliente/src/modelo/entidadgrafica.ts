export class EntidadGrafica {



    public id: string;
    public nombreImagen: string;
    public x: number;
    public y: number;
    public velocidadX: number = 0;
    public velocidadY: number = 0;
    public escala: number = 0;
    public numero_frame: integer = -1;
    imagenenescena: Phaser.Physics.Arcade.Sprite;

    constructor(id: string, nombreImagen: string, x: number, y: number)
    {
        this.id = id;
        this.nombreImagen = nombreImagen;
        this.x = x;
        this.y = y;
        
    }

    agregar(scene: Phaser.Scene) {
        this.imagenenescena = scene.physics.add.sprite(this.x, this.y, this.nombreImagen);
        if (this.escala != 0)
            this.imagenenescena.setScale(this.escala);
        if (this.numero_frame != -1)
            this.imagenenescena.setFrame(this.numero_frame);
        this.imagenenescena.setVelocityX(this.velocidadX);
        this.imagenenescena.setVelocityY(this.velocidadY);

    }


}
