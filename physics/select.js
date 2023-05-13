class Levels extends Phaser.Scene {
    constructor() {
        super("Levels");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("hand", "hand.png");
        this.load.image("wall", "wall.png");
        this.load.image("ball", "ball.png");
        
        let background = this.add.graphics();
        background.fillGradientStyle(0x38D2EB, 0x38D2EB, 0x0B78A2, 0x0B78A2);
        background.fillRect(0, 0, game.canvas.width, game.canvas.height);
    }
}