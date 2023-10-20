runtime = {
  key: 'runtime',
  preload: runtimePreload,
  create: runtimeCreate,
  update: runtimeUpdate
}

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  scene: [menu, runtime, paused],
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 }
    }
  },
};

document.addEventListener("DOMContentLoaded", function(event){
  this.game = new Phaser.Game(config);
});