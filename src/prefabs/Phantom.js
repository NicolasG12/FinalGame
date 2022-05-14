class Phantom extends Phaser.GameObjects.PathFollower {
   constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
   }

   update() {
      
   }
}
