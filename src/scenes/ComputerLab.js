class ComputerLab extends Phaser.Scene {
    constructor() {
        super("computerLabScene");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("computerSheet", "computerLabSheet.png");
        this.load.tilemapTiledJSON("computer_map", "computerLabLevel.json");
    }

    create() {
        this.ROOMWIDTH = 640;
        this.ROOMHEIGHT = 640;
        garyX = this.ROOMWIDTH/2;
        garyY = this.ROOMHEIGHT-48;

        enemyConfig.duration = 6000;

        let tutorialScene = this.scene.get('tutorialScene');
        //create the tilemap
        const map = this.add.tilemap('computer_map');

        //add the tileset to the map
        const tileset = map.addTilesetImage('computerLabSheet', "computerSheet");
        tutorialScene.setup(this, map, tileset, this.ROOMWIDTH, this.ROOMHEIGHT, garyX, garyY);

    }

    update() {
        this.gary.update();
        this.fog.x = this.gary.x;
        this.fog.y = this.gary.y;
    }
}
