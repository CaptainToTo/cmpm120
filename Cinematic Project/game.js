class TonyGame extends Phaser.Scene {
    constructor(){
        super("TonyGame");
    }

    preload(){
        this.load.path = "./assets/";
        this.load.image("testImage", "tripoley.JPG");
    }

    create(){
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x0000ff, 1);
        this.graphics.fillCircle(100,100, 50);
        this.graphics.fillEllipse(450, 100, 200, 100, 30);
        
        this.graphics.lineStyle(5, 0x00ff00, 1);
        this.graphics.lineBetween(200, 100, 200, 300);

        this.graphics.lineStyle(5, 0x00ff00, 0.5);
        this.graphics.lineBetween(300, 100, 300, 300);

        this.graphics.fillGradientStyle(0xf30fff, 0x30ff00, 0x0000f2, 0x20202f);
        this.graphics.fillRect(300, 400, 500, 500);

        this.textObject = this.add.text(
            300, 200,
            "Hello World",
            {
                font:"60px",
                color: "#000000"
            }
        );

        this.imageObject = this.add.image(
            150, 500,
            "testImage"
        );
        this.imageObject.setScale(0.2);

        this.tweens.add({
            targets: this.imageObject,
            x: 150,
            y: 350,
            alpha: 1,
            duration: 4000,
            ease: "Linear",
            repeat: -1
        })
    }

    update(){
        
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: 0xff80f0,
    scene: [TonyGame]
}

let game = new Phaser.Game(config);