class Lab extends Phaser.Scene {
    constructor() {
        super("labScene");
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image("1bit_tiles", "tempsheet.png");
        this.load.tilemapTiledJSON("map", "labLevel.json");

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
        //create variables
        this.ROOMWIDTH = 576;
        this.ROOMHEIGHT = 576;
        
        //create the tilemap
        const map = this.add.tilemap("map");

        //add the tileset to the map
        const tileset = map.addTilesetImage("tempsheet", "1bit_tiles");

        //create the layers for the map
        const backgroundLayer = map.createLayer("Background", tileset, 0, 0);
        const collisionLayer = map.createLayer("Collision", tileset, 0, 0);
        
        //set the collision property
        collisionLayer.setCollisionByProperty({
            collides: true
        });

        //create the cursor keys
        cursors = this.input.keyboard.createCursorKeys();

        //add in the player on left hand side of screen
        this.gary = new Gary(
            this,
            this.ROOMWIDTH - 20,
            this.ROOMHEIGHT / 2,
            "gary_atlas",
            'Gary_Idle_0'
        );

        //set up the phantoms
        //create animation for the phantoms
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
        //get the phantom objects from tilemap
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

        this.bigPhantom = this.phantoms.create(-128, this.ROOMHEIGHT/2, 'enemy', 0).setScale(2);

        //create the page
        this.page = map.createFromObjects("Objects", {
            name: "page",
            key: "1bit_tiles",
            key: "page"
        });
        this.physics.world.enable(this.page, Phaser.Physics.Arcade.STATIC_BODY);
        //set up fog for mask
        this.fog = this.add.sprite(this.gary.x, this.gary.y, "fog", 0).setDepth(1);
        // this.fog.setVisible(false);
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
        })

        // Add Creaks
        this.creaks = this.sound.add('creaks', { volume: 0.5 });
        this.creaksInter = setInterval(() => {
           this.creaks.play();
        }, 10000);

        // Add Whispers
        this.whispers = this.sound.add('whispers', { volume: 0.05 });
        this.whispers.setLoop(true);
        this.whispers.play();

        //add large enemy music
        this.largeEnemySound = this.sound.add('largeEnemyNoise', {volume: 0.5});

        //handles changing scenes when on the far right of screen
        this.physics.world.on(
            "worldbounds",
            (body, blockedUp, blockedDown, blockedLeft, blockedRight) => {
                if (blockedRight) {
                    clearInterval(this.creaksInter);
                    this.whispers.stop();
                    this.largeEnemySound.stop();
                    this.scene.switch("hubScene");
                    this.gary.x -= 20;
                }
            }
        );

        //set up the camera
        this.cameras.main.setBounds(0, 0, this.ROOMWIDTH, this.ROOMWIDTH);
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.gary);

        this.events.on("wake", () => {
            cursors = this.input.keyboard.createCursorKeys();
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
            if(this.gary.sprint == false) {
               this.gary.body.setMaxVelocity(150, 150);
               this.gary.sprint = true;
               setTimeout(() => {
                  this.gary.sprint = false;
               }, 3000)
            }
         });

        //set the world collision
        this.physics.world.setBounds(0, 0, this.ROOMWIDTH, this.ROOMHEIGHT);
        this.gary.body.setCollideWorldBounds(true);
        this.gary.body.onWorldBounds = true;
        
        //add in physics colliders
        this.physics.add.collider(this.gary, collisionLayer);
        //checking for page collection
        this.physics.add.overlap(this.gary, this.page, (obj1, obj2) => {
            obj2.destroy();
            this.sound.play('collect');
            this.largeEnemySound.play();
            this.largeEnemySound.setLoop(true);
            page1 = 1;
        });
        //checking for phantom collision
        this.physics.add.overlap(this.gary, this.phantoms, () => {
            clearInterval(this.creaksInter);
            this.whispers.stop();
            this.largeEnemySound.stop();
            this.scene.start("gameOverScene");
        });
        //checking for large phantom collision
        // this.physics.add.overlap(this.gary, this.bigPhantom, () => {
        //     clearInterval(this.creaksInter);
        //     this.whispers.stop();
        //     this.largeEnemySound.stop();
        //     this.scene.start("gameOverScene");
        // });
    }

    update() {
        this.gary.update();
        if(page1 == 1) {
            this.physics.moveToObject(this.bigPhantom, this.gary, 20);
        }
        this.phantoms.getChildren().forEach((phantom) => {
            phantom.update();
        });
        this.fog.x = this.gary.x;
        this.fog.y = this.gary.y;
    }
}
