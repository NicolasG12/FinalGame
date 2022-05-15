class GameOver extends Phaser.Scene {
   constructor() {
      super("gameOverScene");
   }
   create() {
      this.add.text(20, 20, "Game Over");
   }
}