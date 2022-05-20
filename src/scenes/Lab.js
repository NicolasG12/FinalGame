class Lab extends Phaser.Scene {
    constructor() {
        super("labScene");
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image("1bit_tiles", "tempsheet.png");
        this.load.tilemapTiledJSON("map", "labLevel.json");
        this.load.spritesheet("spooky_sheet", "tempsheet.png", {
            frameWidth: 32, 
            frameHeight: 32
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
        let phantomObjects = map.filterObjects("Objects", obj => obj.name === "phantom");
        console.log(phantomObjects);
        let phantomPaths = [];
        phantomObjects.forEach((phantom) => {
            let path = this.add.path(phantom.x, phantom.y);
            phantom.properties.forEach((location) => {
                console.log(location.value);
                let point = map.findObject("Objects", obj => obj.id === location.value);
                console.log(point);
                path.lineTo(point.x, point.y);
            });
            phantomPaths.push(path);
        });
        this.phantoms = this.add.group();
        let i = 0;
        phantomObjects.map((object) => {
            let phantom = new Phantom(this, phantomPaths[i++], object.x, object.y, 'enemy');
            this.phantoms.add(phantom);
            phantom.startFollow(enemyConfig);
        });

        //set up fog for mask
        this.fog = this.add.sprite(this.gary.x, this.gary.y, "fog").setDepth(1);
        this.fog.setVisible(false);
        this.burstFog = this.add.sprite(this.gary.x, this.gary.y, "burstFog").setDepth(1);
        this.burstFog.setVisible(false);

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
        this.enemyMusic = this.sound.add('largeEnemyNoise', {volume: 0.5});

        //handles changing scenes when on the far right of screen
        this.physics.world.on(
            "worldbounds",
            (body, blockedUp, blockedDown, blockedLeft, blockedRight) => {
                if (blockedRight) {
                    clearInterval(this.creaksInter);
                    this.whispers.stop();
                    this.enemyMusic.stop();
                    this.scene.switch("hubScene");
                    this.gary.x -= 20;
                }
            }
        );

        //set up the camera
        this.cameras.main.setBounds(0, 0, this.ROOMWIDTH, this.ROOMWIDTH);
        this.cameras.main.setZoom(1);
        this.cameras.main.startFollow(this.gary);

        this.events.on("wake", () => {
            cursors = this.input.keyboard.createCursorKeys();
        });

        //handling for player input
        cursors.space.on("down", () => {
            if (this.gary.energy == true) {
                this.fog.setVisible(false);
                this.gary.energy = false;
                setTimeout(() => {
                    this.fog.setVisible(true);
                }, 2000);
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
        this.physics.add.overlap(this.gary, this.page, () => {
            this.page.destroy();
            this.sound.play('collect');
            this.enemyMusic.play();
            this.enemyMusic.setLoop(true);
            page1 = 1;
        });
        //checking for phantom collision
        // this.physics.add.overlap(this.gary, this.phantoms, () => {
        //     clearInterval(this.creaksInter);
        //     this.whispers.stop();
        //     this.enemyMusic.stop();
        //     this.scene.start("gameOverScene");
        // });
        // //checking for large phantom collision
        // this.physics.add.overlap(this.gary, this.bigPhantom, () => {
        //     clearInterval(this.creaksInter);
        //     this.whispers.stop();
        //     this.enemyMusic.stop();
        //     this.scene.start("gameOverScene");
        // });
    }

    update() {
        this.gary.update();
        if(page1 == 1) {
            // this.bigPhantom.setVisible(true);
            // this.physics.moveToObject(this.bigPhantom, this.gary, 20);
        }
        this.fog.x = this.gary.x;
        this.fog.y = this.gary.y;
        this.burstFog.x = this.gary.x;
        this.burstFog.y = this.gary.y;
    }
}
