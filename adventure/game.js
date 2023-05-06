const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Start, Intro, Menu, Kitchen1, Demo1, Demo2, Outro],
    powerPerformance: "high-performance",
    title: "Loopy House",
});

