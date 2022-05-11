let config = {
   parent: 'phaser-game',
   type: Phaser.AUTO,
   width: 700,
   height: 700,
   physics: {
      default: 'arcade',
      arcade: {
         debug: true
      }
   },
   scene:  [Play]
}

let game = new Phaser.Game(config);

let enemyDiff = 200;

let keys, cursors;