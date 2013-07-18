var EventEmitter = require('events').EventEmitter;
var requestAnimationFrame = require('raf');
var inherits = require('inherits');

module.exports = Game;
inherits(Game, EventEmitter);

function Game(options){
  this.canvas = document.getElementById(options.canvasId);
  this.context = this.canvas.getContext('2d');
  this.width = this.canvas.width = options.width;
  this.height = this.canvas.height = options.height;
  this.backgroundColor = options.backgroundColor;

  if (options.maxListeners){
    this.setMaxListeners(options.maxListeners);
  } else {
    this.setMaxListeners(0);
  }

  this.loop();
}

Game.prototype.loop = function(){
  var self = this;

  this.ticker = requestAnimationFrame(this.canvas);
  this.ticker.on('data', function(interval) {
    self.update(interval);
    self.draw();
  });
};

Game.prototype.pause = function(){
  this.ticker.pause();
  this.emit('pause');
};

Game.prototype.resume = function(){
  var self = this;

  this.ticker = requestAnimationFrame(this.canvas);
  this.ticker.on('data', function(interval) {
    self.update(interval);
    self.draw();
  });

  this.emit('resume');
};

Game.prototype.update = function(interval){
  this.emit('update', interval);
};

Game.prototype.draw = function(){
  this.context.fillStyle = this.backgroundColor;
  this.context.fillRect(0, 0, this.width, this.height);
  this.emit('draw', this.context)
};