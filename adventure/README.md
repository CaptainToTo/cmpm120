A simple adventure game by Anthony Umemoto based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: Kitchen, Livingroom, Entrance, and Backyard.
- **2+ scenes *not* based on `AdventureScene`**: Intro, Menu, and Outro.
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: Added an Interactable class to simplify the process of making things to interact with. The interface makes it so that programming only requires what the object will look like, and what will happen when it's clicked.
    - Enhancement 2: Added a background attribute to the AdventureScene class. This allows just the background image alias to be given to the constructor, and the scene will load it in by default.
    - Enhancement 3: Added a loadAssets() methods that acts like a preload(). This is so scenes can load their own assets without having to overload the preload() method they inheret from AdventureScene.

Experience requirements:
- **4+ locations in the game world**: unsatisfied (name at least 4 of the classes).
- **2+ interactive objects in most scenes**: unsatisfied (describe two examples)
- **Many objects have `pointerover` messages**: unsatisfied (describe two examples)
- **Many objects have `pointerdown` effects**: unsatisfied (describe two examples)
- **Some objects are themselves animated**: unsatisfied (describe two examples)

Asset sources:
- (For each image/audio/video asset used, describe how it was created. What tool did you use to create it? Was it based on another work? If so, how did you change it, and where can we learn more about the original work for comparison? Use [Markdown link syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#links).)

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.