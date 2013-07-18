# crtrdg entity
> canvas animation using requestAnimationFrame

## Goals for the crtrdg gameloop:
- Serve as a simple entity module that other modules can inherit
- Emits update and draw events.

## Requirements
- node.js
- browserify / beefy
- crtrdg-gameloop (or possibly another method of animating the canvas with requestAnimationFrame that emits `update` and `draw` events)

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
// use crtrdg-gameloop for animating to the canvas with requestAnimationFrame.
var Game = require('crtrdg-gameloop');

// require crtrdg-mouse
var Mouse = require('crtrdg-mouse');

// create a new game
var game = new Game({
  canvasId: 'game',
  width: '800',
  height: '400',
  backgroundColor: '#ff1f1f'
});

// create the mouse and pass in the game as an argument
var mouse = new Mouse(game);

// listen for click events
mouse.on('click', function(loc){
  console.log('click at: ', loc);
});

// listen for mousedown events
mouse.on('mousedown', function(loc){
  console.log('mousedown at: ', loc);
});

// listen for mouseup events
mouse.on('mouseup', function(loc){
  console.log('mouseup at: ', loc);
});

// listen for mousemove events
mouse.on('mousemove', function(loc){
  console.log('mousemove at: ', loc);
});
```

## Purpose of `crtrdg`:
Almost every javascript game / animation library I've found bundles things like requestAnimationFrame polyfill, gameloop, entities, abstract drawing methods, keyboard/mouse input, vector math, and more into one entangled library. If I don't like how the library handles just one of those 

With inspiration from voxel.js, crtrdg is a collection of javascript modules used for developing 2d games.

As I learned more about node.js, the core events module, and browserify, I realized the ideal api for making simple 2d games could be based on node's events module.

## Other `crtrdg` modules:
- [crtrdg-gameloop](http://github.com/sethvincent/crtrdg-gameloop)
- [crtrdg-keyboard](http://github.com/sethvincent/crtrdg-keyboard)
- [crtrdg-entity](http://github.com/sethvincent/crtrdg-entity)


## Contributing
- Fork this repository.
- Create a branch for you changes.
- Include tests if applicable.
- Add/edit documentation for any changes.
- Submit a pull request.

## License
MIT