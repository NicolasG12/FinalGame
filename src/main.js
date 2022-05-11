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
   scene:  [Play, Lab]
}

let game = new Phaser.Game(config);

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

let keys;