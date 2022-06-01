class GameClear extends Phaser.Scene {
    constructor() {
        super("gameClearScene");
    }

    preload() {
        this.load.path = "./assets/"
        this.load.spritesheet('endScreen', 'end_screen_animation.png', {
            frameWidth: 700,
            frameHeight: 700,
            startFrame: 0,
            endFrame: 6
        });
    }
    create() {
        page1 = 0;
        this.scene.stop("hubScene");
        this.scene.stop("labScene");
        this.scene.stop("computerLabScene");
        this.scene.stop("libraryScene");
        this.anims.create({
            key: 'end',
            frames: this.anims.generateFrameNumbers('endScreen', {
                start: 0, 
                end: 6,
                first: 0
            }),
            frameRate: 3,
            repeat: -1
        })
        this.backgroundSprite = this.add.sprite(0, 0, 'endscreen', 0).setOrigin(0);
        this.backgroundSprite.anims.play('end');
        this.background = this.sound.add('mainMenu', { volume: 0.5 });
        this.background.setLoop(true);
        this.background.play();

        this.input.keyboard.on('keydown-SPACE', () => {
            this.background.stop();
            this.scene.stop("gameClearScene");
            this.scene.start("menuScene");
        });
    }
}