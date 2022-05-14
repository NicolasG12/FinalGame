class Lab extends Phaser.Scene {
    constructor() {
        super("labScene");
    }
    create() {
        //create the background
        this.background = this.add.image(0, 0, 'labBackground').setOrigin(0);

        //create the cursor keys
        cursors = this.input.keyboard.createCursorKeys();
        keys = this.input.keyboard.addKeys("W,S,A,D");
                
        //get the room object
        this.room = roomSizes.find(room => room.room == "lab");
        //add in the player on left hand side of screen
        this.gary = new Gary(this, this.room.width - 20, this.room.height/2, "gary", 0).setScale(0.5);
        //set up fog for mask
        this.fog = this.add.sprite(this.gary.x, this.gary.y, 'fog').setDepth(1);
        this.fog.setVisible(false);


        //place the tables around the scene and create a group for them
        this.tables = this.physics.add.group();
        tableLocation.forEach((table) => {
            this.tables.create(table.x, table.y, table.texture).setOrigin(0).setImmovable(true);
        });


        //set the world collision
        this.physics.world.setBounds(0, 0, this.room.width, this.room.height);
        this.gary.body.setCollideWorldBounds(true);
        this.gary.body.onWorldBounds = true;

        this.physics.world.on('worldbounds', (body, blockedUp, blockedDown, blockedLeft, blockedRight) => {
            if(blockedRight) {
               this.scene.switch("hubScene");
               this.gary.x -= 20;
            }
         });

        //create paths for the enemy
        //enemy one path
        this.phantomPath1 = this.add.path(75, 145);
        this.phantomPath1.lineTo(425, 145);
        let s = this.phantomPath1.getStartPoint();
        this.phantom1 = this.add.follower(this.phantomPath1, s.x, s.y, 'enemy').setScale(.25);
        this.phantom1.startFollow(enemyConfig);
        //enemy two path
        this.phantomPath2 = this.add.path(75, 360);
        this.phantomPath2.lineTo(425, 360);
        s = this.phantomPath2.getStartPoint();
        this.phantom2 = this.add.follower(this.phantomPath2, s.x, s.y, 'enemy').setScale(.25);
        this.phantom2.startFollow(enemyConfig);

        //create the item for the player to collect
        this.page = this.physics.add.sprite(75, 250, 'page1').setScale(.1);
        // this.hudPage = this.add.sprite(450, 150, 'page1').setScale(.1);

        //set up the camera  
        this.cameras.main.setBounds(0, 0, this.room.width, this.room.height);
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.gary);

        this.events.on('wake', () => {
            cursors = this.input.keyboard.createCursorKeys();
            keys = this.input.keyboard.addKeys("W,S,A,D");         
        });

        //add in physics colliders
        this.physics.add.collider(this.gary, this.tables);
        this.physics.add.overlap(this.gary, this.page, () =>{
            this.page.destroy();
        });
    }

    update() {
        this.gary.update();
        this.fog.x = this.gary.x;
        this.fog.y = this.gary.y;
    }
}