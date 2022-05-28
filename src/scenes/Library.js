class Library extends Phaser.Scene {
    constructor() {
        super("libraryScene");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("librarySheet", "librarySheet.png");
        this.load.tilemapTiledJSON("library_map", "libraryLevel.json ");
    }

    create() {
        this.ROOMWIDTH = 576;
        this.ROOMHEIGHT = 800;
        garyX = 48;
        garyY = this.ROOMHEIGHT - 48;

        enemyConfig.duration = 10000;

        let tutorialScene = this.scene.get('tutorialScene');
        //create the tilemap
        const map = this.add.tilemap('library_map');

        //add the tileset to the map
        const tileset = map.addTilesetImage('librarySheet');
        tutorialScene.setup(this, map, tileset, this.ROOMWIDTH, this.ROOMHEIGHT, garyX, garyY);

        this.page = map.createFromObjects("Objects", {
            name: "page",
            key: "page"
        });

        this.physics.world.enable(this.page, Phaser.Physics.Arcade.STATIC_BODY);
        //handles changing scenes when on the far right of screen
        this.physics.world.on(
            "worldbounds",
            (body, blockedUp, blockedDown, blockedLeft, blockedRight) => {
                if (blockedLeft) {
                    clearInterval(this.creaksInter);
                    this.whispers.stop();
                    this.largeEnemySound.stop();
                    this.scene.switch("hubScene");
                    this.gary.x += 20;
                }
            }
        );
        this.events.on("wake", () => {
            cursors = this.input.keyboard.createCursorKeys();
        });
        this.physics.add.overlap(this.gary, this.page, (obj1, obj2) => {
            obj2.destroy();
            this.sound.play('collect');
            this.largeEnemySound.play();
            this.largeEnemySound.setLoop(true);
            page3 = 1;
        });
        //checking for phantom collision
        this.physics.add.overlap(this.gary, this.phantoms, () => {
            clearInterval(this.creaksInter);
            // this.whispers.stop();
            this.largeEnemySound.stop();
            page3 = 0;
            this.scene.switch("hubScene");
            this.gary.x = garyX;
            this.gary.y = garyY;
        });
    }

    update() {
        this.gary.update();
        this.fog.x = this.gary.x;
        this.fog.y = this.gary.y;
    }
}