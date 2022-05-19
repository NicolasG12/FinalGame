let config = {
   parent: 'phaser-game',
   type: Phaser.AUTO,
   width: 700,
   height: 700,
   physics: {
      default: 'arcade',
      arcade: {
         debug: false
      }
   },
   scene:  [Load, Hub, Lab, GameOver, GameClear]
}

let game = new Phaser.Game(config);

//object to store the config of the path follower
let enemyConfig = {
   from: 0,
   to: 1,
   delay: 0,
   duration: 10000, 
   hold: 0,
   repeat: -1,
   yoyo: true,
   rotateToPath: false
}

// Variables
let page1 = 0;

let keys, cursors;


//array for table location
let labTables = [
   //top tables
   {
       "texture": "labTable1",
       "x": 400,
       "y": 15,
   },
   {
       "texture": "labTable2",
       "x": 255,
       "y": 15,
   },
   {
       "texture": "labTable2",
       "x": 125,
       "y": 15
   },
   //middle table area
   {
       "texture": "labTable3",
       "x": 350,
       "y": 225
   },
   {
       "texture": "labTable4",
       "x": 300,
       "y": 175
   },
   {
       "texture": "labTable3",
       "x": 250,
       "y": 225
   },
   {
       "texture": "labTable4",
       "x": 200,
       "y": 175
   },
   {
       "texture": "labTable3",
       "x": 150,
       "y": 225
   },
   {
       "texture": "labTable4",
       "x": 100,
       "y": 175
   },
   //bottom tables
   {
       "texture": "labTable1",
       "x": 400,
       "y": 405
   },
   {
       "texture": "labTable2",
       "x": 255,
       "y": 405
   },
   {
       "texture": "labTable2",
       "x": 125,
       "y": 405
   },
];

let hubTables = [
   {
       "texture": "table1",
       "x": 50,
       "y": 50
   },
   {
       "texture": "table2",
       "x": 100,
       "y": 50
   },
   {
       "texture": "table1",
       "x": 250,
       "y": 50
   },
   {
       "texture": "table2",
       "x": 300,
       "y": 50
   },
   {
       "texture": "table1",
       "x": 50,
       "y": 250
   },
   {
       "texture": "table1",
       "x": 100,
       "y": 250
   },
   {
       "texture": "table1",
       "x": 250,
       "y": 250
   },
   {
       "texture": "table1",
       "x": 300,
       "y": 250
   },
   
];

let roomSizes = [
   {
       "room": "tutorial",
       "width": 400,
       "height": 200
   },
   {
       "room": "hub",
       "width": 320,
       "height": 320
   },
   {
       "room": "lab",
       "width": 576,
       "height": 576
   }
];


