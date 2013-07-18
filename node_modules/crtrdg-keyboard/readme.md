# crtrdg keyboard
> keyboard listener module for crtrdg

## Goals for crtrdg keyboard:
- Emit keydown and keyup events.

## Requirements
- node.js
- browserify / beefy
- crtrdg-gameloop (or another game object with a reference to the canvas id)

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

// require crtrdg-keyboard
var Keyboard = require('./index');

// create a new game
var game = new Game({
  canvasId: 'game',
  width: '800',
  height: '400',
  backgroundColor: '#ff1f1f'
});

// create a new keyboard, passing the game as an argument
var keyboard = new Keyboard(game);

// for simplicity and brevity:
var keys = keyboard.keys;

// you can listen for keydown & keyup events
keyboard.on('keydown', function(key){
  if (key === 'A'){
    console.log('Yep! That is the A key!');
  }
});

keyboard.on('keyup', function(key){
  if (key === 'A'){
    console.log('Oh, you stopped pressing the A key.');
  }
});

// alternately, you can check the keyboard.keysDown object inside of an update listener. 
// this is the recommended approach if you have a player entitity and you want it's behavior
// to change based on keyboard input
game.on('update', function(interval){
  if ('B' in keyboard.keysDown){
    console.log('the B key is being pressed down!');
  }
});
```

## Purpose of `crtrdg`:
Almost every javascript game / animation library I've found bundles things like requestAnimationFrame polyfill, gameloop, entities, abstract drawing methods, keyboard/mouse input, vector math, and more into one entangled library. If I don't like how the library handles just one of those components, I'm stuck with dead library weight, and sometimes it's difficult to replace a library's methods.

So what if each element of 2d games were broken up into it's own modules / repositories?

With inspiration from voxel.js, crtrdg is a collection of javascript modules used for developing 2d games.

As I learned more about node.js, the core events module, and browserify, I realized the ideal api for making simple 2d games could be based on node's events module. So you'll see a lot of crtrdg modules exposing an api that includes `.on('some event', function(){})`, which seems to make a lot of sense for games.

## Other `crtrdg` modules:
- [crtrdg-gameloop](http://github.com/sethvincent/crtrdg-gameloop)
- [crtrdg-mouse](http://github.com/sethvincent/crtrdg-mouse)
- [crtrdg-entity](http://github.com/sethvincent/crtrdg-entity)


## Contributing
- Fork this repository.
- Create a branch for you changes.
- Include tests if applicable.
- Add/edit documentation for any changes.
- Submit a pull request.

## License
MIT