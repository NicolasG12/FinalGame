class Gary extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setBodySize(24, 24);
      this.energy = true;
      this.setMaxVelocity(100, 100);
      this.sprint = false;
      this.speed = 100;
      this.sprintSpeed = 150;
   }

   update() {
      if(cursors.left.isDown) {
         if(this.sprint) {
            this.body.setVelocity(-this.sprintSpeed, 0);
         } else {
            this.body.setVelocity(-this.speed, 0);
         }
         this.anims.play('left', true);

      } else if (cursors.right.isDown) {
         if(this.sprint) {
            this.body.setVelocity(this.sprintSpeed, 0);
         } else {
            this.body.setVelocity(this.speed, 0);
         }
         this.anims.play('right', true);

      } else if (cursors.up.isDown) {
         if(this.sprint) {
            this.body.setVelocity(0, -this.sprintSpeed)
         } else {
            this.body.setVelocity(0, -this.speed);
         }
         this.anims.play('up', true);

      } else if (cursors.down.isDown) {
         if(this.sprint) {
            this.body.setVelocity(0, this.sprintSpeed)
         } else {
            this.body.setVelocity(0, this.speed);
         }

      } else {
         this.setVelocity(0, 0);
         this.anims.play('idle', true);
      }
   }
}
