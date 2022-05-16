class GameOver extends Phaser.Scene {
   constructor() {
      super("gameOverScene");
   }
   create() {
      page1 = 0;
      this.scene.stop("hubScene");
      this.scene.stop("labScene");
      this.add.text(20, 20, "Game Over");
      this.input.keyboard.on('keydown-SPACE', () => {
         this.scene.start("hubScene");
      });
   }
}