# crtrdg gameloop
> canvas animation using requestAnimationFrame

## Goals for the crtrdg gameloop:
- Initialize 2d canvas and animate using requestAnimationFrame.
- Create a gameloop that emits update and draw events.
- Emit pause and resume events.

## Purpose of `crtrdg`:
Almost every javascript game / animation library I've found bundles things like requestAnimationFrame polyfill, gameloop, entities, abstract drawing methods, keyboard/mouse input, vector math, and more into one entangled library. If I don't like how the library handles just one of those 

With inspiration from voxel.js, crtrdg is a collection of javascript modules used for developing 2d games. 

## Requirements
- node.js
- browserify / beefy

## Getting started
Install node if you haven't already.

### Install browserify and beefy:
```
npm install -g browserify beefy
```

### Create an index.html file:
```
<!DOCTYPE html>
<html>
<head>
  <title>crtrdg gameloop test</title>
</head>
<body>

<canvas id="game"></canvas>

<script src="./bundle.js"></script>
</body>
</html>
```

### Create a game.js file:
```
var Game = require('./index');

// initialize the game with the canvas id of your game
// the width, height, and default background color of the canvas
var game = new Game({
  canvasId: 'game',
  width: '800',
  height: '400',
  backgroundColor: '#ff1f1f'
});

// every time through the loop, the `update` event will be emitted,
// interval is the amount of time between each loop
// listen for the `update` event like this:
game.on('update', function(interval){
  console.log('update', interval);
});

// every time through the loop, the `draw` event will be emitted.
// context is the canvas context, and you can use it to draw on the canvas like usual.
// listen for the `draw` event like this:
game.on('draw', function(context){
  console.log('draw', context);
  context.fillStyle = '#fff';
  context.fillRect(10, 10, 10, 10);
});

// if game.pause() is called somewhere in your code,
// a `pause` event will be emitted
// listen for it like this:
game.on('pause', function(){
  console.log('paused');
});

// if game.resume() is called somewhere in your code,
// a `resume` event will be emitted
// listen for it like this:
game.on('resume', function(){
  console.log('resumed');
});
```

## Other `crtrdg` modules:
- [crtrdg-entity](http://github.com/sethvincent/crtrdg-entity)
- [crtrdg-keyboard](http://github.com/sethvincent/crtrdg-keyboard)
- [crtrdg-mouse](http://github.com/sethvincent/crtrdg-mouse)

## Modules that work well with `crtrdg-gameloop`:
- [aabb-2d](http://github.com/chrisdickinson/aabb-2d)
- [gl-matrix](http://github.com/toji/gl-matrix)

## Contributing
- Fork this repository.
- Create a branch for you changes.
- Include tests if applicable.
- Add/edit documentation for any changes.
- Submit a pull request.

## License
MIT