class Hub extends Phaser.Scene {
   constructor() {
      super("hubScene");
   }

   preload() {
      this.load.path = "./assets/";
      this.load.tilemapTiledJSON("hub_map", "hubLevel.json");

   }

   create() {
      //define the variables
      this.ROOMWIDTH = 320;
      this.ROOMHEIGHT = 352;

      //create the tilemap
      const map = this.add.tilemap("hub_map");

      //add the tileset to the map
      const tileset = map.addTilesetImage("hub_spritesheet", "hubSheet");

      //create the layers for the map
      const backgroundLayer = map.createLayer("Background", tileset, 0, 0);
      const collisionLayer = map.createLayer("Collision", tileset, 0, 0);

      //set the collision property
      collisionLayer.setCollisionByProperty({
         collides: true
      });
      
      //create the altar
      this.altar = this.physics.add.image(160, 192, 'altar');

      //create the player avatar
      this.gary = new Gary(this, this.ROOMWIDTH - 48, this.ROOMHEIGHT - 48, "gary_atlas", 'Gary_Idle_0');

      //assign keys for movement
      cursors = this.input.keyboard.createCursorKeys();

      //sounds
      this.creaks = this.sound.add('creaks', { volume: 0.5 });
      this.creaksInter = setInterval(() => {
         this.creaks.play();
      }, 10000);

      //set up the camera  
      this.cameras.main.setBounds(0, 0, this.ROOMWIDTH, this.ROOMHEIGHT);
      this.cameras.main.setZoom(2);
      this.cameras.main.startFollow(this.gary);

      //set the world collision
      this.gary.body.setCollideWorldBounds(true);
      this.gary.body.onWorldBounds = true;
      this.physics.world.setBounds(0, 0, this.ROOMWIDTH, this.ROOMHEIGHT);

      //set the world collision
      this.physics.world.on('worldbounds', (body, blockedUp, blockedDown, blockedLeft, blockedRight) => {
         if (blockedLeft) {
            clearInterval(this.creaksInter);
            this.sound.play('door', { volume: 0.5 });
            this.scene.switch("labScene");
            this.gary.x += 20;
         }
         if(blockedUp) {
            clearInterval(this.creaksInter);
            this.sound.play('door', { volume: 0.5 });
            this.scene.switch("computerLabScene");
            this.gary.y += 20;
         }
         if(blockedRight) {
            clearInterval(this.creaksInter);
            this.sound.play('door', { volume: 0.5 });
            this.scene.switch("libraryScene");
            this.gary.x -= 20;
         }
      });

      //when the player returns to the scene recreate the cursor keys
      this.events.on('wake', () => {
         cursors = this.input.keyboard.createCursorKeys();
         this.scene.sleep('HUD');
      });

      //add in physics colliders
      this.physics.add.collider(this.gary, collisionLayer);
      this.physics.add.overlap(this.gary, this.altar, () => {
         if(page0 == 1) {
            page0 = 2;
            this.sound.play('collect');
            this.cameras.main.shake(100, 0.005);
         }
         if (page1 == 1) {
            page1 = 2;
            this.sound.play('collect');
            this.cameras.main.shake(100, 0.005);
         }
         if(page2 == 1) {
            page2 = 2;
            this.sound.play('collect');
            this.cameras.main.shake(100, 0.005);
         }
         if(page3 == 1) {
            page3 = 2;
            this.sound.play('collect');
            this.cameras.main.shake(100, 0.005);
         }

      });
   }

   update() {
      this.gary.update();
      //check for end of game scenario
      if(page0 == 2 && page1 == 2 && page2 ==2 && page3 == 2) {
         this.scene.start("gameClearScene");
      }
   }
}
