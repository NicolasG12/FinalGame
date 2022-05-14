class Lab extends Phaser.Scene {
    constructor() {
        super("labScene");
    }
    create() {
        //create the background
        this.background = this.add.image(0, 0, 'labBackground').setOrigin(0);
        //add in the player on left hand side of screen
        this.gary = new Gary(this, 20, 350, "gary", 0).setScale(0.5);
        //set up fog for mask
        this.fog = this.add.sprite(this.gary.x, this.gary.y, 'fog').setDepth(1);
        
        //create the cursor keys
        cursors = this.input.keyboard.createCursorKeys();
        keys = this.input.keyboard.addKeys("W,S,A,D"); 

        //place the tables around the scene and create a group for them
        this.tables = this.physics.add.group();
        tableLocation.forEach((table) => {
            this.tables.create(table.x, table.y, table.texture).setScale(0.3).setImmovable(true);
        });

        //add a collider between player and tables
        this.physics.add.collider(this.gary, this.tables);

        //set world collision
        this.gary.body.setCollideWorldBounds(true);
        this.gary.body.onWorldBounds = true;

        this.physics.world.on('worldbounds', (body, blockedUp, blockedDown, blockedLeft, blockedRight) => {
            if(blockedLeft) {
               this.scene.switch("studyScene");
               this.gary.x += 20;
            }
         });

        let graphics = this.add.graphics();
        graphics.lineStyle(2, 0xFFFFFF, 1);
        //create a path for the enemy to follow
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

        //set up the camera  
        this.cameras.main.setBounds(0, 0, 700, 700);
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.gary);

        this.events.on('wake', () => {
            cursors = this.input.keyboard.createCursorKeys();
            keys = this.input.keyboard.addKeys("W,S,A,D");         
        })
    }

    update() {
        this.gary.update();
        this.fog.x = this.gary.x;
        this.fog.y = this.gary.y;
    }
}