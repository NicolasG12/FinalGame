class Gary extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      scene.physics.add.existing(this);
   }

   update() {
      if (keys.W.isDown || cursors.up.isDown) {
         this.setVelocityY(-100);
      } else if (keys.S.isDown || cursors.down.isDown) {
         this.setVelocityY(100);
      } else {
         this.setVelocityY(0);
      }

      if (keys.A.isDown || cursors.left.isDown) {
         this.setVelocityX(-100);
      } else if (keys.D.isDown || cursors.right.isDown) {
         this.setVelocityX(100);
      } else {
         this.setVelocityX(0);
      }
   }
}
