class Gary extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.energy = true;
   }

   update() {
      if(cursors.left.isDown) {
         this.body.setVelocityX(-100);
         this.anims.play('left', true);
      } else if (cursors.right.isDown) {
         this.body.setVelocityX(100);
         this.anims.play('right', true);
      } else {
         this.anims.play('idle', true);
         this.body.setVelocityX(0);
      }

      if(cursors.up.isDown) {
         this.body.setVelocityY(-100);
         this.anims.play('up', true);
      } else if (cursors.down.isDown) {
         this.body.setVelocityY(100);
      } else {
         this.body.setVelocityY(0);
      }
   }
}
