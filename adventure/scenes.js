class Outro extends Phaser.Scene {
    constructor() {
        super('Outro');
    }
    create() {
        this.add.text(game.canvas.width / 2 - 200, game.canvas.height / 2 - 50, 
        "You Escaped!\nClick anywhere to begin.",
            {
                font:"40px Arial",
                align: "center",
                color: "#FFFFFF",
            });
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(500, 0xFF,0xFF,0xFF);
            this.time.delayedCall(500, () => this.scene.start('Intro'));
        });
    }
}