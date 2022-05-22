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

      //create the tilemap
      const map = this.add.tilemap("tutorial_map");

      //add the tileset to the map
      const tileset = map.addTilesetImage("tutorialSheet");

      //create the layers for the map
      const backgroundLayer = map.createLayer("Background", tileset, 0, 0);
      const collisionLayer = map.createLayer("Collision", tileset, 0, 0);

      //add the cursor keys
      cursors = this.input.keyboard.createCursorKeys();

      //add in gary
      this.gary = new Gary(this, 48, this.ROOMHEIGHT / 2, 'gary_atlas', 'Gary_Idle_0');

      //set the collision property
      collisionLayer.setCollisionByProperty({
         collides: true
      });

      this.doors = map.createFromObjects("Objects", {
         name: 'door',
         key: 'altar'
      });

      this.doorGroup = this.physics.add.staticGroup(this.doors);

      let phantomObjects = map.filterObjects("Objects", obj => obj.name === "phantom");
      //create an array to hold the phantom paths
      let phantomPaths = [];
      //iterate through each of the phantom objects
      phantomObjects.forEach((phantom) => {
         //create a path starting at phantom location
         let path = this.add.path(phantom.x, phantom.y);
         //iterate through the phantoms properties and get the path points
         phantom.properties.forEach((location) => {
            //add the line to the path
            let point = map.findObject("Objects", obj => obj.id === location.value);
            path.lineTo(point.x, point.y);
         });
         phantomPaths.push(path); //add the path to the list of paths
      });
      //create a group for the phantoms
      this.phantoms = this.physics.add.group();
      let i = 0;
      //iterate throught the phantom objects to create the phantoms
      phantomObjects.map((object) => {
         //create a new phantom class and give it the appropriate path
         let phantom = new Phantom(this, phantomPaths[i++], object.x, object.y, 'enemy');
         phantom.anims.play('phantom_ani');
         this.phantoms.add(phantom);
         phantom.startFollow(enemyConfig);
      });
      //create the big phantom
      this.bigPhantom = this.phantoms.create(this.ROOMWIDTH + 128, this.ROOMHEIGHT / 2, 'enemy', 0).setScale(2).setFlipX(true);
      //create the page
      this.page = map.createFromObjects("Objects", {
         name: "page",
         key: "page"
      });
      this.physics.world.enable(this.page, Phaser.Physics.Arcade.STATIC_BODY);


      this.fog = this.add.sprite(this.gary.x, this.gary.y, "fog", 0).setDepth(1);

      //set up the camera
      this.cameras.main.setBounds(0, 0, this.ROOMWIDTH, this.ROOMWIDTH);
      this.cameras.main.setZoom(2);
      this.cameras.main.startFollow(this.gary);

      //set the world collision
      this.gary.body.setCollideWorldBounds(true);
      this.gary.body.onWorldBounds = true;
      this.physics.world.setBounds(0, 0, this.ROOMWIDTH, this.ROOMHEIGHT);

      this.physics.add.collider(this.gary, collisionLayer);
      this.physics.add.collider(this.gary, this.doorGroup);

      //add large enemy music
      this.largeEnemySound = this.sound.add('largeEnemyNoise', { volume: 0.5 });
      this.physics.add.overlap(this.gary, this.page, (obj1, obj2) => {
         obj2.destroy();
         this.sound.play('collect');
         this.largeEnemySound.play();
         this.largeEnemySound.setLoop(true);
         page0= 1;
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

      //handling for player input
      cursors.space.on("down", () => {
         if (this.gary.energy == true) {
            this.gary.energy = false;
            this.fog.anims.play('fog_ani');
         }
         setTimeout(() => {
            this.gary.energy = true;
         }, 10000);
      });

      cursors.shift.on('down', () => {
         if (this.gary.sprint == false) {
            this.gary.body.setMaxVelocity(150, 150);
            this.gary.sprint = true;
            setTimeout(() => {
               this.gary.sprint = false;
            }, 3000)
         }
      });

      this.physics.world.on('worldbounds', (body, blockedUp, blockedDown, blockedLeft, blockedRight) => {
         if (blockedLeft) {
            // clearInterval(this.creaksInter);
            this.largeEnemySound.stop();
            this.scene.switch("hubScene");
         }
      });

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