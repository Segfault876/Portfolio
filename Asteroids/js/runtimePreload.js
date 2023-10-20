function runtimePreload (){
  this.LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  this.RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  this.UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  this.Z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
  this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  // Load the waves for runtime
  this.load.audio('accelerate', 'assets/accelerate.wav')
  this.load.audio('laser', 'assets/laser.wav');
  this.load.audio('laser1', 'assets/laser1.wav');
  this.load.audio('pause', 'assets/pause.wav')
  this.load.audio('explosionSound', 'assets/explosion.wav')  

  // Load the images for runtime
  this.load.image('ship', 'assets/ship.png');
  this.load.image('bullet', 'assets/bullet.png');
  this.load.image('engineParticle', 'assets/particle.png');
  this.load.image('explosionParticle', 'assets/explosionParticle.png');
  this.load.image('ufo', 'assets/ufo.png');
}