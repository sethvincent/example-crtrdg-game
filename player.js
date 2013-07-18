var inherits = require('inherits');
var aabb = require('aabb-2d');
var Entity = require('crtrdg-entity');

module.exports = Player;
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

  this.velocity = {
    x: options.velocity.x,
    y: options.velocity.y
  };

  this.boundingBox = aabb([this.position.x, this.position.y], [this.size.x, this.size.y]);

  this.on('update', function(interval){
    this.boundingBox = aabb([this.position.x, this.position.y], [this.size.x, this.size.y]);
  });
  
  this.speed = options.speed;
  this.friction = options.friction;
  this.color = options.color;
}

Player.prototype.move = function(velocity){
  this.position.x += velocity.x;
  this.position.y += velocity.y;
};

Player.prototype.checkBoundaries = function(){
  if (this.position.x <= 0){
    this.position.x = 0;
  }

  if (this.position.x >= this.game.width - this.size.x){
    this.position.x = this.game.width - this.size.x;
  }

  if (this.position.y <= 0){
    this.position.y = 0;
  }

  if (this.position.y >= this.game.height - this.size.y){
    this.position.y = this.game.height - this.size.y;
  }
};

Player.prototype.keyboardInput = function(keyboard){
  if ('A' in keyboard.keysDown){
    this.velocity.x = -this.speed;
  }

  if ('D' in keyboard.keysDown){
    this.velocity.x = this.speed;
  }

  if ('W' in keyboard.keysDown){
    this.velocity.y = -this.speed;
  }

  if ('S' in keyboard.keysDown){
    this.velocity.y = this.speed;
  }
};