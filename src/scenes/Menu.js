class Menu extends Phaser.Scene {
   constructor() {
      super("menuScene");
   }
   preload() {
      (this.load.path = "assets/");
      this.load.image('altar', 'altar.png');
      this.load.image('page', 'page.png');

      this.load.audio('creaks', 'Ambient_Creaks.wav');
      this.load.audio('collect', 'Place_Page.wav');
      this.load.audio('menu_select', 'Select.wav')
      this.load.audio('whispers', 'Enemy_Sound.wav');
      this.load.audio('largeEnemyNoise', 'Large_Enemy_Sound.wav');
      this.load.audio('mainMenu', 'Main_Menu.wav');
      this.load.audio('shine', 'Shine.wav');
      this.load.audio('hurt', 'Hurt.wav');
      this.load.audio('door', 'Door_Sound.wav')

      this.load.atlas('gary_atlas', 'garysheet.png', 'garymap.json');
      this.load.atlas('bigEnemy_atlas', 'bigEnemySheet.png', 'bigEnemyMap.json');
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

      //create animation for large phantoms
      this.anims.create({
         key: 'big_phantom_ani_left',
         frames: this.anims.generateFrameNames('bigEnemy_atlas', {
            prefix: 'Big_Enemy_Left_',
            start: 0,
            end: 1,
            suffix: ''
         }),
         frameRate: 15,
         repeat: -1
      });

      this.anims.create({
         key: 'big_phantom_ani_right',
         frames: this.anims.generateFrameNames('bigEnemy_atlas', {
            prefix: 'Big_Enemy_Right_',
            start: 0,
            end: 1,
            suffix: ''
         }),
         frameRate: 15,
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

      //Menu Items
      this.add.text(20, 20, "Demons 101\nPress Space to start");

      this.scene.mainMenuMusic = this.sound.add('mainMenu', { volume: 0.5 });
      this.scene.mainMenuMusic.setLoop(true);
      this.scene.mainMenuMusic.play();

      this.input.keyboard.on('keydown-SPACE', () => {
         this.scene.mainMenuMusic.stop();
         this.scene.start("tutorialScene");
      });
   }
}