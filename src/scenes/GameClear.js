class GameClear extends Phaser.Scene {
    constructor() {
       super("gameClearScene");
    }
    create() {
       page1 = 0;
       this.scene.stop("hubScene");
       this.scene.stop("labScene");
       this.add.text(20, 20, "Level 1 Clear");
       this.input.keyboard.on('keydown-SPACE', () => {
          this.scene.start("hubScene");
       });
    }
 }