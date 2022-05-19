class Lab extends Phaser.Scene {
    constructor() {
        super("labScene");
    }
    preload() {
        this.load.spritesheet("lab_sheet", "./assets/spooky_spritesheet.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.tilemapTiledJSON("lab_level", "./assets/labLevel.json");
    }

    create() {
        const map = this.add.tilemap("lab_level");
        const tileset = map.addTilesetImage("spooky_spritesheet", "lab_sheet");
        
        const backgroundLayer = map.createLayer("Background", tileset, 0, 0);
        const collisionLayer = map.createLayer("Collision", tileset, 0, 0);

        collisionLayer.setCollisionByProperty({
            collides: true
        });
        
        // this.enemies = map.createFromObjects("Objects", {
        //     name: "enemy",
        //     key: "lab_sheet",
        //     frame: 0
        // });

        // this.page = map.createFromObjects("Objects", {
        //     name: "page",
        //     key: "lab_sheet",
        //     frame: 2
        // });

        this.enemyGroup = this.add.group(this.enemies);

        //create the cursor keys
        cursors = this.input.keyboard.createCursorKeys();
        keys = this.input.keyboard.addKeys("W,S,A,D");

        //get the room object
        this.room = roomSizes.find((room) => room.room == "lab");
        //add in the player on left hand side of screen
        this.gary = new Gary(
            this,
            this.room.width - 20,
            this.room.height / 2,
            "gary",
            0
        ).setScale(0.4);
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


        //set the world collision
        this.physics.world.setBounds(0, 0, this.room.width, this.room.height);
        this.gary.body.setCollideWorldBounds(true);
        this.gary.body.onWorldBounds = true;

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

        //create paths for the enemy


        //set up the camera
        this.cameras.main.setBounds(0, 0, this.room.width, this.room.height);
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.gary);

        this.events.on("wake", () => {
            cursors = this.input.keyboard.createCursorKeys();
            keys = this.input.keyboard.addKeys("W,S,A,D");
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
        //add in physics colliders
        this.physics.add.collider(this.gary, collisionLayer);
        this.physics.add.overlap(this.gary, this.page, () => {
            this.page.destroy();
            this.sound.play('collect');
            this.enemyMusic.play();
            this.enemyMusic.setLoop(true);
            page1 = 1;
        });
        this.physics.add.overlap(this.gary, this.phantoms, () => {
            clearInterval(this.creaksInter);
            this.whispers.stop();
            this.enemyMusic.stop();
            this.scene.start("gameOverScene");
        });
        this.physics.add.overlap(this.gary, this.bigPhantom, () => {
            clearInterval(this.creaksInter);
            this.whispers.stop();
            this.enemyMusic.stop();
            this.scene.start("gameOverScene");
        });
    }

    update() {
        this.gary.update();
        if(page1 == 1) {
            this.bigPhantom.setVisible(true);
            this.physics.moveToObject(this.bigPhantom, this.gary, 20);
        }
        this.fog.x = this.gary.x;
        this.fog.y = this.gary.y;
        this.burstFog.x = this.gary.x;
        this.burstFog.y = this.gary.y;
    }
}
