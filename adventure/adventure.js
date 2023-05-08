class AdventureScene extends Phaser.Scene {

    init(data) {
        this.inventory = data.inventory || [];
    }

    constructor(key, name, background="", backgroundScale=0) {
        super(key);
        this.name = name;
        this.background = background;
        this.backgroundScale = backgroundScale;
    }

    preload() {
        this.load.path = "./assets/";
        if (this.background != "") {
            this.load.image(this.scene.key + "-background", this.background);
        }

        this.load.image("switch-right-on", "switch-right-on.png");
        this.load.image("switch-right-off", "switch-right-off.png");
        this.load.image("door-up-open", "doors/door-up-open.png");
        this.load.image("door-up-lock", "doors/door-up-lock.png");
        this.load.image("door-down-open", "doors/door-down-open.png");
        this.load.image("door-down-lock", "doors/door-down-lock.png");
        this.load.image("door-left-open", "doors/door-left-open.png");
        this.load.image("door-left-lock", "doors/door-left-lock.png");
        this.load.image("door-right-open", "doors/door-right-open.png");
        this.load.image("door-right-lock", "doors/door-right-lock.png");
        this.load.image("key", "key.png");

        this.loadAssets();
    }

    loadAssets() {
        console.log("loading assets handled by children class.");
    }

    create() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        if (this.background != "") {
            let background = this.add.image(this.w * 0.375, this.h * 0.5, this.scene.key + "-background");
            background.setScale(this.backgroundScale);
        }

        this.add.rectangle(this.w * 0.75, 0, this.w * 0.25, this.h).setOrigin(0, 0).setFillStyle(0);
        this.add.text(this.w * 0.75 + this.s, this.s)
            .setText(this.name)
            .setStyle({ fontSize: `${3 * this.s}px` })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);
        
        this.messageBox = this.add.text(this.w * 0.75 + this.s, this.h * 0.33)
            .setStyle({ fontSize: `${2 * this.s}px`, color: '#eea' })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);

        this.inventoryBanner = this.add.text(this.w * 0.75 + this.s, this.h * 0.66)
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setText("Inventory")
            .setAlpha(0);

        this.inventoryTexts = [];
        this.updateInventory();

        this.add.text(this.w-3*this.s, this.h-3*this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Fullscreen?'))
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

        this.onEnter();
        
        this.messageTimeOut = null;
    }

    showMessage(message) {
        this.messageBox.setText(message);

        /*if (this.messageTimeOut != null) {
            clearTimeout(this.messageTimeOut);
        }

        this.messageTimeOut = setTimeout(() => {
            this.messageBox.setText("");
        }, 4 * this.transitionDuration);*/
    }

    updateInventory() {
        if (this.inventory.length > 0) {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 1,
                duration: this.transitionDuration
            });
        } else {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 0,
                duration: this.transitionDuration
            });
        }
        if (this.inventoryTexts) {
            this.inventoryTexts.forEach((t) => t.destroy());
        }
        this.inventoryTexts = [];
        let h = this.h * 0.66 + 3 * this.s;
        this.inventory.forEach((e, i) => {
            let text = this.add.text(this.w * 0.75 + 2 * this.s, h, e)
                .setStyle({ fontSize: `${1.5 * this.s}px` })
                .setWordWrapWidth(this.w * 0.75 + 4 * this.s);
            h += text.height + this.s;
            this.inventoryTexts.push(text);
        });
    }

    hasItem(item) {
        return this.inventory.includes(item);
    }

    gainItem(item) {
        /*if (this.inventory.includes(item)) {
            console.warn('gaining item already held:', item);
            return;
        }*/
        this.inventory.push(item);
        this.updateInventory();
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x - 20, to: text.x },
                    alpha: { from: 0, to: 1 },
                    ease: 'Cubic.out',
                    duration: this.transitionDuration
                });
            }
        }
    }

    loseItem(item) {
        if (!this.inventory.includes(item)) {
            console.warn('losing item not held:', item);
            return;
        }
        let i = 0;
        for (; i < this.inventoryTexts.length; i++) {
            if (this.inventoryTexts[i].text == item) {
                this.tweens.add({
                    targets: this.inventoryTexts[i],
                    x: { from: this.inventoryTexts[i].x, to: this.inventoryTexts[i].x + 20 },
                    alpha: { from: 1, to: 0 },
                    ease: 'Cubic.in',
                    duration: this.transitionDuration
                });
                break;
            }
        }
        this.time.delayedCall(500, () => {
            this.inventory.splice(i, 1);
            this.updateInventory();
        });
    }

    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { inventory: this.inventory });
        });
    }

    onEnter() {
        console.warn('This AdventureScene did not implement onEnter():', this.constructor.name);
    }
}

// ------------------------------------------------------------
// Interactable class created by Anthony Umemoto
// has simple "pop-up" effect for hovering over the interactable
// can specify a function for the action to be taken when interactable is clicked on

class Interactable {
    constructor(scene, x, y, texture, description, state, action, frame={}) {
        this.image = scene.add.image(x, y, texture, frame);
        this.scene = scene;
        this.description = description;
        this.state = state;
        this.action = action;
        this.originalScale = this.image.scale;

        this.image.setInteractive()
            .on('pointerover', () => {
                this.scene.showMessage(this.description);
                this.scene.tweens.add({
                    targets: this.image,
                    scale: this.originalScale + (this.originalScale * 0.1),
                    duration: 150
                })
            })
            .on('pointerout', () => {
                this.scene.showMessage("")
                this.scene.tweens.add({
                    targets: this.image,
                    scale: this.originalScale,
                    duration: 150
                })
            })
            .on('pointerdown', () => {
                this.scene.tweens.add({
                    targets: this.image,
                    scale: this.originalScale,
                    duration: 100
                });
                this.scene.tweens.add({
                    targets: this.image,
                    scale: this.originalScale + (this.originalScale * 0.1),
                    delay: 100,
                    duration: 100
                });
                this.action()
            });
    }

    setScale(scale) {
        this.image.setScale(scale);
        this.originalScale = scale;
    }

    setTexture(texture) {
        this.image.setTexture(texture);
    }
}

class Door extends Interactable {
    constructor(scene, x, y, direction, state, goTo, extra) {
        let description = "";
        if (state == "lock") {
            description = "A locked door. You'll need a key.";
        } else {
            description = "An open door. Where could it lead?";
        }
        super(scene, x, y, "door-"+direction+"-"+state, description, state, () => {
            if (this.state == "lock") {
                if (scene.hasItem("key")) {
                    scene.loseItem("key");
                    scene.showMessage("The door is open now!");
                    this.state = "open";
                    this.setTexture("door-"+direction+"-open");
                    this.description = "An open door. Where could it lead?";
                    extra();
                } else {
                    scene.tweens.add({
                        targets: this.image,
                        x: '+=' + scene.s,
                        repeat: 2,
                        yoyo: true,
                        ease: 'Sine.inOut',
                        duration: 100
                    });
                    scene.showMessage("It won't open!");
                }
            } else {
                scene.showMessage("Moving on...");
                scene.time.delayedCall(50, () => scene.gotoScene(goTo));
            }
        })
        this.setScale(0.3);
    }
}