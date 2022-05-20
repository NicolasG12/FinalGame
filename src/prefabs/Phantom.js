class Phantom extends Phaser.GameObjects.PathFollower {
   constructor(scene, path, x, y, texture, frame) {
      super(scene, path, x, y, texture, frame);
      scene.add.existing(this);
   }

   update() {
      console.log(this.path);
   }
}
