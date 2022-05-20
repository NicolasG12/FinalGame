class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    preload() {
        (this.load.path = "assets/");
        this.load.image("enemy", "enemy.png");
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
        this.load.image('altar', 'temp_altar.png');

        this.load.audio('creaks', 'Creaks.wav');
        this.load.audio('collect', 'select.wav');
        this.load.audio('whispers', 'Ghost_Whisper.wav');
        this.load.audio('largeEnemyNoise', 'Larger_Enemy_Noise.wav');
        this.load.audio('mainMenu', 'MainMenu.wav');

        this.load.atlas('gary_atlas', 'garysheet.png', 'garymap.json');
    }

    create() {
        this.scene.start("hubScene");
    }
}