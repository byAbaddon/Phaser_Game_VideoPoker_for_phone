import style from "./main.css";
import Phaser, { Game } from 'phaser';
import loadMultiImages from "./functions/loadMultiImages";
import createAudio from "./functions/createAudio";
import createText from "./functions/createText";
import createGridSystem from "./functions/createGridSystem";
import * as animation from "./functions/createAnimation";
import * as tweenAnimation from "./functions/createTween";
import checkOrientation from "./functions/checkOrientation";

import { LoadScene } from "./scenes/loadScene";
import { IntroScene } from "./scenes/introScene";
import { MenuScene } from "./scenes/menuScene";
import { GameScene } from "./scenes/gameScene";
import { CreditsScene } from "./scenes/creditsScene";
import { ReloadScene } from "./scenes/reloadScene";
// import { GameOverScene } from "./scenes/gameOverScene";
// import { StartScene } from "./scenes/startScene";



const cfg = {
  width:  960, // window.innerWidth,  
  height: 480,  //window.innerHeight, 
  orientation: 'landscape', // set phone orientation  (portrait - vertical, landscape - horizontal)
  forceOrientation: true,
  backgroundColor: 'rgb(0, 0, 0)', //'rgb(0,0,100)'
  type: Phaser.AUTO,
  parent: 'game',
  scene: [LoadScene, IntroScene, MenuScene, CreditsScene, GameScene, ReloadScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: !true, //false default
      gravity: { y: 160 }, // default gravity
    }
  },
  scale: {
    //  mode: Phaser.Scale.RESIZE,  // no back field but increase image
    // mode: Phaser.Scale.FIT,  // back field but correct proportion image
    mode: Phaser.Scale.SHOW_ALL, // best solution
    // mode: Phaser.Scale.PORTRAIT, // vertical orientation screen
    // mode: Phaser.Scale.LANDSCAPE, // vertical orientation screen
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH 
  },
  dom: {
    createContainer: true
  },
  global: {
    // Initial value of the global property 
    credits: 100, //points to  start game 100
    betCounter: 1,
    isGameBegin: false,
    isBetMax: false,
    isPlayBgSound: false, 
    isPausedSound: false,
    globalDataJSON: null, // Set initial JSON value to null
    globalImages: null, 
  }
};

const game = new Phaser.Game(cfg)


export {
  cfg,
  createGridSystem,
  loadMultiImages,
  createAudio,
  createText,
  animation,
  tweenAnimation,
  checkOrientation,
}

