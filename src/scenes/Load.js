class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    preload() {
        (this.load.path = "assets/");
        this.load.image("enemy", "enemy.png");
        this.load.image('fog', '02_fog.png');
        this.load.image('burstFog', 'burstFog.png');
        this.load.image('altar', 'temp_altar.png');

        this.load.audio('creaks', 'Creaks.wav');
        this.load.audio('collect', 'select.wav');
        this.load.audio('whispers', 'Ghost_Whisper.wav');
        this.load.audio('largeEnemyNoise', 'Larger_Enemy_Noise.wav');
        this.load.audio('mainMenu', 'MainMenu.wav');

        this.load.atlas('gary_atlas', 'garysheet.png', 'garymap.json');
    }

    create() {
        this.scene.start("labScene");
    }
}