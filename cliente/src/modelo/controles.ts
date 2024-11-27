export class Controles {

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    private spaceBar: Phaser.Input.Keyboard.Key| undefined;
    private keyG: Phaser.Input.Keyboard.Key| undefined;
    private keyI: Phaser.Input.Keyboard.Key| undefined;
    scene: Phaser.Scene| undefined;

    private onKeyPressHandler: (message: string) => void = () => {};

    setOnKeyPressHandler(handler: (message: string) => void) {
        this.onKeyPressHandler = handler;
    }
    agregar(scene: Phaser.Scene) {
        this.cursors = scene.input.keyboard?.createCursorKeys();
        this.spaceBar = scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyG = scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        this.keyI = scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.I);

    }
    private lastKeyState: { [key: string]: boolean } = {};

    actualizar() {
        const keys = [
            { key: 'left', isDown: this.cursors?.left.isDown, message: 'Izquierda' },
            { key: 'right', isDown: this.cursors?.right.isDown, message: 'Derecha' },
            { key: 'up', isDown: this.cursors?.up.isDown, message: 'Arriba' },
            { key: 'down', isDown: this.cursors?.down.isDown, message: 'Abajo' },
            { key: 'space', isDown: this.spaceBar?.isDown, message: 'Espacio' },
            { key: 'G', isDown: this.keyG?.isDown, message: 'Tecla G' },
            { key: 'I', isDown: this.keyI?.isDown, message: 'Tecla I' }
        ];

        keys.forEach(({ key, isDown, message }) => {
            if (isDown && !this.lastKeyState[key]) {
                this.onKeyPressHandler?.(message);
                
            }
            this.lastKeyState[key] = isDown ?? false;
        });
    }
    
}