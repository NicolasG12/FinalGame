class Lab extends Phaser.Scene {
    constructor() {
        super("labScene");
    }
    create() {
        //create the background
        this.background = this.add.image(0, 0, 'labBackground').setOrigin(0);
        this.gary = new Gary(this, 20, 350, "gary", 0).setScale(0.5);
        cursors = this.input.keyboard.createCursorKeys();
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
         })
    }

    update() {
        this.gary.update();
        if(this.gary.x < 0) {
            this.gary.x += 20;
            this.scene.switch("studyScene");
        }
    }
}