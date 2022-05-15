class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    preload() {
        (this.load.path = "assets/");
        this.load.image("enemy", "enemy.png");
        this.load.image("gary", "gary.png");
        this.load.image('studyBackground', 'studyBackground.png');
        this.load.image('fog', '02_fog.png');
        this.load.image('burstFog', 'burstFog.png');
        this.load.image('labBackground', 'labBackground.png');
        this.load.image('table1', '01_table.png');
        this.load.image('table2', '02_table.png');
        this.load.image('labTable1', 'labLargeTables.png');
        this.load.image('labTable2', 'labTables.png');
        this.load.image('labTable3', 'labMiddleTable.png');
        this.load.image('labTable4', 'labMiddleLargeTable.png');
        this.load.image('page1', 'tempGary.png');
    }

    create() {
        this.scene.start("hubScene");
    }
}