class Credits extends Phaser.Scene {
    constructor() {
        super("credits");
        this.TEXT_FONT = 'gem_font';

        this.TEXT_X = 50;			// text w/in dialog box x-position
        this.TEXT_Y = 125;			// text w/in dialog box y-position
        this.TEXT_SIZE = 24;		// text font size (in pixels)
        this.TEXT_MAX_WIDTH = 625;
    }

    create() {
        this.title = this.add.bitmapText(this.TEXT_X + 175, 50, this.TEXT_FONT, 'Demons 101', 50);
        this.creators = this.add.bitmapText(this.TEXT_X + 225, this.TEXT_Y, this.TEXT_FONT, 'Created by: ', this.TEXT_SIZE);
    }
}