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
      this.gary = new Gary(this, 350, 350, "gary", 0).setScale(0.5);
      //create a group for the phantoms and create the phantoms
      // this.phantoms = this.add.group();
      // this.phantom1 = new Phantom(this, 250, 100, "enemy", 0);
      //object to store the config of the follower
      //create a path for the enemy to follow

      
      //set up the camera  
      this.cameras.main.setBounds(0, 0, 700, 700);
      this.cameras.main.setZoom(1);
      this.cameras.main.startFollow(this.gary);
      
      //on space bar remove the mask to emulate flash of light
      keys.SPACE.on('down', () => {
         this.cameras.main.clearMask();
         setTimeout(() => {
            this.cameras.main.setMask(this.mask);
         }, 1000);
      })

   }

   update() {
      if(this.gary.x > 700) {
         this.scene.switch("labScene");
      }
      this.gary.update();
   }
}
