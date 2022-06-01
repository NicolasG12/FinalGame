let config = {
   parent: 'phaser-game',
   type: Phaser.CANVAS,
   render: {
      pixelArt: true
   },
   width: 704,
   height: 704,
   physics: {
      default: 'arcade',
      arcade: {
         debug: true
      }
   },
   scene: [Menu, HUD, Tutorial, Hub, Lab, ComputerLab, Library, GameClear]
}

let game = new Phaser.Game(config);

//object to store the config of the path follower
let enemyConfig = {

   from: 0,
   to: 1,
   delay: 0,
   duration: 0, 
   hold: 0,
   repeat: -1,
   yoyo: true,
   rotateToPath: false,
}

// Variables
let page0 = 0;
let page1 = 0;
let page2 = 0;
let page3 = 0;

let cursors;

let garyX, garyY;
let phantomSpeed;

let deaths = 0;