class Credits extends Phaser.Scene {
    constructor() {
        super("credits");
        this.TEXT_FONT = 'gem_font';

        this.TEXT_X = 50;			// text w/in dialog box x-position
        this.TEXT_Y = 125;			// text w/in dialog box y-position
        this.TEXT_SIZE = 24;		// text font size (in pixels)
        this.TEXT_MAX_WIDTH = 625;
    }

    preload() {
        this.load.image('credits', './assets/credits.png');
    }

    create() {
        this.add.image(0, 0, 'credits').setOrigin(0);

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('gameClearScene');
        })
    }
}