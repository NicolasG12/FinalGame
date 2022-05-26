class Gary extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setBodySize(24, 24);
      this.energy = true;
      this.state = garyStates.find(obj => obj.name === 'walk');
   }

   update() {
      if(cursors.left.isDown) {
         this.setVelocity(-this.state.speed, 0);
         this.anims.play('left', true);

      } else if (cursors.right.isDown) {
         this.setVelocity(this.state.speed, 0);
         this.anims.play('right', true);

      } else if (cursors.up.isDown) {
         this.setVelocity(0, -this.state.speed)
         this.anims.play('up', true);

      } else if (cursors.down.isDown) {
         this.setVelocity(0, this.state.speed);
         this.anims.play('right', true);

      } else {
         this.setVelocity(0, 0);
         this.anims.play('idle', true);
      }
   }
}
