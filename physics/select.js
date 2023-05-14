class Levels extends Phaser.Scene {
    constructor() {
        super("Levels");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("hand", "hand.png");
        this.load.image("wall", "wall.png");
        this.load.image("ball", "ball.png");
        this.load.image("back", "level-select.png");
        
        let background = this.add.graphics();
        background.fillGradientStyle(0x38D2EB, 0x38D2EB, 0x0B78A2, 0x0B78A2);
        background.fillRect(0, 0, game.canvas.width, game.canvas.height);

        
    }

    create() {
        this.levels = this.add.container(game.canvas.width / 2, -1000);
        this.background = this.add.image(0, 0, "back");
        this.levels.add(this.background);

        this.blocks = this.add.container(0, 0);

        
        this.blocks.add(this.add.tileSprite(-380, 670, 240, 80, "wall").setScale(0.5));
        this.blocks.add(this.add.tileSprite(385, 320, 240, 80, "wall").setScale(0.5));
        this.blocks.add(this.add.tileSprite(-420, 30, 240, 80, "wall").setScale(0.5));
        this.blocks.add(this.add.tileSprite(15, -265, 240, 80, "wall").setScale(0.5));
        this.blocks.add(this.add.tileSprite(383, -480, 240, 80, "wall").setScale(0.5));
        
        this.blocks.add(this.add.tileSprite(-385, -710, 240, 80, "wall").setScale(0.5));

        this.balls = [];
        this.text = [];

        for(let i = 0; i < this.blocks.length; i++) {
            this.physics.add.existing(this.blocks.list[i]);
            this.blocks.list[i].body.setImmovable();
            this.balls.push(new SelectBall(this, 
                this.blocks.list[i].x + this.levels.x, this.blocks.list[i].y + 100 + this.levels.y, 
                0.25, () => {
                    this.time.delayedCall(2000, () => this.scene.start('Level' + String(i + 1)));
                }));

            this.physics.add.collider(this.balls[i].sprite, this.blocks.list[i], () => {
                this.balls[i].reflect(0, 1, -200);
            });
            
            this.text.push(this.add.text(this.balls[i].sprite.x, this.balls[i].sprite.y,
                String(i + 1),
                {
                    font:"60px Arial",
                    align: "center",
                    color: "#2AB9FF",
                }).setOrigin(0.5, 0.5))
        }

        this.levels.add(this.blocks);

        this.tweens.add({
            targets: this.levels,
            y: game.canvas.height / 2,
            alpha: 1,
            duration: 1000,
            ease: "Linear",
            repeat: 0
        });

        this.hand = new Hand(this, this.balls);
        this.hand.setScale(0.9);
    }

    update() {
        for (let i = 0; i < this.text.length; i++) {
            this.text[i].x = this.balls[i].sprite.x;
            this.text[i].y = this.balls[i].sprite.y;
        }
    }

    transition() {
        this.tweens.add({
            targets: this.levels,
            y: game.canvas.height + 300,
            alpha: 0,
            duration: 1000,
            ease: "Linear",
            repeat: 0
        });

        for(let i = 0; i < this.balls.length; i++) {
            this.tweens.add({
                targets: [this.balls[i].sprite, this.text[i]],
                alpha: 0,
                duration: 1500,
                ease: "Linear",
                repeat: 0
            });
        }
    }
}