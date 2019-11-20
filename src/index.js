import Phaser from "phaser";
import logoImg from "./assets/logo.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

// function preload() {
//   this.load.image("logo", logoImg);
// }

// function create() {
//   const logo = this.add.image(400, 150, "logo");

//   this.tweens.add({
//     targets: logo,
//     y: 450,
//     duration: 2000,
//     ease: "Power2",
//     yoyo: true,
//     loop: -1
//   });
// }

function preload() {
  this.load.image('sky', 'src/assets/sky.png');
  this.load.image('ground', 'src/assets/platform.png');
  this.load.image('star', 'src/assets/star.png');
  this.load.image('bomb', 'src/assets/bomb.png');
  this.load.spritesheet('dude', 'src/assets/dude.png', { frameWidth: 32, frameHeight: 48 }); //spritesheet contains animation frames
}

//variables
let player;
let platforms;
let cursors;

function create() {
  //Note: order matters

  //background
  this.add.image(400, 300, 'sky');

  //foreground platforms
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');


  //dynamic player
  player = this.physics.add.sprite(100, 450, 'dude');

  player.setBounce(0.2); //player will slightly bounce after landing
  player.setCollideWorldBounds(true);
  player.body.setGravityY(200)

  //animations
  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), //frames 0, 1, 2, 3
      frameRate: 10, //10fps
      repeat: -1 //loop
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });

  //keyboard function (up, down, left, right)
  cursors = this.input.keyboard.createCursorKeys();

  //Collisions
  this.physics.add.collider(player, platforms);
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  }
  else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }
  // if (cursors.up.isDown && player.body.touching.down) {
  //   //player can only jump off the ground
  //   player.setVelocityY(-430);
  // }
  if (cursors.up.isDown) {
    //player can jump mid air
    player.setVelocityY(-200);
  }
}
