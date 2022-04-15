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