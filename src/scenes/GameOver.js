class GameOver extends Phaser.Scene {
   constructor() {
      super("gameOverScene");
   }
   create() {
      this.scene.stop("hubScene");
      this.scene.stop("labScene");
      this.add.text(20, 20, "Game Over");
      this.input.keyboard.on('keydown-SPACE', () => {
         this.scene.start("hubScene");
      });
   }
}