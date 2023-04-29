class LogoScene extends Phaser.Scene {
    constructor(){
        super("LogoScene");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("logo", "logo.png");
    }

    create() {
        // Create a new gradient
        let background = this.add.graphics();
        background.fillStyle(0x0021A1, 1);
        background.fillRect(0, -100, 800, 100);

        background.fillStyle(0x2546C5, 1);
        background.fillRect(0, -200, 800, 100);

        background.fillStyle(0x415DCA, 1);
        background.fillRect(0, -300, 800, 100);

        background.fillStyle(0x637DE4, 1);
        background.fillRect(0, -400, 800, 100);

        background.fillStyle(0x8EA6FF, 1);
        background.fillRect(0, -1000, 800, 600);

        this.tweens.add({
            targets: background,
            x: 0,
            y: 500,
            alpha: 1,
            duration: 4000,
            ease: "Linear",
            repeat: 0
        });

        this.tweens.add({
            targets: background,
            x: 0,
            y: 1000,
            alpha: 1,
            delay: 7000,
            duration: 4000,
            ease: "Linear",
            repeat: 0
        });

        let logo = this.add.image(
            400, -300,
            "logo"
        );
        logo.setScale(0.3);

        this.tweens.add({
            targets: logo,
            x: 400,
            y: 300,
            alpha: 1,
            duration: 4000,
            ease: "Linear",
            repeat: 0
        });

        this.tweens.add({
            targets: logo,
            x: 400,
            y: 1000,
            alpha: 1,
            delay: 7000,
            duration: 4000,
            ease: "Linear",
            repeat: 0
        });

        setTimeout(() => {
            this.scene.start("Title"); 
        }, 11000);
    }
}

class Title extends Phaser.Scene {
    constructor(){
        super("Title");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("island", "island.png");
        this.load.image("cloud1", "cloud1.png");
        this.load.image("cloud2", "cloud2.png");

        let background = this.add.graphics();

        background.fillStyle(0x8EA6FF, 1);
        background.fillRect(0, 0, 800, 600);
    }

    create() {

        let island = this.add.image(
            400, -300,
            "island"
        );
        island.setScale(0.25);
        island.setDepth(1);

        this.tweens.add({
            targets: island,
            x: 400,
            y: 400,
            alpha: 1,
            duration: 4000,
            ease: "Linear",
            repeat: 0
        });

        // --------------------------

        let title = this.add.text(
            225, 125,
            "INVERSE\nICARUS",
            {
                font:"80px Arial",
                fontWeight: "bold",
                align: "center",
                color: "#BE57F2",
            }
        );
        title.setAlpha(0);
        title.setDepth(2);
        
        this.tweens.add({
            targets: title,
            alpha: 1,
            delay: 4000,
            duration: 1000,
            ease: "Linear",
            repeat: 0
        });

        let space = this.add.text(
            255, 320,
            "{ Press SPACE }",
            {
                font:"40px Arial",
                fontWeight: "bold",
                align: "center",
                color: "#BE57F2"
            }
        );
        space.setAlpha(0);
        space.setDepth(2);

        this.tweens.add({
            targets: space,
            alpha: 1,
            delay: 4000,
            duration: 1000,
            ease: "Linear",
            repeat: 0
        });

        // --------------------------

        let cloud1 = this.add.image(
            120, -100,
            "cloud1"
        );
        cloud1.setScale(0.25);

        this.tweens.add({
            targets: cloud1,
            x: 120,
            y: 350,
            alpha: 1,
            duration: 4000,
            ease: "Linear",
            repeat: 0
        });

        let cloud2 = this.add.image(
            75, -100,
            "cloud1"
        );
        cloud2.setScale(0.25);

        this.tweens.add({
            targets: cloud2,
            x: 74,
            y: 100,
            alpha: 1,
            duration: 4000,
            ease: "Linear",
            repeat: 0
        });

        let cloud3 = this.add.image(
            700, -100,
            "cloud2"
        );
        cloud3.setScale(0.25);

        this.tweens.add({
            targets: cloud3,
            x: 700,
            y: 400,
            alpha: 1,
            duration: 4000,
            ease: "Linear",
            repeat: 0
        });

        let cloud4 = this.add.image(
            630, -100,
            "cloud2"
        );
        cloud4.setScale(0.25);

        this.tweens.add({
            targets: cloud4,
            x: 630,
            y: 200,
            alpha: 1,
            duration: 4000,
            ease: "Linear",
            repeat: 0
        });

        // --------------------------

        this.input.keyboard.on('keydown-SPACE', () => {
            this.tweens.add({
                targets: [cloud1, cloud2, cloud3, cloud4, island, title, space],
                x: -600,
                alpha: 0, 
                duration: 4000,
                ease: "Linear",
                repeat: 0
            });

            setTimeout(() => {
                this.scene.start("Menu"); 
            }, 3500);
        });
    }
}

class Menu extends Phaser.Scene {
    constructor(){
        super("Menu");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("island", "island.png");
        this.load.image("cloud1", "cloud1.png");
        this.load.image("icarus", "icarus_left.png");

        let background = this.add.graphics();

        background.fillStyle(0x8EA6FF, 1);
        background.fillRect(0, 0, 800, 600);
    }

    create() {

        let island = this.add.image(
            1500, 400,
            "island"
        );
        island.setScale(0.2);
        island.setDepth(1);
        island.setAlpha(0);

        // --------------------------

        let icarus = this.add.image(
            1500, 300,
            "icarus"
        );
        icarus.setScale(0.15);
        icarus.setDepth(2);
        icarus.setAlpha(0);

        this.tweens.add({
            targets: [island, icarus],
            x: 600,
            alpha: 1,
            duration: 4000,
            ease: "Linear",
            repeat: 0
        });

        // --------------------------

        let cloud1 = this.add.image(
            1200, 200,
            "cloud1"
        );
        cloud1.setScale(0.25);
        cloud1.setAlpha(0);

        let cloud2 = this.add.image(
            1200, 350,
            "cloud1"
        );
        cloud2.setScale(0.25);
        cloud2.setAlpha(0);

        let cloud3 = this.add.image(
            1200, 500,
            "cloud1"
        );
        cloud3.setScale(0.25);
        cloud3.setAlpha(0);

        let play = this.add.text(
            1200, 200,
            "PLAY",
            {
                font:"40px Arial",
                fontWeight: "bold",
                align: "center",
                color: "#BE57F2"
            }
        );
        play.setAlpha(0);
        play.setDepth(2);

        let options = this.add.text(
            1200, 350,
            "OPTIONS",
            {
                font:"40px Arial",
                fontWeight: "bold",
                align: "center",
                color: "#BE57F2"
            }
        );
        options.setAlpha(0);
        options.setDepth(2);

        let quit = this.add.text(
            1200, 500,
            "QUIT",
            {
                font:"40px Arial",
                fontWeight: "bold",
                align: "center",
                color: "#BE57F2"
            }
        );
        quit.setAlpha(0);
        quit.setDepth(2);

        this.tweens.add({
            targets: [cloud1, cloud2, cloud3, play, options, quit],
            x: 120,
            alpha: 1,
            duration: 4000,
            ease: "Linear",
            repeat: 0
        });

        // --------------------------

    }
}

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: 0x0021A1,
    scene: [LogoScene, Title, Menu]
}

let game = new Phaser.Game(config);