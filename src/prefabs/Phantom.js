class Phantom extends Phaser.GameObjects.PathFollower {
   constructor(scene, path, x, y, texture, frame, pathPoints) {
      super(scene, path, x, y, texture, frame);
      scene.add.existing(this);
      this.path = path;
      this.pathPoints = pathPoints;
   }

   update() {
      console.log(this.path);
   }
}
