class Gary extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      scene.physics.add.existing(this);
   }

   update() {
      if (keys.W.isDown && this.y > 0) {
         this.setVelocityY(-100);
      } else if (keys.S.isDown & this.y < 700) {
         this.setVelocityY(100);
      } else {
         this.setVelocityY(0);
      }

      if (keys.A.isDown && this.x > 0) {
         this.setVelocityX(-100);
      } else if (keys.D.isDown && this.x < 700) {
         this.setVelocityX(100);
      } else {
         this.setVelocityX(0);
      }
   }
}
