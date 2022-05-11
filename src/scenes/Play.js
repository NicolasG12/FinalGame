class Play extends Phaser.Scene {
   constructor() {
      super("playScene");
   }

   preload() {
      (this.load.path = "assets/");
      this.load.image("enemy", "tempEnemy.png");
      this.load.image("gary", "tempGary.png");
      this.load.image('background', 'tempBackground.png');
   }
   create() { 
      //add the background
      this.background = this.add.image(0, 0, 'background').setOrigin(0);
      //assign keys for movement
      keys = this.input.keyboard.addKeys("W,S,A,D,SPACE");
      //create the player avatar
      this.gary = new Gary(this, 500, 400, "gary", 0).setScale(0.5);
      //create a group for the phantoms and create the phantoms
      this.phantoms = this.add.group();
      this.phantom1 = new Phantom(this, 250, 100, "enemy", 0, this.gary);
      this.phantom2 = new Phantom(this, 750, 100,  'enemy', 0, this.gary);
      this.phantom3 = new Phantom(this, 250, 700, 'enemy', 0, this.gary);
      this.phantom4 = new Phantom(this, 750, 700, 'enemy', 0, this.gary);
      this.phantoms.addMultiple([this.phantom1, this.phantom2, this.phantom3, this.phantom4]);

      //create a shape for the mask    
      this.shape = this.make.graphics();
      this.shape.fillStyle(0xffffff);
      this.shape.beginPath();
      this.shape.fillCircle(this.gary.x, this.gary.y, 200);
      this.mask = this.shape.createGeometryMask();

      //set up the camera  
      this.cameras.main.setBounds(0, 0, 1000, 800);
      this.cameras.main.setZoom(2);
      this.cameras.main.startFollow(this.gary);
      this.cameras.main.setMask(this.mask);

      //on space bar remove the mask to emulate flash of light
      keys.SPACE.on('down', () => {
         this.cameras.main.clearMask();
         setTimeout(() => {
            this.cameras.main.setMask(this.mask);
         }, 1000);
      })

   }

   update() {

      this.phantom1.update();
      this.phantom2.update();
      this.phantom3.update();
      this.phantom4.update();
      this.gary.update();

   }
}
