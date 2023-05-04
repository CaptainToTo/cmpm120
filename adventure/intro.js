class Start extends Phaser.Scene {
    constructor() {
        super('Start')
    }
    create() {
        this.add.text(game.canvas.width / 2 - 200, game.canvas.height / 2 - 50, "Click anywhere to begin.",
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

class Intro extends Phaser.Scene {
    constructor() {
        super('Intro')
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("logo", "logo.png");
        this.load.image("floor", "floor-tile.png");
    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.add.tileSprite(0, 0, game.canvas.width * 2, game.canvas.height * 2, "floor");

        let logo = this.add.image(
            game.canvas.width / 2, -300,
            "logo"
        );
        logo.setScale(0.4);

        this.tweens.add({
            targets: logo,
            y: game.canvas.height / 2 - 50,
            alpha: 1,
            delay: 1000,
            duration: 2000,
            ease: "Linear",
            repeat: 0
        });

        this.tweens.add({
            targets: logo,
            y: game.canvas.height + 300,
            alpha: 1,
            delay: 5000,
            duration: 2000,
            ease: "Linear",
            repeat: 0
        });

        setTimeout(() => {
            this.cameras.main.fade(500, 0,0,0);
            this.time.delayedCall(500, () => this.scene.start('demo1'));
        }, 7000);
    }
}