class Hub extends Phaser.Scene {
   constructor() {
      super("hubScene");
   }

   preload() {
      this.load.path = "./assets/tilemaps/";
      this.load.tilemapTiledJSON("hub_map", "hubLevel.json");
      this.load.image("hubSheet", "hub_spritesheet_extruded.png");


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

      this.labDoor = map.createFromObjects("Objects", {
         name: 'labDoor',
         key: 'door'
      });
      this.physics.world.enable(this.labDoor, Phaser.Physics.Arcade.STATIC_BODY);
      // this.labDoors = this.physics.add.staticGroup(this.labDoor);
      this.computerDoor = map.createFromObjects("Objects", {
         name: 'computerDoor',
         key: 'door'
      });
      this.physics.world.enable(this.computerDoor, Phaser.Physics.Arcade.STATIC_BODY);
      this.libraryDoor = map.createFromObjects("Objects", {
         name: 'libraryDoor',
         key: 'door'
      });
      this.physics.world.enable(this.libraryDoor, Phaser.Physics.Arcade.STATIC_BODY);
      let doors = [this.labDoor, this.computerDoor, this.libraryDoor];
      //create the altar
      this.altar = this.physics.add.image(160, 192, 'altar');


      this.particles = this.add.particles('particles');

      doors.forEach((child) => {
         child.forEach((door) => {
            let deathZone = new Phaser.Geom.Rectangle(door.x - 16, door.y - 16, 32, 32);
            this.particles.createEmitter({
               frame: 1,
               x: door.x,
               y: door.y,
               speed: { min: 10, max: 500, steps: 5000 },
               lifespan: 4000,
               quantity: 10,
               deathZone: {type: 'onLeave', source: deathZone}
            });
         });
      });

      this.labDoorEmitters = [this.particles.emitters.list[0], this.particles.emitters.list[1]];
      this.computerDoorEmitters = [this.particles.emitters.list[2], this.particles.emitters.list[3]];
      this.libraryDoorEmitters = [this.particles.emitters.list[4], this.particles.emitters.list[5]];

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
            this.gary.x += 50;
         }
         if(blockedUp) {
            clearInterval(this.creaksInter);
            this.sound.play('door', { volume: 0.5 });
            this.scene.switch("computerLabScene");
            this.gary.y += 75;
         }
         if(blockedRight) {
            clearInterval(this.creaksInter);
            this.sound.play('door', { volume: 0.5 });
            this.scene.switch("libraryScene");
            this.gary.x -= 50;
         }
      });

      //when the player returns to the scene recreate the cursor keys
      this.events.on('wake', () => {
         cursors = this.input.keyboard.createCursorKeys();
         this.sound.stopByKey('whispers');
      });

      //add in physics colliders
      this.physics.add.collider(this.gary, collisionLayer);
      this.physics.add.collider(this.gary, this.labDoor);
      this.physics.add.collider(this.gary, this.computerDoor);
      this.physics.add.collider(this.gary, this.libraryDoor);
      this.physics.add.overlap(this.gary, this.altar, () => {
         if(page0 == 1) {
            page0 = 2;
            this.sound.play('collect');
            this.cameras.main.shake(100, 0.005);
            this.physics.world.disable(this.labDoor);
            this.labDoorEmitters.forEach((emitter) => {
               emitter.stop();
            });
         }
         if (page1 == 1) {
            page1 = 2;
            this.sound.play('collect');
            this.cameras.main.shake(100, 0.005);
            this.physics.world.enable(this.labDoor);
            this.physics.world.disable(this.computerDoor);
            this.labDoorEmitters.forEach((emitter) => {
               emitter.start();
            });
            this.computerDoorEmitters.forEach((emitter) => {
               emitter.stop();
            });
         }
         if(page2 == 1) {
            page2 = 2;
            this.sound.play('collect');
            this.cameras.main.shake(100, 0.005);
            this.physics.world.enable(this.computerDoor);
            this.physics.world.disable(this.libraryDoor);
            this.computerDoorEmitters.forEach((emitter) => {
               emitter.start();
            });
            this.libraryDoorEmitters.forEach((emitter) => {
               emitter.stop();
            });
         }
         if(page3 == 1) {
            page3 = 2;
            this.sound.play('collect');
            this.cameras.main.shake(100, 0.005);
            this.physics.world.enable(this.computerDoor);
            this.libraryDoorEmitters.forEach((emitter) => {
               emitter.start();
            });
         }
         this.garyParticles.stop();
      });

      this.garyParticles = this.particles.createEmitter({
         frame: 0,
         follow: this.gary,
         speed: 100,
         lifespan: 300,
         gravity: {x: 0, y: 200},
         scale: {start: 0.1, end: 1}
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
