class Ball {
    constructor(scene, x, y, scale=0.4, bounceSpeed=-500) {
        this.sprite = scene.physics.add.sprite(x, y, "ball");
        this.scene = scene;
        this.sprite.body.gravity.y = 0;
        this.sprite.setScale(scale).setBounce(1, 0.5);
        this.sprite.body.setCircle(this.sprite.width / 2);
        this.bounceSpeed = bounceSpeed;
    }

    activate() {
        this.sprite.body.gravity.y = 400;
    }

    deactivate() {
        this.sprite.body.gravity.y = 0;
    }

    bounce(collider, speed=0) {
        let diff = new Phaser.Math.Vector2(collider.x - this.sprite.x, collider.y - this.sprite.y);
        diff = diff.normalize();
        if (speed != 0) {
            diff.x *= speed;
            diff.y *= speed;
        } else {
            diff.x *= this.bounceSpeed;
            diff.y *= this.bounceSpeed;
        }
        this.sprite.body.setVelocity(diff.x, diff.y);
    }

    reflect(x, y, speed=0) {
        let newVel;

        if (x < -0.9 || 0.9 < x) {
            if (speed != 0) {
                newVel = speed;
            } else {
                newVel = x * Math.abs(this.sprite.body.velocity.x);
            }

            this.sprite.body.setVelocity(newVel, this.sprite.body.velocity.y);
        } else {
            if (speed != 0) {
                newVel = speed;
            } else {
                newVel = -this.sprite.body.velocity.y;
            }

            this.sprite.body.setVelocity(this.sprite.body.velocity.x, newVel);
        }
    }
}

class SelectBall extends Ball {
    constructor(scene, x, y, scale=0.4, action) {
        super(scene, x, y, scale, -2000);
        this.action = action;
        this.sprite.body.gravity.y = 300;
    }

    bounce(collider, speed=0) {
        this.sprite.body.setVelocity(0, this.bounceSpeed);
        this.scene.transition();
        if (this.action != undefined) this.action();
    }
}

class Hand {
    constructor(scene, balls, bounceSpeed=-700, action) {
        this.sprite = scene.physics.add.sprite(-100, -100, "hand").setScale(1.3).setImmovable();;
        this.scene = scene;
        this.balls = balls;
        this.bounceSpeed = bounceSpeed;
        this.originalScale = 1.3;
        this.action = action;
        this.hurt = false;
        this.TimeOut = null;

        let self = this;
        scene.input.on('pointermove', function(pointer) {
            self.sprite.x = pointer.x;
            self.sprite.y = pointer.y;
        });

        scene.input.on('pointerdown', () => {
        if (!this.hurt) {
            scene.tweens.add({
                targets: this.sprite,
                scale: this.originalScale - 0.2,
                duration: 100
            });
            scene.tweens.add({
                targets: this.sprite,
                scale: this.originalScale,
                delay: 100,
                duration: 100
            });

            for (let i = 0; i < this.balls.length; i++) {
                if (scene.physics.overlap(this.sprite, this.balls[i].sprite)) {
                    let pos = {
                        x: this.sprite.x,
                        y: this.sprite.y + 50
                    }
                    this.balls[i].bounce(pos, this.bounceSpeed);
                    this.action();
                }
            }
        }
        });
    }

    setScale(scale) {
        this.sprite.setScale(scale);
        this.originalScale = scale;
    }

    Hurt() {
        this.hurt = true;
        this.sprite.tint = 0x666666;

        if (this.TimeOut != null) {
            clearTimeout(this.TimeOut);
        }

        this.TimeOut = setTimeout(() => {
            this.hurt = false;
            this.sprite.tint = 0xFFFFFF;
        }, 1000);
    }
}

class ScoreBoard {
    constructor(scene, ballCount, targetScore) {
        this.sprite = scene.add.sprite(0, 0, "board");
        this.targetScore = targetScore;
        this.score = 0;
        this.ballCount = ballCount;
        this.scene = scene;

        this.originalScale = 1

        this.targetText = scene.add.text(60, -15, "/ " + String(this.targetScore),
        {
            font:"60px Arial",
            align: "center",
            color: "#2AB9FF",
        });
        this.targetText.setOrigin(0.5, 0.5);

        this.scoreText = scene.add.text(-60, -25, String(this.score),
        {
            font:"100px Arial",
            align: "center",
            color: "#2AB9FF",
        });
        this.scoreText.setOrigin(0.5, 0.5);

        this.balls = scene.add.container(0, 55);
        let side = 1;
        for (let i = 0; i < this.ballCount; i++) {
            let x = (Math.ceil(i / 2) * 50) * side;
            this.balls.add(scene.add.sprite(x, 0, "ball").setScale(0.08));
            side *= -1;
        }

        this.container = scene.add.container(game.canvas.width / 2, -300);
        this.container.add([this.sprite, this.targetText, this.scoreText, this.balls]);

        scene.tweens.add({
            targets: this.container,
            y: 150,
            duration: 500,
            ease: "Linear",
            repeat: 0
        });
    }

    loseBall() {
        this.ballCount -= 1;
        this.balls.list[this.ballCount].tint = 0x666666;

        this.scene.tweens.add({
            targets: this.container,
            x: '+=' + this.scene.game.config.width * 0.01,
            repeat: 2,
            yoyo: true,
            ease: 'Sine.inOut',
            duration: 75
        });

        if (this.ballCount <= 0) {
            this.scene.Lose();
        }
    }

    addPoint(points=1) {
        this.score += points;
        this.scene.tweens.add({
            targets: this.scoreText,
            scale: this.originalScale + 0.2,
            duration: 100
        });
        this.scene.tweens.add({
            targets: this.scoreText,
            scale: this.originalScale,
            delay: 100,
            duration: 100
        });
        this.scoreText.setText(String(this.score));

        if (this.score >= this.targetScore) {
            this.scene.Win();
        }
    }
}

class Interactable {
    constructor(scene, x, y, texture, action, frame={}) {
        this.image = scene.add.image(x, y, texture, frame).setScale(1.5 ,1);
        this.scene = scene;
        this.action = action;
        this.originalScale = 1.5;

        this.image.setInteractive()
            .on('pointerover', () => {
                this.scene.tweens.add({
                    targets: this.image,
                    scaleX: this.originalScale + (this.originalScale * 0.1),
                    duration: 150
                })
            })
            .on('pointerout', () => {
                this.scene.tweens.add({
                    targets: this.image,
                    scaleX: this.originalScale,
                    duration: 150
                })
            })
            .on('pointerdown', () => {
                this.scene.tweens.add({
                    targets: this.image,
                    scaleX: this.originalScale,
                    duration: 100
                });
                this.scene.tweens.add({
                    targets: this.image,
                    scaleX: this.originalScale + (this.originalScale * 0.1),
                    delay: 100,
                    duration: 100
                });
                this.action()
            });
    }

    setScale(scale) {
        this.image.setScale(scale);
        this.originalScale = scale;
    }

    setTexture(texture) {
        this.image.setTexture(texture);
    }
}

class Button extends Interactable {
    constructor(scene, x, y, text, action) {
        super(scene, 0, 0, "board", action);
        this.text = scene.add.text(0, 0, text,
            {
                font:"100px Arial",
                align: "center",
                color: "#2AB9FF",
            }).setOrigin(0.5, 0.5);
        this.container = scene.add.container(x, y);
        this.container.add([this.image, this.text]);
    }
}

class Flame {
    constructor(scene, hand, balls, x, y, scale=1.3) {
        this.sprite = scene.physics.add.sprite(x, y, "flame").setScale(scale);
        this.scene = scene;
        this.sprite.setBounce(1, 0.5);
        this.sprite.body.gravity.y = 500;

        scene.physics.add.collider(this.sprite, hand.sprite, () => {
            this.scene.hand.Hurt();
            this.sprite.disableBody(true, true);
            this.sprite.destroy();
        });

        for (let i = 0; i < balls.length; i++) {
            if (balls[i].sprite.body == undefined) continue;
            scene.physics.add.collider(this.sprite, balls[i].sprite);
        }
    }
}