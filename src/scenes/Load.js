class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    preload() {
        (this.load.path = "assets/");
        this.load.image("enemy", "enemy.png");
        this.load.image("gary", "gary.png");
        this.load.image('fog', '02_fog.png');
        this.load.image('burstFog', 'burstFog.png');
        this.load.image('table1', '01_table.png');
        this.load.image('table2', '02_table.png');
        this.load.image('altar', 'temp_altar.png');

        this.load.audio('creaks', 'Creaks.wav');
        this.load.audio('collect', 'select.wav');
        this.load.audio('whispers', 'Ghost_Whisper.wav');
        this.load.audio('largeEnemyNoise', 'Larger_Enemy_Noise.wav');
        this.load.audio('mainMenu', 'MainMenu.wav');

        // this.load.spritesheet("lab_sheet", 'spooky_spritesheet.png', {
        //     frameWidth: 32,
        //     frameHeight: 32
        // });
        // this.load.tilemapTiledJSON("lab_level", 'labLevel.json');

    }

    create() {
        this.scene.start("hubScene");
    }
}