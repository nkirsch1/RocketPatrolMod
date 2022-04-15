class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.image('bat2', 'assets/bat2.png');
        this.load.image('softball', 'assets/softball.png');
        // load spritesheet
        this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

create() {


   

    this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
    
    this.add.rectangle(0, borderUISize, config.width, borderUISize*2, 0x00FFFF).setOrigin(0,0)

    this.add.rectangle(0, 0, config.width, borderUISize, 0x0000FF).setOrigin(0,0)
    this.add.rectangle(0, config.height - borderUISize, config.width, borderUISize, 0x0000FF).setOrigin(0,0)
    this.add.rectangle(0, 0, borderUISize, config.height, 0x0000FF).setOrigin(0,0)
    this.add.rectangle(config.width - borderUISize, 0, borderUISize, config.height, 0x0000FF).setOrigin(0,0)

      // define keys
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    
    if (game.settings.balltype == 0) {
    this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
    } else if (game.settings.balltype == 1) {
        this.p1Rocket = new softball(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'softball').setOrigin(0.5, 0);
        }
    else if (game.settings.balltype == 2) {
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.66, 0);
        this.p2Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.33, 0);
        }
    // add spaceships (x3)
    this.ship01 = new bat2(this, game.config.width + borderUISize*6, borderUISize*4, 'bat2', 0, 60).setOrigin(0, 0);
    this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
    this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
    
    // animation config
    this.anims.create({
    key: 'explode',
    frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
    frameRate: 30
});

// initialize score
this.p1Score = 0;
  // display score
  let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
      top: 5,
      bottom: 5,
    },
    fixedWidth: 100
  }
  this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

  let timeConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
      top: 5,
      bottom: 5,
    },
    fixedWidth: 100
  }
  //this.timeLeft = this.add.text(240, 250, game.setting.gameTimer, timeConfig);

// GAME OVER flag
this.gameOver = false;

// 60-second play clock
scoreConfig.fixedWidth = 0;
this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
    this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or < for Menu', scoreConfig).setOrigin(0.5);
    this.gameOver = true;
}, null, this);
}
    

update()
{
    // check key input for restart
  if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        this.scene.restart();
    }
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        this.scene.start("menuScene");
}
    this.starfield.tilePositionX -= 0;
    this.p1Rocket.update();

    this.ship01.update();               // update spaceships (x3)
    
    this.ship02.update();
    this.ship03.update();

    if (game.settings.balltype == 2) {
    if(keyLEFT.isDown && this.p1Rocket.x >= borderUISize + this.p1Rocket.width) {
        this.p1Rocket.x -= this.p1Rocket.moveSpeed;
        //console.log("2");
    } else if (keyRIGHT.isDown && this.p1Rocket.x <= game.config.width - 
        borderUISize - this.p1Rocket.width) {
        this.p1Rocket.x += this.p1Rocket.moveSpeed;
        //console.log("3");
    }
    if(keyA.isDown && this.p2Rocket.x >= borderUISize + this.p2Rocket.width) {
        this.p2Rocket.x -= this.p2Rocket.moveSpeed;
        //console.log("2");
    } else if (keyD.isDown && this.p2Rocket.x <= game.config.width - 
        borderUISize - this.p2Rocket.width) {
        this.p2Rocket.x += this.p2Rocket.moveSpeed;
        //console.log("3");
    }

    if (Phaser.Input.Keyboard.JustDown(keyF) && !this.p1Rocket.isFiring) {
        this.p1Rocket.isFiring = true;
        //this.sfxRocket.play();  // play sfx
      }
    
            if(this.p1Rocket.isFiring && this.p1Rocket.y >= borderUISize * 3 + borderPadding) {
                this.p1Rocket.y -= this.p1Rocket.moveSpeed;
            }
            if(this.p1Rocket.y <= borderUISize * 3 + borderPadding) {
                this.p1Rocket.isFiring= false;
                this.p1Rocket.y = game.config.height - borderUISize - borderPadding;
            }
            if (Phaser.Input.Keyboard.JustDown(keyW) && !this.p2Rocket.isFiring) {
                this.p2Rocket.isFiring = true;
                //this.sfxRocket.play();  // play sfx
              }
            
                    if(this.p2Rocket.isFiring && this.p2Rocket.y >= borderUISize * 3 + borderPadding) {
                        this.p2Rocket.y -= this.p2Rocket.moveSpeed;
                    }
                    if(this.p2Rocket.y <= borderUISize * 3 + borderPadding) {
                        this.p2Rocket.isFiring= false;
                        this.p2Rocket.y = game.config.height - borderUISize - borderPadding;
        }
}


    // check collisions
    if(this.checkCollision(this.p1Rocket, this.ship03)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship03);   
    }
    if (this.checkCollision(this.p1Rocket, this.ship02)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship02);
    }
    if (this.checkCollision(this.p1Rocket, this.ship01)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship01);
    }
    if (game.settings.balltype == 2) {
    if(this.checkCollision(this.p2Rocket, this.ship03)) {
        this.p2Rocket.reset();
        this.shipExplode(this.ship03);   
    }
    if (this.checkCollision(this.p2Rocket, this.ship02)) {
        this.p2Rocket.reset();
        this.shipExplode(this.ship02);
    }
    if (this.checkCollision(this.p2Rocket, this.ship01)) {
        this.p2Rocket.reset();
        this.shipExplode(this.ship01);
    }
}
    if (!this.gameOver) {               
        this.p1Rocket.update();         // update rocket sprite
        if (game.settings.balltype == 2) {
        this.p2Rocket.update();
        }
        this.ship01.update();           // update spaceships (x3)
        this.ship02.update();
        this.ship03.update();
    } 
    
 }

checkCollision(rocket, ship) {
    // simple AABB checking
    if (rocket.x < ship.x + ship.width && 
        rocket.x + rocket.width > ship.x && 
        rocket.y < ship.y + ship.height &&
        rocket.height + rocket.y > ship. y) {
            return true;
    } else {
        return false;
    }
}
shipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0;                         
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explode');             // play explode animation
    boom.on('animationcomplete', () => {    // callback after ani completes
      ship.reset();                       // reset ship position
      ship.alpha = 1;                     // make ship visible again
      boom.destroy();                     // remove explosion sprite
    });
    // score add and repaint
    this.p1Score += ship.points;
    this.scoreLeft.text = this.p1Score;    
    //this.sound.play('sfx_explosion');   
  }
}