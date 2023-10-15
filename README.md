# Phaser_Game_VideoPoker_for_phone

### Created a project using:
+ Phaser 3
+ JS
+ Simple - HTML / CSS
+ webpack
+ bable
+ cordova
+ android stuido
+ +

# Game - Video Poker
Five Card Poker is a classic and exciting game also known as "Five Card Draw" that is played with a deck of 52 cards.
It requires not only luck, but also skill, strategy and attention.
In this version, for more fun, a Joker card has been added, which can replace any other card.

## Playing the game
How to play?
At the start, players are dealt five cards and a credit of 100 points.
The player can then replace several of these in an attempt to improve his hand, aiming to make the best possible combination for which he receives the corresponding points.
A bet can be made, from 1 to 15 credits, which increase the profit.
If the credit points run out, the game over.

## Short video intro:
soon

## Screenshots:
![1](https://github.com/byAbaddon/Phaser_Game_VideoPoker_for_phone/assets/51271834/ccf221d3-78a6-4b10-8c88-dcb0618b4750)



### Download
#### Created with Phaser 3 and converted for android mobile app.
##### download apk file:
https://github.com/byAbaddon/Phaser_Game_VideoPoker_for_phone/releases/tag/VideoPoker


### Prerequisites
- [Phaser 3](https://phaser.io)
#### Year:
2023

### Developer
By Abaddon

<br>
<br>

A Phaser 3 project template with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/) that includes hot-reloading for development and production-ready builds.

This has been updated for Phaser 3.50.0 version and above.

Loading images via JavaScript module `import` is also supported, although not recommended.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

## Customizing the Template

### Babel

You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you want your project to support. The targeted browsers are set in the `.babelrc` file and the default currently targets all browsers with total usage over "0.25%" but excludes IE11 and Opera Mini.

 ```
"browsers": [
  ">0.25%",
  "not ie 11",
  "not op_mini all"
]
 ```

### Webpack

If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create new configuration files and target them in specific npm tasks inside of `package.json'.

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended. 

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), you should be able to open `http://mycoolserver.com/index.html` and play your game.
