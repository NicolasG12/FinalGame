class Lab extends Phaser.Scene {
    constructor() {
        super("labScene");
    }
    create() {
        //create variables
        this.ROOMWIDTH = 480;
        this.ROOMHEIGHT = 480;
        

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
        //set up fog for mask
        this.fog = this.add.sprite(this.gary.x, this.gary.y, "fog").setDepth(1);
        // this.fog.setVisible(false);
        this.burstFog = this.add.sprite(this.gary.x, this.gary.y, "burstFog").setDepth(1);
        // this.burstFog.setVisible(false);

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
        this.physics.world.setBounds(0, 0, this.ROOMWIDTH, this.ROOMHEIGHT);
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
        //enemy one path
        this.phantomPath1 = this.add.path(75, 145);
        this.phantomPath1.lineTo(425, 145);
        let s = this.phantomPath1.getStartPoint();
        this.phantom1 = this.add
            .follower(this.phantomPath1, s.x, s.y, "enemy")
            .setScale(0.25);
        this.phantom1.startFollow(enemyConfig);
        //enemy two path
        this.phantomPath2 = this.add.path(75, 360);
        this.phantomPath2.lineTo(425, 360);
        s = this.phantomPath2.getStartPoint();
        this.phantom2 = this.add
            .follower(this.phantomPath2, s.x, s.y, "enemy")
            .setScale(0.25);
        this.phantom2.startFollow(enemyConfig);
        //enables the physics body on the phantom sprites
        this.phantoms = this.add.group();
        this.phantoms.addMultiple([this.phantom1, this.phantom2]);
        this.physics.world.enable(this.phantoms);

        this.bigPhantom = this.physics.add.sprite(0, 0, "enemy").setScale(0.35);
        this.bigPhantom.setVisible(false);

        //create the item for the player to collect
        this.page = this.physics.add.sprite(75, 250, "page1").setScale(0.3);

        //set up the camera
        this.cameras.main.setBounds(0, 0, this.ROOMWIDTH, this.ROOMWIDTH);
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

        cursors.shift.on('down', () => {
            if(this.gary.sprint == false) {
               this.gary.body.setMaxVelocity(150, 150);
               this.gary.sprint = true;
               setTimeout(() => {
                  this.gary.sprint = false;
               }, 3000)
            }
         });
        //add in physics colliders
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
