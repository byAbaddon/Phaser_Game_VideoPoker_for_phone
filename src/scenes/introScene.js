import {Scene} from'phaser';
import * as fnc from '../game.js';
import { cfg } from '../game.js'


let loadingSceneStarted = false; 
export class IntroScene extends Scene {
  constructor() {
    super('IntroScene')
  }

  init() {
    console.log('IntroScene was loading...')  
  }

  preload() {
    //------------------------------LOAD AUDIO
    this.load.audio('bgIntro', '/assets/sounds/background/bgIntro.wav')
    this.load.audio('btnStartClick', '/assets/sounds/effects/btnClick/click0.wav')
    
    //------------------------------- LOAD IMAGES
    //logo cards
    this.load.image('logo', '../assets/images/cards/logo/1.png')
    

    //button start
    this.load.spritesheet('btnControls', '/assets/images/buttons/longBtn.png',
      { frameWidth: 500, frameHeight: 194, startFrame: 1, endFrame: 0 });
     
  }
 

  create() {
    //grid create for dev test
    // fnc.createGridSystem(this)
    
    //---------------- add background by black color
    this.cameras.main.setBackgroundColor('#000000')
     

     //---------------------------------((((add AUDIO))))-----------------------------
    this.soundBgIntro = fnc.createAudio(this, 'bgIntro', 0.5, ) // true
    // check is bg music not play, start music
    if (!this.sound.getAllPlaying().length) this.soundBgIntro.play()
      
    this.soundBtnStartClick = () => fnc.createAudio(this, 'btnStartClick').play()


    //--------------------------------((((add TEXT))))------------------------------
    //---logo
    this.titleText = fnc.createText(this, cfg.width / 4 + 28, cfg.height * 0.1 , 'Video Poker',50,null,null,null,'born' )


    //--------------------------------((((add IMAGES)))) --------------------------
    //---logo
    this.add.image(cfg.width / 2, cfg.height / 2 - 20, 'logo').setScale(1.2)
    
    // ------------------------------buttons
    this.btnStart = this.add.image(cfg.width / 2 - 6, cfg.height - 90, 'btnControls').setScale(0.4, 0.5)
    //---start btn label
    fnc.createText(this, cfg.width / 2 - 38, cfg.height - 110, 'MENU', 30, null, null, 'bold' )
    
    //---start menu label
    this.subTitleText = fnc.createText(this, cfg.width / 3 + 28, cfg.height - 50, 'Press button to Menu', 26)
  
    this.btnStart.setInteractive({ cursor: 'pointer' })                      //    write direct css command  in   setInteractive()
      .on('pointerover', () => this.btnStart.setTint(0xe0e0e0))
      .on('pointerout', () => this.btnStart.setTint(0xffffff))
      .on('pointerdown', () => {
        //play sound
        this.soundBtnStartClick()
        this.scene.start('MenuScene')
      })

 
      //-------------------------------Tween Animations
      fnc.tweenAnimation.createTextChangeColorAnimation(this, this.titleText.name)
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, this.subTitleText,  380, 1500, -1, 500)

  
   }
}
