const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1080,
        height: 1920
    },
    scene: [Levels,Start,Menu,  Intro, ],
    powerPerformance: "high-performance",
    title: "Juggler",
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    }
});