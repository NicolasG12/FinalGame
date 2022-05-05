class Play extends Phaser.Scene {
   constructor() {
      super("playScene");
   }

   preload() {
      (this.load.path = "assets/"), this.load.image("enemy", "tempEnemy.png");
      this.load.image("gary", "tempGary.png");
   }
   create() {
      keys = this.input.keyboard.addKeys("W,S,A,D");
      this.phantom1 = new Phantom(this, 500, 300, "enemy", 0);
      this.gary = new Gary(this, 200, 300, "gary", 0).setScale(0.5);
   }

   update() {
      this.phantom1.update();
      this.gary.update();
      this.distance = Phaser.Math.Distance.Between(this.phantom1.x, this.phantom1.y, this.gary.x, this.gary.y);
      if(this.distance < 200) {
         this.physics.moveToObject(this.phantom1, this.gary);
      }
   }
}
