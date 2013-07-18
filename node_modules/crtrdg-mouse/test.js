var Game = require('crtrdg-gameloop');
var Mouse = require('./index');

var game = new Game({
  canvasId: 'game',
  width: '800',
  height: '400',
  backgroundColor: '#ff1f1f'
});

var mouse = new Mouse(game);

mouse.on('click', function(loc){
	console.log('click at: ', loc);
});

mouse.on('mousedown', function(loc){
  console.log('mousedown at: ', loc);
});

mouse.on('mouseup', function(loc){
  console.log('mouseup at: ', loc);
});

mouse.on('mousemove', function(loc){
  console.log('mousemove at: ', loc);
});