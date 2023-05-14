class JuggleLevel extends Phaser.Scene {
    constructor(name, score, balls) {
        super(name);
        this.name = name;
        this.score = score;
        this.ballCount = balls;
    }

    preload() {
        this.load.path = "./assets/";

        this.load.image("hand", "hand.png");
        this.load.image("wall", "wall.png");
        this.load.image("ball", "ball.png");
        this.load.image("board", "board.png");

        this.load.image("lose", "lose.png");
        this.load.image("win", "win.png");

        let background = this.add.graphics();
        background.fillGradientStyle(0x38D2EB, 0x38D2EB, 0x0B78A2, 0x0B78A2);
        background.fillRect(0, 0, game.canvas.width, game.canvas.height);
    }

    create() {
        // create scoreboard
        this.scoreboard = new ScoreBoard(this, this.ballCount, this.score);

        // create walls
        this.rightWall = this.add.tileSprite(-50, game.canvas.height / 2, 80, game.canvas.height * 2, "wall");
        this.physics.add.existing(this.rightWall);
        this.rightWall.body.setImmovable();

        this.tweens.add({
            targets: this.rightWall,
            x: -20,
            duration: 500,
            ease: "Linear",
            repeat: 0
        });

        this.leftWall = this.add.tileSprite(game.canvas.width + 50, game.canvas.height / 2, 80, game.canvas.height * 2, "wall");
        this.physics.add.existing(this.leftWall);
        this.leftWall.body.setImmovable();

        this.tweens.add({
            targets: this.leftWall,
            x: game.canvas.width + 20,
            duration: 500,
            ease: "Linear",
            repeat: 0
        });

        // create balls
        this.balls = [];
        for (let i = 0; i < this.ballCount; i++) {
            this.balls.push(new Ball(this, 
                (Math.random() * (game.canvas.width - 400)) + 200, 
                -300
            ));
            this.tweens.add({
                targets: this.balls[i].sprite,
                y: -300,
                x: this.balls[i].sprite.x,
                duration: (i + 1) * 2000
            })

            this.time.delayedCall((i + 1) * 2000, () => {
                this.balls[i].activate();
            });
            
            this.physics.add.collider(this.balls[i].sprite, this.rightWall, () => {
                this.balls[i].reflect(1, 0);
            });
    
            this.physics.add.collider(this.balls[i].sprite, this.leftWall, () => {
                this.balls[i].reflect(-1, 0);
            });

            for (let j = 0; j < this.balls.length; j++) {
                if (i == j) continue;
                this.physics.add.collider(this.balls[i].sprite, this.balls[j].sprite);
            }
        }

        // add hand
        this.hand = new Hand(this, this.balls, -800, () => {
            this.scoreboard.addPoint(1);
        });

        // add floor
        this.floor = this.add.tileSprite(game.canvas.width / 2, game.canvas.height + 100, game.canvas.width, 80, "wall");
        this.physics.add.existing(this.floor);
        this.floor.body.setImmovable();
    }

    update() {
        if (this.scoreboard.score < this.score) {
            for (let i = 0; i < this.balls.length; i++) {
                if (this.physics.overlap(this.balls[i].sprite, this.floor)){
                    this.scoreboard.loseBall();
                    this.balls[i].sprite.destroy();
                }
            }
        }
    }

    GoTo(scene) {
        this.tweens.add({
            targets: this.scoreboard.container,
            y: -300,
            alpha: 0,
            duration: 500,
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

        this.tweens.add({
            targets: this.menu,
            x: -400,
            alpha: 1,
            duration: 1000,
            ease: "Linear"
        });
        this.time.delayedCall(1200, () => {this.scene.start(scene)});
    }

    Lose() {
        this.hand.sprite.destroy();
        this.hand = null;

        this.lose = this.add.sprite(0, -300, "lose");

        this.restart = new Button(this, 0, 50, "RESTART", () => {
            this.time.delayedCall(50, () => this.GoTo(this.name));
        })

        this.exit = new Button(this, 0, 300, "LEVELS", () => {
            this.time.delayedCall(50, () => this.GoTo("Levels"));
        })

        this.menu = this.add.container(-400, game.canvas.height / 2);
        this.menu.add([this.lose, this.restart.container, this.exit.container]);

        this.tweens.add({
                targets: this.menu,
                x: game.canvas.width / 2,
                ease: 'Linear',
                duration: 1000
        });
    }

    Win() {
        for(let i = 0; i < this.balls.length; i++) {
            this.balls[i].sprite.body.setVelocity(0, -1000);
            this.balls[i].deactivate();
            this.time.delayedCall(1000, () => {
                this.balls[i].sprite.destroy();
                this.balls[i] = null;
            });
        }

        this.hand.sprite.destroy();
        this.hand = null;

        this.lose = this.add.sprite(0, -300, "win");

        this.restart = new Button(this, 0, 50, "LEVELS", () => {
            this.time.delayedCall(50, () => this.GoTo("Levels"));
        })

        this.menu = this.add.container(-400, game.canvas.height / 2);
        this.menu.add([this.lose, this.restart.container]);

        this.tweens.add({
                targets: this.menu,
                x: game.canvas.width / 2,
                ease: 'Linear',
                duration: 1000
        });
    }
}