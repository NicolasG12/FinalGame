class Lab extends Phaser.Scene {
    constructor() {
        super("labScene");
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image("labSheet", "labSheet.png");
        this.load.tilemapTiledJSON("lab_map", "labLevel.json");


    }
    create() {
        //create variables
        this.ROOMWIDTH = 576;
        this.ROOMHEIGHT = 576;
        
        let tutorialScene = this.scene.get('tutorialScene');
        const map = tutorialScene.setup(this, 'lab_map', 'labSheet', this.ROOMWIDTH, this.ROOMHEIGHT);

        //set up the phantoms
        tutorialScene.createPhantoms(this, map);

        this.bigPhantom = this.phantoms.create(-128, this.ROOMHEIGHT/2, 'enemy', 0).setScale(2);

        //create the page
        this.page = map.createFromObjects("Objects", {
            name: "page",
            key: "page"
        });
        this.physics.world.enable(this.page, Phaser.Physics.Arcade.STATIC_BODY);
        //set up fog for mask
        // this.fog.setVisible(false);

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

        this.events.on("wake", () => {
            cursors = this.input.keyboard.createCursorKeys();
        });

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
    }

    update() {
        this.gary.update();
        if(page1 == 1) {
            this.physics.moveToObject(this.bigPhantom, this.gary, 20);
        }
        // this.phantoms.getChildren().forEach((phantom) => {
        //     phantom.update();
        // });
        this.fog.x = this.gary.x;
        this.fog.y = this.gary.y;
    }
}
