class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    preload() {
        (this.load.path = "assets/");
        this.load.image("enemy", "tempEnemy.png");
        this.load.image("gary", "tempGary.png");
        this.load.image('studyBackground', 'studyBackground.png');
        this.load.image('item', 'tempItem.png');
        this.load.image('fog', 'fog.png');
        this.load.image('labBackground', 'labBackground.png');
        this.load.image('table1', '01_table.png');
        this.load.image('table2', '02_table.png');
    }

    create() {
        this.scene.start("studyScene");
    }
}