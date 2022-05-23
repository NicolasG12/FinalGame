class Tutorial extends Phaser.Scene {
   constructor() {
      super("tutorialScene");
   }

   preload() {
      this.load.path = "./assets/";
      this.load.image("tutorialSheet", "tutorialSheet.png");
      this.load.tilemapTiledJSON("tutorial_map", "tutorialLevel.json");


   }

   create() {
      //define variables
      this.ROOMWIDTH = 448;
      this.ROOMHEIGHT = 256;
      garyX = 48;
      garyY = this.ROOMHEIGHT / 2
      //create the tilemap
      const map = this.add.tilemap('tutorial_map');

      //add the tileset to the map
      const tileset = map.addTilesetImage('tutorialSheet');
      this.setup(this, map, this.ROOMWIDTH, this.ROOMHEIGHT, garyX, garyY);

      this.doors = map.createFromObjects("Objects", {
         name: 'door',
         key: 'altar'
      });

      this.doorGroup = this.physics.add.staticGroup(this.doors);
      this.page = map.createFromObjects("Objects", {
         name: "page",
         key: "page"
      });
      this.physics.add.overlap(this.gary, this.page, (obj1, obj2) => {
         obj2.destroy();
         this.sound.play('collect');
         this.largeEnemySound.play();
         this.largeEnemySound.setLoop(true);
         page0 = 1;
         this.doors.forEach((door) => {
            door.destroy();
         });
      });
      //checking for phantom collision
      this.physics.add.overlap(this.gary, this.phantoms, () => {
         clearInterval(this.creaksInter);
         // this.whispers.stop();
         this.largeEnemySound.stop();
         this.scene.start("gameOverScene");
      });
      //create the big phantom
      this.bigPhantom = this.phantoms.create(this.ROOMWIDTH + 128, this.ROOMHEIGHT / 2, 'enemy', 0).setScale(2).setFlipX(true);
      //create the page
      this.physics.world.enable(this.page, Phaser.Physics.Arcade.STATIC_BODY);

      this.physics.add.collider(this.gary, this.doorGroup);


      this.physics.world.on('worldbounds', (body, blockedUp, blockedDown, blockedLeft, blockedRight) => {
         if (blockedLeft) {
            // clearInterval(this.creaksInter);
            this.largeEnemySound.stop();
            this.scene.switch("hubScene");
         }
      });


   }

   setup(scene, map, tileset, width, height, garyX, garyY) {
      //create the layers for the map
      const backgroundLayer = map.createLayer("Background", tileset, 0, 0);
      const collisionLayer = map.createLayer("Collision", tileset, 0, 0);

      //add the cursor keys
      cursors = scene.input.keyboard.createCursorKeys();

      //add in gary
      scene.gary = new Gary(scene, garyX, garyY, 'gary_atlas', 'Gary_Idle_0');

      //set the collision property
      collisionLayer.setCollisionByProperty({
         collides: true
      });
      scene.fog = scene.add.sprite(scene.gary.x, scene.gary.y, "fog", 0).setDepth(1);
      //set up the camera
      scene.cameras.main.setBounds(0, 0, width, height);
      scene.cameras.main.setZoom(2);
      scene.cameras.main.startFollow(scene.gary);

      //set the world collision
      scene.gary.body.setCollideWorldBounds(true);
      scene.gary.body.onWorldBounds = true;
      scene.physics.world.setBounds(0, 0, width, height);

      scene.physics.add.collider(scene.gary, collisionLayer);
      //add large enemy music
      scene.largeEnemySound = scene.sound.add('largeEnemyNoise', { volume: 0.5 });

      let phantomObjects = map.filterObjects("Objects", obj => obj.name === "phantom");
      let phantomPaths = [];
      //iterate through each of the phantom objects
      phantomObjects.forEach((phantom) => {
         //create a path starting at phantom location
         let path = scene.add.path(phantom.x, phantom.y);
         //iterate through the phantoms properties and get the path points
         phantom.properties.forEach((location) => {
            //add the line to the path
            let point = map.findObject("Objects", obj => obj.id === location.value);
            path.lineTo(point.x, point.y);
         });
         phantomPaths.push(path); //add the path to the list of paths
      });
      scene.phantoms = scene.physics.add.group();
      let i = 0;
      //iterate throught the phantom objects to create the phantoms
      phantomObjects.map((object) => {
         //create a new phantom class and give it the appropriate path
         let phantom = new Phantom(scene, phantomPaths[i++], object.x, object.y, 'enemy');
         scene.phantoms.add(phantom);
         phantom.startFollow(enemyConfig);
      });
      //handling for player input
      cursors.space.on("down", () => {
         if (scene.gary.energy == true) {
            scene.gary.energy = false;
            scene.fog.anims.play('fog_ani');
         }
         setTimeout(() => {
            scene.gary.energy = true;
         }, 10000);
      });

      cursors.shift.on('down', () => {
         if (scene.gary.sprint == false) {
            scene.gary.body.setMaxVelocity(150, 150);
            scene.gary.sprint = true;
            setTimeout(() => {
               scene.gary.sprint = false;
            }, 3000)
         }
      });

      // Add Creaks
      scene.creaks = scene.sound.add('creaks', { volume: 0.5 });
      scene.creaksInter = setInterval(() => {
         scene.creaks.play();
      }, 10000);

      // Add Whispers
      scene.whispers = scene.sound.add('whispers', { volume: 0.05 });
      scene.whispers.setLoop(true);
      scene.whispers.play();

      //add large enemy music
      scene.largeEnemySound = scene.sound.add('largeEnemyNoise', { volume: 0.5 });
   }
   update() {
      this.gary.update();
      if (page1 == 1) {
         this.physics.moveToObject(this.bigPhantom, this.gary, 20);
      }
      this.fog.x = this.gary.x;
      this.fog.y = this.gary.y;
   }
}