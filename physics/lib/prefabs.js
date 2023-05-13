class Ball {
    constructor(scene, x, y, scale=0.4, bounceSpeed=-500) {
        this.sprite = scene.physics.add.sprite(x, y, "ball");
        this.sprite.body.gravity.y = 300;
        this.sprite.setScale(scale);
        this.sprite.body.setCircle(this.sprite.width / 2);
        this.bounceSpeed = bounceSpeed;
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
}

class Hand {
    constructor(scene, balls, bounceSpeed=-700) {
        this.sprite = scene.physics.add.sprite(-100, -100, "hand").setScale(1.3);
        this.scene = scene;
        this.balls = balls;
        this.bounceSpeed = bounceSpeed;
        let self = this;
        scene.input.on('pointermove', function(pointer) {
            self.sprite.x = pointer.x;
            self.sprite.y = pointer.y;
        });

        scene.input.on('pointerdown', () => {
            scene.tweens.add({
                targets: this.sprite,
                scale: 1.1,
                duration: 100
            });
            scene.tweens.add({
                targets: this.sprite,
                scale: 1.3,
                delay: 100,
                duration: 100
            });

            for (let i = 0; i < this.balls.length; i++) {
                if (scene.physics.overlap(this.sprite, this.balls[i].sprite)) {
                    this.balls[i].bounce(this.sprite, this.bounceSpeed);
                }
            }
        });
    }
}