class Library extends Phaser.Scene {
   constructor() {
      super("libraryScene");
   }

   preload() {
      this.load.path = "./assets/";
      this.load.image("librarySheet", "librarySheet.png");
      this.load.tilemapTiledJSON("library_map", "libraryLevel.json ");
  }

  create() {
      this.ROOMWIDTH = 576;
      this.ROOMHEIGHT = 768;
      garyX = 48;
      garyY = this.ROOMHEIGHT-48;

      enemyConfig.duration = 6000;

      let tutorialScene = this.scene.get('tutorialScene');
      //create the tilemap
      const map = this.add.tilemap('library_map');

      //add the tileset to the map
      const tileset = map.addTilesetImage('librarySheet');
      tutorialScene.setup(this, map, tileset, this.ROOMWIDTH, this.ROOMHEIGHT, garyX, garyY);

      this.cameras.main.setZoom(.75);
      this.fog.setVisible(false);
  }

  update() {
      this.gary.update();
      this.fog.x = this.gary.x;
      this.fog.y = this.gary.y;
  }
}