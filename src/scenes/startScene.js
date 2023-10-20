import {Scene} from'phaser';
import * as fnc from '../game.js';
import { cfg } from '../game.js'



export class StartScene extends Scene {
  constructor() {
    super('StartScene')
  }
  init() {
    console.log('Start scene was loading...')
    this.game.sound.stopAll()
  }

  preload() {
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')
    this.load.spritesheet('btn', '../assets/images/buttons/longBtn.png', {
      frameWidth: 500,
      frameHeight: 195,
      startFrame: 0,
      endFrame: 5,
    })
  }
 
  create() {
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 25, 30, 'btnExit').setScale(0.35).setDepth(1)
    //---btn
    this.btnPlay = this.add.image(cfg.width / 2 - 7, cfg.height / 2, 'btn', 3).setScale(0.4, 0.6)
    //---btn text label
    fnc.createText(this, cfg.width / 2 - 45, cfg.height / 2 - 20, 'PLAY',42)
    
    //---btn Exit set interactive
    this.btnExit.setInteractive().on('pointerdown', () => {
      this.scene.stop()
      this.scene.start('MenuScene')
    })
    //---btn Play set interactive
    this.btnPlay.setInteractive().on('pointerdown', () => {
      // reset scene
      cfg.global.isGameBegin = true
      this.scene.resume('GameScene')
      this.scene.stop()
    })


    //---Tween btn Play
        this.tweens.add({
          targets: this.btnPlay,
          scaleX: 0.377,
          scaleY: 0.555,
          duration: 700, 
          yoyo: true, 
          ease: 'Linear',
          repeat: -1
        })
  }
}