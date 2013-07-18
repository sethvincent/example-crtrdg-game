var Game = require('crtrdg-gameloop');
var inherits = require('inherits');
var Entity = require('./index');

var game = new Game({
  canvasId: 'game',
  width: '800',
  height: '400',
  backgroundColor: '#ff1f1f'
});

game.on('update', function(interval){
  console.log(player.exists);
});

inherits(Player, Entity);

function Player(options){
  this.position = { 
    x: options.position.x, 
    y: options.position.y 
  };

  this.size = {
    x: options.size.x,
    y: options.size.y
  };

  this.color = options.color
}

var player = new Player({
  position: { x: 10, y: 10 },
  size: { x: 10, y: 10 },
  color: '#fff'
}).addTo(game);

var time = 0;
player.on('update', function(interval){
  //console.log(this.position);
  time += interval;
  console.log(time)
  if (time > 3000){
    player.remove();
  }
});

player.on('draw', function(context){
  context.fillStyle = this.color;
  context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
});

