class Kitchen1 extends AdventureScene {
    constructor() {
        super("Kitchen1", "Kitchen", "kitchen.png", 0.8);
    }

    loadAssets() {
        this.load.image("switch-right-on", "switch-right-on.png");
        this.load.image("switch-right-off", "switch-right-off.png");
    }

    onEnter() {
        this.switch = new Interactable(this, 
            this.w * 0.7, this.h * 0.75, "switch-right-on", 
            "A light switch. It's like another world when it's dark.", "on", () => {
                if (this.switch.state == "off") {
                    this.switch.setTexture("switch-right-on");
                    this.switch.state = "on";
                } else {
                    this.switch.setTexture("switch-right-off");
                    this.switch.state = "off";
                }
            });
        this.switch.setScale(0.2);
    }
}