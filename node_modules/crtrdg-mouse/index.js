var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = Mouse;
inherits(Mouse, EventEmitter);

function Mouse(game){
  this.game = game || {};
  this.el = game.canvas;
  this.initializeListeners();
}

Mouse.prototype.initializeListeners = function(){
  var self = this;

  this.el.addEventListener('click', function(e){
    self.calculateOffset(e, function(location){
      self.emit('click', location);
    })
  });

  this.el.addEventListener('mousedown', function(e){
    self.calculateOffset(e, function(location){
      self.emit('mousedown', location);
    })
  });

  this.el.addEventListener('mouseup', function(e){
    self.calculateOffset(e, function(location){
      self.emit('mouseup', location);
    })
  });

  this.el.addEventListener('mousemove', function(e){
    self.calculateOffset(e, function(location){
      self.emit('mousemove', location);
    })
  });
};

Mouse.prototype.calculateOffset = function(e, callback){
  var canvas = e.target;
  var offsetX = canvas.offsetLeft - canvas.scrollLeft;
  var offsetY = canvas.offsetTop - canvas.scrollTop;

  var location = {
    x: e.pageX - offsetX,
    y: e.pageY - offsetY
  };

  callback(location);
}
