let living1doors = {
    door1: "lock",
    door2: "open",
    door3: "lock",
    key: true
}

class Living1 extends AdventureScene {
    constructor() {
        super("Living1", "Livingroom", "livingroom.png", 0.8);
    }

    loadAssets() {
        
    }

    onEnter() {
        this.switch = new Interactable(this, 
            this.w * 0.7, this.h * 0.75, "switch-right-on", 
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
        
        this.door1 = new Door(this, this.w * 0.5, this.h * 0.18, "up", living1doors.door1, 'Backyard1',
        () => {
            living1doors.door1 = "open";
        });

        this.door2 = new Door(this, this.w * 0.25, this.h * 0.85, "down", living1doors.door2, 'Entrance3',
        () => {
            living1doors.door2 = "open";
        });

        this.door3 = new Door(this, this.w * 0.55, this.h * 0.85, "down", living1doors.door3, 'Kitchen2',
        () => {
            living1doors.door3 = "open";
        });

        if (living1doors.key) {
            this.key = new Interactable(this, 
                this.w * 0.69, this.h * 0.5, "key", 
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

// -------------------------------------------------------------------------------

let living2doors = {
    door1: "open",
    door2: "lock",
    key: true
}

class Living2 extends AdventureScene {
    constructor() {
        super("Living2", "Livingroom", "livingroom.png", 0.8);
    }

    loadAssets() {
        
    }

    onEnter() {
        this.switch = new Interactable(this, 
            this.w * 0.7, this.h * 0.75, "switch-right-on", 
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
        
        this.door1 = new Door(this, this.w * 0.04, this.h * 0.5, "left", living2doors.door1, 'Kitchen1',
        () => {
            living2doors.door1 = "open";
        });

        this.door2 = new Door(this, this.w * 0.4, this.h * 0.85, "down", living2doors.door2, 'Kitchen2',
        () => {
            living2doors.door2 = "open";
        });

        if (living2doors.key) {
            this.key = new Interactable(this, 
                this.w * 0.25, this.h * 0.5, "key", 
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
                    living2doors.key = false;
                });
            this.key.setScale(0.2);
        }
    }
}