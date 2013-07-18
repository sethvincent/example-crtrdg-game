# crtrdg entity
> entity module for games

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

// require crtrdg-entity
var Entity = require('crtrdg-entity');

// require the inherits module so we can make Player inherit from Entity.
var inherits = require('inherits');

// initialize the game with the canvas id
// set the width, height, and default background color of the canvas
var game = new Game({
  canvasId: 'game',
  width: '800',
  height: '400',
  backgroundColor: '#ff1f1f'
});

// make the Player funtion inherit from crtrdg-entity
inherits(Player, Entity);

// create Player function
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

// create instance of Player
var player = new Player({
  position: { x: 10, y: 10 },
  size: { x: 10, y: 10 },
  color: '#fff'
});

// add the player to the game
player.addTo(game);

// listen for update event.
// here you can do things like change position or watch for keyboard/mouse events
player.on('update', function(interval){
  console.log(this.position);
});

// listen for draw event.
// context is the canvas context, so you can draw on the canvas like usual.
player.on('draw', function(context){
  context.fillStyle = this.color;
  context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
});

// find an entity with `game.findEntity`, an alias for `Entity.prototype.findEntity`
game.findEntity(player, function(exists, entities, index){
  
  // returns exists, a boolean,
  // entities, the full array of entities,
  // and index, the array index of the entity
  console.log(exists, entities, index)
})
```

## Purpose of `crtrdg`:
Almost every javascript game / animation library I've found bundles things like requestAnimationFrame polyfill, gameloop, entities, abstract drawing methods, keyboard/mouse input, vector math, and more into one entangled library. If I don't like how the library handles just one of those components, I'm stuck with dead library weight, and sometimes it's difficult to replace a library's methods.

So what if each element of 2d games were broken up into it's own modules / repositories?

With inspiration from voxel.js, crtrdg is a collection of javascript modules used for developing 2d games.

As I learned more about node.js, the core events module, and browserify, I realized the ideal api for making simple 2d games could be based on node's events module. So you'll see a lot of crtrdg modules exposing an api that includes `.on('some event', function(){})`, which seems to make a lot of sense for games.

## Other `crtrdg` modules:
- [crtrdg-gameloop](http://github.com/sethvincent/crtrdg-gameloop)
- [crtrdg-keyboard](http://github.com/sethvincent/crtrdg-keyboard)
- [crtrdg-mouse](http://github.com/sethvincent/crtrdg-mouse)


## Contributing
- Fork this repository.
- Create a branch for you changes.
- Include tests if applicable.
- Add/edit documentation for any changes.
- Submit a pull request.

## License
MIT