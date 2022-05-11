class Lab extends Phaser.Scene {
    constructor() {
        super("labScene");
    }
    create() {
        this.gary = new Gary(this, 20, 350, "gary", 0).setScale(0.5);
        let graphics = this.add.graphics();
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
    }
}