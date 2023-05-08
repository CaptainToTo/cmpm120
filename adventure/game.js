const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Start, Kitchen1, Kitchen2, Living1, Living2, Entrance1, Entrance2, Entrance3, Backyard1, Backyard2, Intro, Menu, Outro],
    powerPerformance: "high-performance",
    title: "Loopy House",
});

