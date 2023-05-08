let entrance1doors = {
    door1: "open",
    door2: "open",
    key: true
}

class Entrance1 extends AdventureScene {
    constructor() {
        super("Entrance1", "Entrance", "entrance.png", 0.8);
    }

    loadAssets() {
        
    }

    onEnter() {

        this.switch = new Interactable(this, 
            this.w * 0.7, this.h * 0.73, "switch-right-on", 
            "A light switch. It's like another world when it's dark.", "on", () => {
                if (this.switch.state == "off") {
                    this.switch.setTexture("switch-right-on");
                    this.switch.state = "on";
                    this.blackout.destroy();
                } else {
                    this.switch.setTexture("switch-right-off");
                    this.switch.state = "off";
                    this.blackout = this.add.graphics();
                    this.blackout.fillStyle(0x00000, 0.7);
                    this.blackout.fillRect(0, 0, this.w * 0.75, this.h);
                }
            });
        this.switch.setScale(0.2);
        
        this.door1 = new Door(this, this.w * 0.375, this.h * 0.17, "up", entrance1doors.door1, 'Backyard2',
        () => {
            entrance1doors.door1 = "open";
        });

        this.door2 = new Door(this, this.w * 0.375, this.h * 0.83, "down", entrance1doors.door2, 'Living2',
        () => {
            entrance1doors.door2 = "open";
        });


        if (entrance1doors.key) {
            this.key = new Interactable(this, 
                this.w * 0.6, this.h * 0.2, "key", 
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
                    living1doors.key = false;
                });
            this.key.setScale(0.2);
        }
    }
}

// ---------------------------------------------------------------------------------

let entrance2doors = {
    door1: "open",
    door2: "lock",
    key: true
}

class Entrance2 extends AdventureScene {
    constructor() {
        super("Entrance2", "Entrance", "entrance.png", 0.8);
    }

    loadAssets() {
        
    }

    onEnter() {

        this.switch = new Interactable(this, 
            this.w * 0.71, this.h * 0.72, "switch-right-on", 
            "A light switch. It's like another world when it's dark.", "on", () => {
                if (this.switch.state == "off") {
                    this.switch.setTexture("switch-right-on");
                    this.switch.state = "on";
                    this.blackout.destroy();
                } else {
                    this.switch.setTexture("switch-right-off");
                    this.switch.state = "off";
                    this.blackout = this.add.graphics();
                    this.blackout.fillStyle(0x00000, 0.7);
                    this.blackout.fillRect(0, 0, this.w * 0.75, this.h);
                }
            });
        this.switch.setScale(0.2);
        
        this.door1 = new Door(this, this.w * 0.375, this.h * 0.17, "up", entrance2doors.door1, 'Living2',
        () => {
            entrance2doors.door1 = "open";
        });

        this.door2 = new Door(this, this.w * 0.375, this.h * 0.83, "down", entrance2doors.door2, 'Kitchen1',
        () => {
            entrance2doors.door2 = "open";
        });

        if (entrance2doors.key) {
            this.key = new Interactable(this, 
                this.w * 0.1, this.h * 0.5, "key", 
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
                    entrance2doors.key = false;
                });
            this.key.setScale(0.2);
        }
    }
}

// ---------------------------------------------------------------------------------

let entrance3doors = {
    door1: "lock",
    door2: "open"
}

class Entrance3 extends AdventureScene {
    constructor() {
        super("Entrance3", "Entrance", "entrance.png", 0.8);
    }

    loadAssets() {
        
    }

    onEnter() {

        this.switch = new Interactable(this, 
            this.w * 0.71, this.h * 0.72, "switch-right-on", 
            "A light switch. It's like another world when it's dark.", "on", () => {
                if (this.switch.state == "off") {
                    this.switch.setTexture("switch-right-on");
                    this.switch.state = "on";
                    this.blackout.destroy();
                } else {
                    this.switch.setTexture("switch-right-off");
                    this.switch.state = "off";
                    this.blackout = this.add.graphics();
                    this.blackout.fillStyle(0x00000, 0.7);
                    this.blackout.fillRect(0, 0, this.w * 0.75, this.h);
                }
            });
        this.switch.setScale(0.2);
        
        this.door1 = new Door(this, this.w * 0.72, this.h * 0.5, "right", entrance3doors.door1, 'Living2',
        () => {
            entrance3doors.door1 = "open";
        });

        this.door2 = new Door(this, this.w * 0.375, this.h * 0.83, "down", entrance3doors.door2, 'Backyard2',
        () => {
            entrance3doors.door2 = "open";
        });
    }
}

