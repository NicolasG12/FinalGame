class Cutscene extends Phaser.Scene {
    constructor() {
        super("cutscene");
    }

    preload() {
        this.load.json('cutsceneDialog', 'cutsceneDialog.json');
    }
}