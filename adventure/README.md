A simple adventure game by [Anthony Umemoto](hhtps://github.com/CaptainToTo) based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: Kitchen, Livingroom, Entrance, and Backyard.
- **2+ scenes *not* based on `AdventureScene`**: Intro, Menu, and Outro.
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: Added an Interactable class to simplify the process of making things to interact with. The interface makes it so that programming only requires what the object will look like, and what will happen when it's clicked.
    - Enhancement 2: Added a background attribute to the AdventureScene class. This allows just the background image alias to be given to the constructor, and the scene will load it in by default.
    - Enhancement 3: Added a loadAssets() methods that acts like a preload(). This is so scenes can load their own assets without having to overload the preload() method they inheret from AdventureScene.

Experience requirements:
- **4+ locations in the game world**: unsatisfied (name at least 4 of the classes).
- **2+ interactive objects in most scenes**: light switches, doors, and keys.
- **Many objects have `pointerover` messages**: all Interactable objects.
- **Many objects have `pointerdown` effects**: all Interactable objects.
- **Some objects are themselves animated**: keys and doors are animated.

Asset sources:
- ATUMEMOT logo was created by me in Adobe Illustrator.
- All other visual assets were created by me in Aseprite.

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.
- All other `.js` were created by me, using the `AdventureScene` class created by [Adam Smith](https://github.com/rndmcnlly).