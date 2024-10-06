export class Controles {

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private spaceBar: Phaser.Input.Keyboard.Key;
    private keyG: Phaser.Input.Keyboard.Key;
    scene: Phaser.Scene;

    private onKeyPressCallback: (message: string) => void = () => {};

    setOnKeyPressCallback(callback: (message: string) => void) {
        this.onKeyPressCallback = callback;
    }
    agregar(scene: Phaser.Scene) {
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.spaceBar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyG = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);

    }
    private lastKeyState: { [key: string]: boolean } = {};

    actualizar() {
        const keys = [
            { key: 'left', isDown: this.cursors.left.isDown, message: 'Izquierda' },
            { key: 'right', isDown: this.cursors.right.isDown, message: 'Derecha' },
            { key: 'up', isDown: this.cursors.up.isDown, message: 'Arriba' },
            { key: 'down', isDown: this.cursors.down.isDown, message: 'Abajo' },
            { key: 'space', isDown: this.spaceBar.isDown, message: 'Espacio' },
            { key: 'G', isDown: this.keyG.isDown, message: 'Tecla G' }
        ];

        keys.forEach(({ key, isDown, message }) => {
            if (isDown && !this.lastKeyState[key]) {
                this.onKeyPressCallback?.(message);
                
            }
            this.lastKeyState[key] = isDown;
        });
    }
    
}