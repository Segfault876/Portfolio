paused = {
  key: 'paused',

  preload: function(){
    this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.load.audio('pause', 'assets/pause.wav');
  },

  create: function(){
    const Title = this.add.text(350, 460, 'PAUSED', {
      fontFamily:  '"Press Start 2P"',
      fontSize: '18px',
    });
    this.pause = this.sound.add('pause', {volume: 0.5});
  },
  update: function(){
    if (this.SPACE.isDown) {
      this.pause.play();
      this.scene.stop('paused').resume('runtime');
    }
  }
}