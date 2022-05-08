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
      this.phantom1 = new Phantom(this, 100, 100, "enemy", 0);
      this.phantom2 = new Phantom(this, 700, 100,  'enemy', 0);
      this.phantom3 = new Phantom(this, 100, 500, 'enemy', 0);
      this.phantom4 = new Phantom(this, 700, 500, 'enemy', 0);
      this.gary = new Gary(this, 200, 300, "gary", 0).setScale(0.5);
   }

   update() {
      this.phantom1.update();
      this.phantom2.update();
      this.phantom3.update();
      this.phantom4.update();
      this.gary.update();
      this.distance = Phaser.Math.Distance.Between(this.phantom1.x, this.phantom1.y, this.gary.x, this.gary.y);
      if(this.distance < 200) {
         console.log(this.distance);
         this.physics.moveToObject(this.phantom1, this.gary);
      }
   }
}
