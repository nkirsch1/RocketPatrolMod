class tInts extends Phaser.Scene {
    constructor(){
        super("intScene");
    }

    preload() {
        this.load.image('field', 'assets/field.png');
        
        // load audio
        this.load.audio('sfx_select', '/assets/blip.wav');
        this.load.audio('sfx_explosion', '/assets/exp.wav');
        this.load.audio('sfx_rocket', '/assets/rock.wav');
      }

    create() {
        this.field = this.add.tileSprite(0, 0, 640, 480, 'field').setOrigin(0,0);
        let menuConfig = {
            fontFamily: 'papyrus',
            fontSize: '40px',
            
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
          }

          this.add.text(0, 40 - borderUISize -
          borderPadding, 'OH! THATS A BASEBALL!', menuConfig);
          this.add.text(0, 60, 'Use <> arrows to move & (F) to fire', menuConfig);
          menuConfig.backgroundColor = '#00FF00';
          menuConfig.color = '#FFF';
          this.add.text(0, 380 + borderUISize + borderPadding,
          'Press < for Novice or > for Expert',  menuConfig);
          // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000,
            balltype: 0
          }
          //this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000,
            balltype: 1
          }
          //this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            // easy mode
            game.settings = {
              spaceshipSpeed: 3,
              gameTimer: 60000,
              balltype: 0
            }
            //this.sound.play('sfx_select');
            this.scene.start('2playScene');    
          }
      }
}