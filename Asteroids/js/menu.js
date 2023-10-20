menu = {
  key: 'menu',

  preload: function(){
    this.load.audio('music', 'assets/theme.wav');
    this.Z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
  },

  create: function(){
    let highscore = localStorage.getItem("highscore");
    if (!highscore){
      localStorage.setItem("highscore", "0");
      highscore = localStorage.getItem("highscore");
    }

    this.theme = this.sound.add('music', {volume: 0.6});
    this.theme.loop = true;
    this.theme.play();

    // Create scoreboard
    this.scoreboard = this.add.text(4, 4,'SCORE:' + 0 + ' HI:' + highscore, {
      fontFamily:  '"Press Start 2P"',
      fontSize: '18px',
    });
    
    const Title = this.add.text(180, 80, 'Alien War!', {
      fontFamily:  '"Press Start 2P"',
      fontSize: '48px',
    });
    const Alert = this.add.text(260, 500, 'Press Z to start', {
      fontFamily:  '"Press Start 2P"',
      fontSize: '18px',
    });

  },
  update: function(){
    if (this.Z.isDown) {
      this.theme.stop();
      this.scene.stop('menu').launch('runtime');
    }
  }
}