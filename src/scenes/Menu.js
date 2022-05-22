class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        (this.load.path = "assets/");
        this.load.image('altar', 'temp_altar.png');
        this.load.image('page', 'tempPage.png');

        this.load.audio('creaks', 'Creaks.wav');
        this.load.audio('collect', 'select.wav');
        this.load.audio('whispers', 'Ghost_Whisper.wav');
        this.load.audio('largeEnemyNoise', 'Larger_Enemy_Noise.wav');
        this.load.audio('mainMenu', 'MainMenu.wav');

        this.load.atlas('gary_atlas', 'garysheet.png', 'garymap.json');
        this.load.spritesheet('fog', 'fog_ani.png', {
            frameWidth: 700,
            frameHeight: 700,
            startFrame: 0,
            endFrame: 9
        });
   
         this.load.spritesheet('enemy', 'enemysheet.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 1
        });
    }

    create() {
        this.add.text(20, 20, "Spooky Spooky Ahhhhh!\nPress Space to start");
              //create the gary animations
      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('gary_atlas', {
           prefix: 'Gary_Idle_',
           start: 0,
           end: 5,
           suffix: ''
        }),
        frameRate: 5,
        repeat: -1
     });

     this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNames('gary_atlas', {
           prefix: 'Gary_Left_',
           start: 0,
           end: 3,
           suffix: ''
        }),
        frameRate: 15,
        repeat: -1
     });

     this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNames('gary_atlas', {
           prefix: 'Gary_Right_',
           start: 0,
           end: 3,
           suffix: ''
        }),
        frameRate: 15,
        repeat: -1
     });

     this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNames('gary_atlas', {
           prefix: 'Gary_Up_',
           start: 0,
           end: 3,
           suffix: ''
        }),
        frameRate: 15,
        repeat: -1
     });

     //create the animation for the phantoms
     this.anims.create({
        key: 'phantom_ani',
        frames: this.anims.generateFrameNumbers('enemy', {
            start: 0,
            end: 1,
            first: 0,
        }),
        frameRate: 5,
        repeat: -1
     });

     //create an animation for fog
     this.anims.create({
        key: 'fog_ani',
        frames: this.anims.generateFrameNumbers('fog', {
            start: 0,
            end: 9,
            first: 0
        }),
        duration: 1000,
        repeat: 0,
        yoyo: true,
     });
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start("tutorialScene");
         });

    }
}