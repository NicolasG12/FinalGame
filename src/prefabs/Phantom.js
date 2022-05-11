class Phantom extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y, texture, frame, player) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.scene = scene;
      this.startX = x;
      this.startY = y;
      // this.setVelocity(100, 0);
      this.player = player;
   }

   update() {
      // if (this.x >= this.startX + enemyDiff && this.y <= this.startY) {
      //    this.setVelocity(0, 100);
      // }
      // if (
      //    this.y >= this.startY + enemyDiff &&
      //    this.x >= this.startX + enemyDiff
      // ) {
      //    this.setVelocity(-100, 0);
      // }
      // if (this.x <= this.startX && this.y >= this.startY + enemyDiff) {
      //    this.setVelocity(0, -100);
      // }
      // if (this.x <= this.startX && this.y <= this.startY) {
      //    this.setVelocity(100, 0);
      // }
      if((Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y) < 200) && (Phaser.Math.Distance.Between(this.x, this.y, this.startX, this.startY) < 300)) {
         this.scene.physics.moveToObject(this, this.player);
      } else {
         this.x = this.startX;
         this.y = this.startY;
      }
   }
}
