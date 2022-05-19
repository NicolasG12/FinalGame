class Hub extends Phaser.Scene {
   constructor() {
      super("hubScene");
   }

   create() {
      this.add.image(0, 0, 'labBackground');;
      //define the variables
      this.ROOMWIDTH = 320;
      this.ROOMHEIGHT = 320;


      //assign keys for movement
      cursors = this.input.keyboard.createCursorKeys();

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
      
      //create the player avatar
      this.gary = new Gary(this, this.ROOMWIDTH - 20, this.ROOMHEIGHT - 20, "gary_atlas", 'Gary_Idle_0');


      //create an altar object
      this.altar = this.physics.add.sprite(game.config.width / 4, game.config.height / 4, "altar", 0).setScale(2);

      this.creaks = this.sound.add('creaks', { volume: 0.5 });
      this.creaksInter = setInterval(() => {
         this.creaks.play();
      }, 10000);


      //place tables
      this.tables = this.physics.add.group();
      hubTables.forEach((table) => {
         this.tables.create(table.x, table.y, table.texture).setOrigin(0).setScale(.2).setImmovable(true);
      });
      //set up the camera  
      this.cameras.main.setBounds(0, 0, this.ROOMWIDTH, this.ROOMHEIGHT);
      this.cameras.main.setZoom(2);
      this.cameras.main.startFollow(this.gary);

      //set the world collision
      this.gary.body.setCollideWorldBounds(true);
      this.gary.body.onWorldBounds = true;
      this.physics.world.setBounds(0, 0, this.ROOMWIDTH, this.ROOMHEIGHT);

      this.physics.world.on('worldbounds', (body, blockedUp, blockedDown, blockedLeft, blockedRight) => {
         if (blockedLeft) {
            clearInterval(this.creaksInter);
            this.scene.switch("labScene");
            this.gary.x += 20;
         }
      });

      this.events.on('wake', () => {
         cursors = this.input.keyboard.createCursorKeys();
      });

      this.physics.add.collider(this.gary, this.tables);
      this.physics.add.overlap(this.gary, this.altar, () => {
         if (page1 == 1) {
            page1 = 2;
            clearInterval(this.creaksInter);
            this.sound.play('collect');
            this.scene.start("gameClearScene");
         }
      });

   }

   update() {
      this.gary.update();
   }
}
