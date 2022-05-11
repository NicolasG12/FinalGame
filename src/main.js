let config = {
   parent: 'phaser-game',
   type: Phaser.AUTO,
   width: 1000,
   height: 800,
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

let keys;