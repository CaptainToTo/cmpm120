class Backyard1 extends AdventureScene {
    constructor() {
        super("Backyard1", "Backyard", "backyard.png", 0.8);
    }

    loadAssets() {
        
    }

    onEnter() {
        this.door1 = new Door(this, this.w * 0.375, this.h * 0.85, "down", "open", 'Entrance2',
        () => {});

        this.key = new Interactable(this, 
            this.w * 0.4, this.h * 0.5, "key", 
            "An all purpose key that can unlock any door.", "", () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: this.key.image,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => this.key.image.destroy()
                });
            });
        this.key.setScale(0.2);
    }
}

// --------------------------------------------------------------------------------

let back2doors = {
    door1: "open",
    door2: "lock"
}

class Backyard2 extends AdventureScene {
    constructor() {
        super("Backyard2", "Backyard", "backyard.png", 0.8);
    }

    loadAssets() {
        
    }

    onEnter() {

        this.door1 = new Door(this, this.w * 0.375, this.h * 0.15, "up", back2doors.door1, 'Living1',
        () => {
            back2doors.door1 = "open";
        });

        this.door2 = new Door(this, this.w * 0.375, this.h * 0.85, "down", back2doors.door2, 'Kitchen2',
        () => {
            back2doors.door2 = "open";
        });
    }
}