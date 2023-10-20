function runtimeCreate (){
  // Perhaps not a silver bullet but this may increase
  // running speed consistency across multiple machines
  this.physics.world.setFPS(60);

  this.score = 0;
  this.running = true;
  this.paused = false;

  // Get stored high score
  let highscore = localStorage.getItem("highscore");

  // Create scoreboard
  this.scoreboard = this.add.text(4, 4,'SCORE:' + this.score + ' HI:' + highscore, {
    fontFamily:  '"Press Start 2P"',
    fontSize: '18px',
  });
  this.scoreboard.depth = 1;

  // Add physics bodies
  this.player = this.physics.add.image(400, 300, 'ship');
  this.player.body.maxSpeed = 500;
  this.player.body.maxAngular = 180;

  // Add sounds
  this.explosionSound = this.sound.add('explosionSound', {volume: .5});
  this.accelerate = this.sound.add('accelerate', {volume: .08});
  this.shoot = this.sound.add('laser', {volume: 0.1});
  this.shoot1 = this.sound.add('laser1', {volume: 0.4});
  this.pause = this.sound.add('pause', {volume: 0.5})

  // Player particles
  this.rightEngineR = this.add.particles(0, 32, 'engineParticle', {
    angle: { min: -90, max: 90 },
    speed: 200,
    lifespan: 100,
    follow: this.player.body,
    emitting: false
  });
  this.leftEngineR = this.add.particles(0, 0, 'engineParticle', {
    angle: { min: -90, max: 90 },
    speed: 200,
    lifespan: 100,
    follow: this.player.body,
    emitting: false
  });
  this.rightEngineL = this.add.particles(0, 32, 'engineParticle', {
    angle: { min: 90, max: 270 },
    speed: 200,
    lifespan: 100,
    follow: this.player.body,
    emitting: false
  });
  this.leftEngineL = this.add.particles(0, 0, 'engineParticle', {
    angle: { min: 90, max: 270 },
    speed: 200,
    lifespan: 100,
    follow: this.player.body,
    emitting: false
  });

  this.explosion = this.add.particles(0, 0, 'explosionParticle', {
    angle: { min: 0, max: 360 },
    speed: 200,
    lifespan: 200,
    emitting: false,
  });
  
  // Add groups
  this.playerProjectiles = this.physics.add.group({
    collideWorldBounds: true
  });
  this.UFOProjectiles = this.physics.add.group({
    collideWorldBounds: true
  });
  this.UFOS = this.physics.add.group({});

  setTimeout(() => {enemyShoot.call(this)}, 800);

  setTimeout(() => {
    spawnUFO.call(this);
  }, 1500);

  // Add collisions
  this.physics.add.collider(this.UFOProjectiles, this.player, (a, b) => {
    if (a.texture.key === 'player'){
      this.explosion.explode(4, a.body.x, a.body.y);
      b.destroy();
    }else{
      this.explosion.explode(4, b.body.x, b.body.y);
      a.destroy();
    }

    this.explosionSound.play();
    gameOver.call(this);
  });  

  this.physics.add.collider(this.UFOS, this.UFOS, (a, b) => {
    a.body.x += 32;
  });

  this.physics.add.collider(this.player, this.UFOS, (a, b)=>{
    this.explosion.explode(4, b.body.x, b.body.y);
    this.explosion.explode(4, a.body.x, a.body.y);
    if (a.texture.key === 'ufo'){
      a.destroy();
    }else{
      b.destroy();
    }
    this.explosionSound.play();
    gameOver.call(this);
  });

  this.physics.add.collider(this.playerProjectiles, this.UFOS, (a, b)=>{
    this.score += 100;
    this.scoreboard.setText('SCORE:' + this.score + ' HI:' + highscore);
    this.scoreboard.depth = 1;
    
    if (a.texture.key === 'ufo'){
      this.explosion.explode(4, a.body.x, a.body.y);
    }else{
      this.explosion.explode(4, b.body.x, b.body.y);
    }
    a.destroy();
    b.destroy();
    this.explosionSound.play();
    spawnUFO.call(this);
  })

}
