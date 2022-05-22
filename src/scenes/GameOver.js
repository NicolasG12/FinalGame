class GameOver extends Phaser.Scene {
   constructor() {
      super("gameOverScene");
   }
   create() {
      page1 = 0;
      this.scene.stop("hubScene");
      this.scene.stop("labScene");
      this.scene.stop("tutorialScene");
      this.add.text(20, 20, "Game Over\nPress 'Space' to restart");

      this.background = this.sound.add('mainMenu', { volume: 0.5 });
      this.background.setLoop(true);
      this.background.play();

      this.input.keyboard.on('keydown-SPACE', () => {
         this.background.stop();
         this.scene.stop("gameOverScene");
         this.scene.start("menuScene");
      });
   }
}