class Gary extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setBodySize(20, 24);
      this.setOffset(3, 3);
      this.energy = true;
      this.sprint = false;
      this.sprintCooldown = false;
      this.speed = 75;
      this.sprintSpeed = 130;
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
         this.anims.play('right', true);

      } else {
         this.setVelocity(0, 0);
         this.anims.play('idle', true);
      }
   }
}
