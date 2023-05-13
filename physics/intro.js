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
        this.load.image("ball", "ball.png");
    }

    create() {

        this.cameras.main.fadeIn(500, 0, 0, 0);
        let background = this.add.graphics();
        background.fillGradientStyle(0x38D2EB, 0x38D2EB, 0x0B78A2, 0x0B78A2);
        background.fillRect(0, 0, game.canvas.width, game.canvas.height);

        this.logo = this.physics.add.sprite(
            game.canvas.width / 2, -300,
            "logo"
        ).setImmovable();
        this.logo.setScale(0.4);

        this.tweens.add({
            targets: this.logo,
            y: game.canvas.height / 2 + 150,
            alpha: 1,
            delay: 1000,
            duration: 2000,
            ease: "Linear",
            repeat: 0
        });

        this.tweens.add({
            targets: this.logo,
            y: game.canvas.height + 300,
            alpha: 1,
            delay: 5000,
            duration: 2000,
            ease: "Linear",
            repeat: 0
        });

        this.ball1 = new Ball(this, game.canvas.width / 2 + 100, -1000);
        this.ball2 = new Ball(this, game.canvas.width / 2 - 150, -1500);
        this.ball3 = new Ball(this, game.canvas.width / 2 + 220, -1250);

        this.ball4 = new Ball(this, game.canvas.width / 2 + 530, -1450);
        this.ball5 = new Ball(this, game.canvas.width / 2 - 600, -1650);

        this.physics.add.collider(this.logo, this.ball1.sprite, () => {
            this.ball1.bounce(this.logo);
        });

        this.physics.add.collider(this.logo, this.ball2.sprite, () => {
            this.ball2.bounce(this.logo);
        });

        this.physics.add.collider(this.logo, this.ball3.sprite, () => {
            this.ball3.bounce(this.logo);
        });

        setTimeout(() => {
            this.cameras.main.fade(500, 0,0,0);
            this.time.delayedCall(500, () => this.scene.start('Menu'));
        }, 7000);
    }
}

class Menu extends Phaser.Scene {
    constructor() {
        super('Menu')
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("J", "title/J.png");
        this.load.image("U", "title/U.png");
        this.load.image("G", "title/G.png");
        this.load.image("L", "title/L.png");
        this.load.image("E", "title/E.png");
        this.load.image("R", "title/R.png");

        this.load.image("hand", "hand.png");
        this.load.image("wall", "wall.png");
        this.load.image("ball", "ball.png");
        
    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        let background = this.add.graphics();
        background.fillGradientStyle(0x38D2EB, 0x38D2EB, 0x0B78A2, 0x0B78A2);
        background.fillRect(0, 0, game.canvas.width, game.canvas.height);

        this.title = this.add.container(game.canvas.width / 2, game.canvas.height / 5).setScale(1.4);
        this.title.add(this.add.image(-300, 0, "J").setScale(0.8));
        this.title.add(this.add.image(-200, 0, "U").setScale(0.8));
        this.title.add(this.add.image(-100, 0, "G").setScale(0.8));
        this.title.add(this.add.image(0, 0, "G").setScale(0.8));
        this.title.add(this.add.image(100, 0, "L").setScale(0.8));
        this.title.add(this.add.image(200, 0, "E").setScale(0.8));
        this.title.add(this.add.image(300, 0, "R").setScale(0.8));

        

        this.ball = new SelectBall(this, game.canvas.width / 2, -600, 0.6, -700);
        this.play = this.add.text(0, 0, "PLAY",
        {
            font:"80px Arial",
            align: "center",
            color: "#2AB9FF",
        });
        this.play.setOrigin(0.5, 0.5);

        let hand = new Hand(this, [this.ball]);

        this.floor = this.physics.add.image(game.canvas.width / 2, game.canvas.height + 50, "hand").setScale(10, 1);
        this.floor.setImmovable();

        this.rightWall = this.add.tileSprite(-20, game.canvas.height / 2, 80, game.canvas.height, "wall");
        this.physics.add.existing(this.rightWall);
        this.rightWall.body.setImmovable();

        this.leftWall = this.add.tileSprite(game.canvas.width + 20, game.canvas.height / 2, 80, game.canvas.height, "wall");
        this.physics.add.existing(this.leftWall);
        this.leftWall.body.setImmovable();

        this.physics.add.collider(this.ball.sprite, this.floor, () => {
            this.ball.reflect(0, 1, -700);
        });

        this.physics.add.collider(this.ball.sprite, this.rightWall, () => {
            this.ball.reflect(1, 0);
        });

        this.physics.add.collider(this.ball.sprite, this.leftWall, () => {
            this.ball.reflect(-1, 0);
        });
    }

    update() {
        for (let i = 0; i < this.title.length; i++) {
            this.title.list[i].y = 25 * Math.sin(this.time.now / 1000 - i);
        }

        this.play.y = this.ball.sprite.y;
        this.play.x = this.ball.sprite.x;
    }

    transition() {
        this.tweens.add({
            targets: this.title,
            y: game.canvas.height + 300,
            alpha: 0,
            duration: 1000,
            ease: "Linear",
            repeat: 0
        });
        this.tweens.add({
            targets: this.rightWall,
            x: -50,
            alpha: 0,
            duration: 500,
            ease: "Linear",
            repeat: 0
        });
        this.tweens.add({
            targets: this.leftWall,
            x: game.canvas.width + 50,
            alpha: 0,
            duration: 500,
            ease: "Linear",
            repeat: 0
        });
        this.time.delayedCall(1200, () => this.scene.start('Levels'));
    }
}