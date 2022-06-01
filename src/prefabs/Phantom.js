class Phantom extends Phaser.GameObjects.PathFollower {
   constructor(scene, path, x, y, texture, frame) {
      super(scene, path, x, y, texture, frame);
      scene.add.existing(this);
      this.setOrigin(0, 1);
   }

   update() {
      if(this.pathDelta.x < 0) {
         this.anims.play('phantom_ani_left');
      } else {
         this.anims.play('phantom_ani_right');
      }
   }
}
