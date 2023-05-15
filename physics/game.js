const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1080,
        height: 1920
    },
    scene: [Start, Level2, Level1, Levels,  Menu, Intro, Level3, Level4, Level5, Level6],
    powerPerformance: "high-performance",
    title: "Juggler",
    physics: {
        default: "arcade",
        arcade: {
            //debug: true
        }
    }
});