function spawnUFO(){
  if (!this.player.body){
    return;
  }

  let ref = this.physics.add.image(
    this.player.body.x + 384*Math.cos(2*Math.PI*Math.random()), 
    this.player.body.y + 384*Math.sin(2*Math.PI*Math.random()), 'ufo');

  if (!ref){
    return;
  }

  this.UFOS.add(ref)

  if (Math.random() > 0.5){
    ref.body.velocity.x = -32;
    if (Math.random() > 0.5){
      ref.body.velocity.x = 32;
    }
  }else{
    ref.body.velocity.y = -32;
    if (Math.random() > 0.5){
      ref.body.velocity.y = 32;
    }
  }

  if (this.UFOS.getLength() < (Math.log(this.score)/Math.log(5))){
    spawnUFO.call(this);
  }
}

function gameOver(){
  this.running = false;
  this.player.destroy();

  this.add.text(180, 80, 'Game Over!', {
    fontFamily:  '"Press Start 2P"',
    fontSize: '48px',
    color: '#9c2020'
  });

  // Set delayed scene change
  setTimeout(() => {
    this.scene.stop("runtime"); 
    this.scene.launch('menu');
    let highscore = parseInt(localStorage.getItem("highscore"));
    if (this.score > highscore){
      localStorage.setItem("highscore", this.score.toString());
    }
  }, 3000);
}

function enemyShoot(){
  if (!this.running){
    return;
  }
  setTimeout(() => {enemyShoot.call(this)}, 800);

  if (this.paused){
    return;
  }

  if (Math.random() > 0.6) {
    let ufo = this.UFOS.getChildren()[Math.floor(Math.random()*this.UFOS.getLength())];

    if (!ufo){
      return;
    }

    let proj = this.physics.add.image(
      ufo.x + 16,
      ufo.y + 16,
      'bullet');

    this.UFOProjectiles.add(proj)

    this.shoot1.play();

    // Prevent divide by 0
    if (ufo.x === this.player.x){
      ufo.x +=1;
    }

    let angle = Math.atan((ufo.y - this.player.y)/(ufo.x - this.player.x));

    proj.body.velocity.x = 250*Math.cos(angle);
    proj.body.velocity.y = 250*Math.sin(angle);

    if (this.player.x < ufo.x){
      proj.body.velocity.y = -proj.body.velocity.y;
      proj.body.velocity.x = -proj.body.velocity.x;
    }
    
    // Remove bullet once off screen
    proj.body.onWorldBounds = true;
    proj.body.world.on('worldbounds', function (body) {
        body.gameObject.destroy();
    });
  }
}