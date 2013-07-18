var inherits = require('inherits');
var aabb = require('aabb-2d');
var Entity = require('crtrdg-entity');

module.exports = Enemy;
inherits(Enemy, Entity);

function Enemy(options){
  var self = this;

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

  this.speed = options.speed;
  this.friction = options.friction;
  this.color = options.color;
  
  this.boundingBox = aabb([this.position.x, this.position.y], [this.size.x, this.size.y]);

  this.on('update', function(interval){
    this.game.findEntity(this, function(exists, entities, index){
      if (exists){
        self.boundingBox = aabb([self.position.x, self.position.y], [self.size.x, self.size.y]);

        self.position.x += self.velocity.x;
        self.position.y += self.velocity.y;

        self.checkBoundaries();        
      }
    });
  });

  this.on('draw', function(context){
    this.game.findEntity(this, function(exists, entities, index){
      if (exists){
        context.fillStyle = self.color;
        context.fillRect(self.position.x, self.position.y, self.size.x, self.size.y);
      }
    });
  });

}

Enemy.prototype.move = function(velocity){
  this.position.x += velocity.x;
  this.position.y += velocity.y;
};

Enemy.prototype.checkBoundaries = function(){
  if (this.position.x <= 0){
    this.velocity.x *= -1;
  }

  if (this.position.x >= this.game.width - this.size.x){
    this.velocity.x *= -1;
  }

  if (this.position.y <= 0){
    this.velocity.y *= -1;
  }

  if (this.position.y >= this.game.height - this.size.y){
    this.velocity.y *= -1;
  }
};

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}