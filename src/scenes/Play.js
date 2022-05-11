class Play extends Phaser.Scene {
   constructor() {
      super("playScene");
   }

   preload() {
      (this.load.path = "assets/");
      this.load.image("enemy", "tempEnemy.png");
      this.load.image("gary", "tempGary.png");
      this.load.image('background', 'tempBackground.png');
      this.load.image('item', 'tempItem.png');
      this.load.image('fog', 'fog.png');
   }
   create() { 
      //add the background
      this.background = this.add.image(0, 0, 'background').setOrigin(0);
      //assign keys for movement
      keys = this.input.keyboard.addKeys("W,S,A,D,SPACE");
      cursors = this.input.keyboard.createCursorKeys();
      //create the player avatar
      this.gary = new Gary(this, 350, 350, "gary", 0).setScale(0.5);
      //create a group for the pages and create the pages
      this.pages = this.add.group();
      this.page1 = this.physics.add.sprite(500, 500, 'item');
      this.pages.add(this.page1);

      //collision detection and collection
      this.physics.add.overlap(this.gary, this.pages, this.collectPage);

      let graphics = this.add.graphics();
      //object to store the config of the follower
      let enemyConfig = {
         from: 0,
         to: 1,
         delay: 0,
         duration: 10000, 
         hold: 0,
         repeat: -1,
         yoyo: true,
         rotateToPath: true
      }
      //create a path for the enemy to follow
      graphics.lineStyle(2, 0xFFFFFF, 1);
      this.phantomPath1 = this.add.path(100, 100);
      this.phantomPath1.lineTo(100, 300);
      this.phantomPath1.lineTo(400, 400);
      this.phantomPath1.lineTo(500, 300);
      this.phantomPath1.lineTo(200, 300);
      this.phantomPath1.lineTo(300, 100);
      this.phantomPath1.draw(graphics);
      let s = this.phantomPath1.getStartPoint();
      this.phantom1 = this.add.follower(this.phantomPath1, s.x, s.y, 'enemy');
      this.phantom1.startFollow(enemyConfig);
      
      //set up mask for camera
      this.fog = this.add.sprite(this.gary.x, this.gary.y, 'fog');
      //set up the camera  
      this.cameras.main.setBounds(0, 0, 700, 700);
      this.cameras.main.setZoom(2);
      this.cameras.main.startFollow(this.gary);
      
      //on space bar remove the mask to emulate flash of light
      keys.SPACE.on('down', () => {
         this.cameras.main.clearMask();
         setTimeout(() => {
            this.cameras.main.setMask(this.mask);
         }, 1000);
      })

   }

   collectPage(player, page) {
      page.destroy();
   }

   update() {
      this.fog.x = this.gary.x;
      this.fog.y = this.gary.y;
      this.gary.update();
   }
}
