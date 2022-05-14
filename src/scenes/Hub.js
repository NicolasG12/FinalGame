class Hub extends Phaser.Scene {
   constructor() {
      super("hubScene");
   }

   create() { 
      //add the background
      // this.background = this.add.image(0, 0, 'studyBackground').setOrigin(0);
      //assign keys for movement
      keys = this.input.keyboard.addKeys("W,S,A,D");
      cursors = this.input.keyboard.createCursorKeys();

      //get the room object
      this.room = roomSizes.find(room => room.room == "hub");
      //create the player avatar
      this.gary = new Gary(this, this.room.width - 20, this.room.height - 20, "gary", 0).setScale(0.5);


      //place tables
      this.tables = this.physics.add.group();
      hubTables.forEach((table) => {
          this.tables.create(table.x, table.y, table.texture).setOrigin(0).setScale(.2).setImmovable(true);
      });
      //set up the camera  
      this.cameras.main.setBounds(0, 0, this.room.width, this.room.height);
      this.cameras.main.setZoom(2);
      this.cameras.main.startFollow(this.gary);

      //set the world collision
      this.gary.body.setCollideWorldBounds(true);
      this.gary.body.onWorldBounds = true;
      this.physics.world.setBounds(0, 0, this.room.width, this.room.height);

      this.physics.world.on('worldbounds', (body, blockedUp, blockedDown, blockedLeft, blockedRight) => {
         if(blockedLeft) {
            this.scene.switch("labScene");
            this.gary.x += 20;
         }
      });

      this.events.on('wake', () => {
         cursors = this.input.keyboard.createCursorKeys();
         keys = this.input.keyboard.addKeys("W,S,A,D");
      });

      this.physics.add.collider(this.gary, this.tables);

   }
   
   update() {
      this.gary.update();
   }
}
