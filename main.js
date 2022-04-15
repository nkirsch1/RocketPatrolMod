
//Noah Kirsch, OH! THAT'S A BASEBALL, 4/15/22, 8 Hours to complete

//Breakdown:
//Allow the player to control the Rocket after it's fired [In Novice Mode] (5)
//Create a new title screen (e.g., new artwork, typography, layout) (10)
//Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
//Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 
//Create and implement a new weapon (w/ new behavior and graphics) [In Expert mode] (20)
//Implement a simultaneous two-player mode [Press up to Play] (30)
//Total: (105)


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
};
//slight change for repo
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyW, keyA, keyD;


let borderUISize = config.height / 15;
let borderPadding = borderUISize / 3;


let game = new Phaser.Game(config);