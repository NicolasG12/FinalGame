class Phantom extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.startX = x;
      this.startY = y;
      this.setVelocity(100, 0);
   }

   update() {
      if (this.x >= this.startX + enemyDiff && this.y <= this.startY) {
         this.setVelocity(0, 100);
      }
      if (
         this.y >= this.startY + enemyDiff &&
         this.x >= this.startX + enemyDiff
      ) {
         this.setVelocity(-100, 0);
      }
      if (this.x <= this.startX && this.y >= this.startY + enemyDiff) {
         this.setVelocity(0, -100);
      }
      if (this.x <= this.startX && this.y <= this.startY) {
         this.setVelocity(100, 0);
      }
      if(Phaser.Math.Distance.Between(this.x, this.y, this.startX, this.startY) > 500) {
         moveTo(this.startX, this.startY);
      }
   }
}
