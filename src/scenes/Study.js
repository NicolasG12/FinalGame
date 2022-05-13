class Study extends Phaser.Scene {
   constructor() {
      super("studyScene");
   }

   create() { 
      //add the background
      this.background = this.add.image(0, 0, 'studyBackground').setOrigin(0);
      //assign keys for movement
      keys = this.input.keyboard.addKeys("W,S,A,D");
      cursors = this.input.keyboard.createCursorKeys();
      //create the player avatar
      this.gary = new Gary(this, 350, 350, "gary", 0).setScale(0.5);
      //create a group for the pages and create the pages
      this.pages = this.add.group();
      this.page1 = this.physics.add.sprite(500, 500, 'item');
      this.pages.add(this.page1);

      //collision detection and collection
      this.physics.add.overlap(this.gary, this.pages, this.collectPage);
      
      //set up mask for camera
      this.fog = this.add.sprite(this.gary.x, this.gary.y, 'fog');
      //set up the camera  
      this.cameras.main.setBounds(0, 0, 700, 700);
      this.cameras.main.setZoom(2);
      this.cameras.main.startFollow(this.gary);
      
      //on space bar remove the mask to emulate flash of light
      cursors.space.on('down', () => {
         this.cameras.main.clearMask();
         setTimeout(() => {
            this.cameras.main.setMask(this.mask);
         }, 1000);
      })

      this.events.on('wake', () => {
         cursors = this.input.keyboard.createCursorKeys();
         keys = this.input.keyboard.addKeys("W,S,A,D");
      })

   }

   collectPage(player, page) {
      page.destroy();
   }

   update() {
      this.fog.x = this.gary.x;
      this.fog.y = this.gary.y;
      if(this.gary.x > 700) {
         this.scene.switch("labScene");
         this.gary.x -= 50;
      }
      this.gary.update();
   }
}
