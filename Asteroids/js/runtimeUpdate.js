function runtimeUpdate() {
  this.paused = false;

  if (this.running){
    if (this.SPACE.isDown){
      this.paused = true;
      this.pause.play();
      this.scene.launch('paused');
      this.scene.pause();
    }

    if (this.LEFT.isDown){
      this.player.body.angularVelocity -= 5;
      if (Math.abs(this.player.body.rotation) < 90) {
        this.rightEngineL.x = 20*Math.cos(this.player.body.rotation*Math.PI/180 - 5*Math.PI/4) + 16;
        this.rightEngineL.y = 20*Math.sin(this.player.body.rotation*Math.PI/180 - 5*Math.PI/4) + 16;
        this.rightEngineL.emitting = true;
        this.rightEngineR.emitting = false;
      }else{
        this.rightEngineR.x = 20*Math.cos(this.player.body.rotation*Math.PI/180 - 5*Math.PI/4) + 16;
        this.rightEngineR.y = 20*Math.sin(this.player.body.rotation*Math.PI/180 - 5*Math.PI/4) + 16;
        this.rightEngineR.emitting = true;
        this.rightEngineL.emitting = false;    
      }
    }else {
      this.rightEngineR.emitting = false;
      this.rightEngineL.emitting = false;
    }

    if (this.RIGHT.isDown) {
      this.player.body.angularVelocity += 5;
      if (Math.abs(this.player.body.rotation) < 90) {
        this.leftEngineL.x = 20*Math.cos(this.player.body.rotation*Math.PI/180 + 5*Math.PI/4) + 16;
        this.leftEngineL.y = 20*Math.sin(this.player.body.rotation*Math.PI/180 + 5*Math.PI/4) + 16;
        this.leftEngineL.emitting = true;
        this.leftEngineR.emitting = false;
      }else{
        this.leftEngineR.x = 20*Math.cos(this.player.body.rotation*Math.PI/180 + 5*Math.PI/4) + 16;
        this.leftEngineR.y = 20*Math.sin(this.player.body.rotation*Math.PI/180 + 5*Math.PI/4) + 16;
        this.leftEngineR.emitting = true;
        this.leftEngineL.emitting = false;    
      }
    }else {
      this.leftEngineR.emitting = false;
      this.leftEngineL.emitting = false;
    }

    if (this.UP.isDown) {
      this.player.body.velocity.x += 2*Math.cos(this.player.body.rotation*Math.PI/180);
      this.player.body.velocity.y += 2*Math.sin(this.player.body.rotation*Math.PI/180);
      this.accelerate.stop();
      this.accelerate.play();
    }

    if (this.Z.isDown) {
      if (!this.shoot.isPlaying){
        // Create bullet reference
        let ref = this.physics.add.image(
          this.player.body.x + 16 + 16*Math.cos(this.player.body.rotation*Math.PI/180), 
          this.player.body.y + 16 + 16*Math.sin(this.player.body.rotation*Math.PI/180),
          'bullet');

        // Remove bullet once off screen
        this.playerProjectiles.add(ref)
        ref.body.onWorldBounds = true;
        ref.body.world.on('worldbounds', function (body) {
            body.gameObject.destroy();
        });

        // Send it!
        ref.body.velocity.x = 1000*Math.cos(this.player.body.rotation*Math.PI/180);
        ref.body.velocity.y = 1000*Math.sin(this.player.body.rotation*Math.PI/180);

        this.shoot.play();
      }
    }

    this.UFOS.children.each((ref) =>{
      if (ref.body.x > 768){
        ref.body.x = 0;
        ref.body.velocity.x = 32;
      }else if (ref.body.x < 0){
        ref.body.x = 768;
        ref.body.velocity.x = -32;
      }

      if (ref.body.y > 568){
        ref.body.y = 0;
        ref.body.velocity.y = 32;  
      }else if(ref.body.y < 0){
        ref.body.y = 568;
        ref.body.velocity.y = -32;
      }
    });

    if (this.player.body.x > 800) {
      this.player.body.x = 0;
    }else if (this.player.body.x < 0) {
      this.player.body.x = 768;
    }

    if (this.player.body.y > 568){
      this.player.body.y = 0;
    }else if (this.player.body.y < 0) {
      this.player.body.y = 568;
    }
  } else {
    this.rightEngineR.emitting = false;
    this.rightEngineL.emitting = false;
    this.leftEngineR.emitting = false;
    this.leftEngineL.emitting = false;
  }
}