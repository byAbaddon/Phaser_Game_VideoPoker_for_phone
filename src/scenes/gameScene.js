import {Scene} from 'phaser'
import * as fnc from '../game.js'
import {cfg} from '../game.js'

export class GameScene extends Scene {
  constructor() {
    super('GameScene')
    this.pointsArray = [250, 50, 25, 9, 6, 4, 3, 2, 1],
    this.winObj = {
        'Royal Flush' : {'dot' : 20, 'points' : 250},
        'Straight Flush' : {'dot' : 17, 'points' : 50},
        'Four of a Kind' : {'dot' : 18, 'points' : 25},
        'Full House' : {'dot' : 13, 'points' : 9},
        'Flush' : {'dot' : 17, 'points' : 6},
        'Straight' : {'dot' : 13, 'points' : 4},
        'Three of a Kind' : {'dot' : 18, 'points' : 3},
        'Two Pair' : {'dot' : 26, 'points' : 2},
        'Jacks or Better' : {'dot' : 18, 'points' : 1},
      }, 
      
    this.cardsObj = {
      0:  '2C',  1: '3C',  2: '4C',  3: '5C',  4: '6C',  5: '7C',  6: '8C',  7: '9C',  8: '10C',  9: 'JC',  10: 'QC',  11: 'KC',  12: 'AC',
      13: '2D', 14: '3D', 15: '4D', 16: '5D', 17: '6D', 18: '7D', 19: '8D', 20: '9D', 21: '10D', 22: 'JD', 23: 'QD', 24: 'KD', 25: 'AD',
      26: '2H', 27: '3H', 28: '4H', 29: '5H', 30: '6H', 31: '7H', 32: '8H', 33: '9H', 34: '10H', 35: 'JH', 36: 'QH', 37: 'KH', 38: 'AH',
      39: '2S', 40: '3S', 41: '4S', 42: '5S', 43: '6S', 44: '7S', 45: '8S', 46: '9S', 47: '10S', 48: 'JS', 49: 'QS', 50: 'KS', 51: 'AS'
    }
  }

  init() {
    console.log('Welcome to GameScene...')
    this.isGameWasStarted = false
    this.handCounter = 0
    this.canPressButton = true
    this.gameBusy = false
    // this.game.sound.stopAll() //stop all sounds
  }

  preload() {
    //======================================(((load IMAGES)))============================
    //------------------ buttons
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')
    //---btnReload
    this.load.image('btnReload', '/assets/images/buttons/btnReload.png')
    // //---btnSound
    this.load.image('btnSound', '/assets/images/buttons/btnSound.png')
    // //---bgnNoSound
    this.load.image('btnNoSound', '/assets/images/buttons/btnNoSound.png')
    //---buttons
    this.load.spritesheet('btn', '../assets/images/buttons/longBtn.png', {
      frameWidth: 500,
      frameHeight: 195,
      startFrame: 0,
      endFrame: 5,
    })
    //sound multi images
    this.btnSoundSpriteImagesArray = fnc.loadMultiImages(this, 'btnSounds', '../assets/images/buttons/soundBtnSprite/', 4)

    //----------------backgrounds
    // this.load.image('bg', '../assets/images/backgrounds/1.jpg')

    //---bg spritesheet
    this.load.spritesheet('backgrounds', '../assets/images/backgrounds/bgSprite.png', {
      frameWidth: 960,
      frameHeight: 480,
      startFrame: 0,
      endFrame: 3,
    })
    //--------------------------------sprite sheets cards
    //---cards
    this.load.spritesheet('cards', '../assets/images/cards/spritesheet/cards.png', {
      frameWidth: 256,
      frameHeight: 356,
      startFrame: 0,
      endFrame: 51,
    })

    //---joker
    this.load.image('Joker', '../assets/images/cards/joker/joker.png')

    //-----------------bg cards back
    this.load.image('backRed', '../assets/images/cards/bg/2.png')
    this.load.image('backBlack', '../assets/images/cards/bg/4.png')

    //===========================(((load AUDIO)))===================================
    this.load.audio('bgGame', '/assets/sounds/background/bgGame.mp3')

    this.load.audio('btnExitClickSound', '/assets/sounds/effects/btnClick/clickExit.wav')
    this.load.audio('btnClickSound', '/assets/sounds/effects/btnClick/click1.wav')

    this.load.audio('btnHoldChanel', '../assets/sounds/effects/items/btn1.wav')
    this.load.audio('btnBet', '../assets/sounds/effects/items/btn2.wav')
    this.load.audio('getCombinationFirst', '../assets/sounds/effects/items/getCombinationFirst.wav')
    this.load.audio('getCombination', '../assets/sounds/effects/items/getCombination.wav')

    this.load.audio('outOfPointsSound', '../assets/sounds/effects/items/outOfPoints.wav')
    this.load.audio('betMaxSound', '../assets/sounds/effects/items/betMax.ogg')
    this.load.audio('increasePointsSound', '../assets/sounds/effects/items/increasePoints.wav')
    this.load.audio('decreasePointsSound', '../assets/sounds/effects/items/decrease.mp3')
    this.load.audio('drawDealSound', '../assets/sounds/effects/items/drawDeal.mp3')
    this.load.audio('cardFanSound', '../assets/sounds/effects/items/cardFan.wav')
    this.load.audio('addCreditPoints', '../assets/sounds/effects/items/addCreditPoints.wav')
  }

  create() {   
    //---------------------(((pause scene and wait push btn start)))
    // this.scene.launch('StartScene');
    // this.scene.pause();

    //----------------------(((grid create for dev test)))
    // fnc.createGridSystem(this)

    //---------------------------------((((add AUDIO))))-----------------------------
    // this.soundBgGame = () => fnc.createAudio(this, 'bgGame', 0.1, true, 1500).play()
    this.soundBgGame = this.sound.add('bgGame').setVolume(0.1).setLoop(true)
    // this.soundBgGame.pauseOnBlur = false
    

    this.soundBtnClick = () => fnc.createAudio(this, 'btnClickSound').play()
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClickSound').play()

    this.soundBtnHoldChanel = () => fnc.createAudio(this, 'btnHoldChanel').play()
    this.soundBtnBet = () => fnc.createAudio(this, 'btnBet').play()
    this.soundCheckFirstCombination = () => fnc.createAudio(this, 'getCombinationFirst').play()
    this.soundGetCombination = () => fnc.createAudio(this, 'getCombination').play()

    this.soundIncreasePoints = () => fnc.createAudio(this, 'increasePointsSound').play()
    this.soundOutOfPoints = () => fnc.createAudio(this, 'outOfPointsSound').play()

    this.soundBetMax = () => fnc.createAudio(this, 'betMaxSound').play()
    this.soundDecreasePoints = () => fnc.createAudio(this, 'decreasePointsSound').play()
    this.soundDrawDeal = () => fnc.createAudio(this, 'drawDealSound').play()
    this.soundCardFan = () => fnc.createAudio(this, 'cardFanSound').play()
    this.soundAddCreditPoints = () => fnc.createAudio(this, 'addCreditPoints').play()

    //--------------------------------((((add IMAGES)))) --------------------------
    //-------bg
    this.background = this.add.image(0, 0, 'backgrounds', 0).setOrigin(0, 0)
    //------bgCard
    

    //----------- buttons
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 25, 30, 'btnExit').setScale(0.35).setDepth(1)
    // this.btnReload = this.add.image(cfg.width - 25, 75, 'btnReload').setScale(0.3)
    this.btnSound = this.add.sprite(cfg.width - 25, 75, 'btnSound').setScale(0.35).setDepth(1)
      
  
    this.btnDeal = this.add.image(cfg.width - 95, cfg.height - 34, 'btn', 0).setScale(0.42)
    this.btnBetMinus = this.add.image(cfg.width / 2 - 50, cfg.height - 34, 'btn', 1).setScale(0.256, 0.35)
    this.btnBetPlus = this.add.image(cfg.width / 2 + 80, cfg.height - 50, 'btn', 5).setScale(0.256, 0.35)
    this.btnBetMax = this.add.image(cfg.width / 2 + 218, cfg.height - 41, 'btn', 2).setScale(0.266, 0.36)

    //---btn text label
    fnc.createText(this, cfg.width - 184, cfg.height - 60, 'Deal/Draw', 32)
    fnc.createText(this, cfg.width / 2 - 74, cfg.height - 60, 'BET-', 30)
    fnc.createText(this, cfg.width / 2 + 54, cfg.height - 60, 'BET+', 28)
    fnc.createText(this, cfg.width / 2 + 164, cfg.height - 56, 'MAX BET', 26)

    //--------------------------------((((add TEXT))))------------------------------
    this.currentHand = fnc.createText(this, 10, 110, '', 22, null, 'darkgreen')
    this.creditsText = fnc.createText(this, cfg.width * 0.01, cfg.height - 60, `CREDITS : ${cfg.global.credits}`, 38, 'yellow').setShadow(5, 0, 'red')
    this.infoBetText = fnc.createText(this, cfg.width / 2, 90, '').setVisible(false)
    const circle = this.add.circle(cfg.width / 3 + 20, cfg.height - 40, 25, 0x000000, 0.7)
    this.bet = fnc.createText(this, cfg.width / 3 + 10, cfg.height - 57, cfg.global.betCounter, 30, 'grey').setShadow(2, 0, 'red')
    this.finishText = fnc.createText(this, cfg.width / 2 - 150, cfg.height / 2
        , '           Try Again          ', 30, 'yellow', 'darkblue').setVisible(false)
    this.infoButtonText = fnc.createText(this, cfg.width / 2 - 50, cfg.height - 18, 'You must have more than 15 credits.', 16, 'red')
      .setVisible(false) 
    
    //---win text table
    if (cfg.global.isGameBegin) {
      for (let i = 0; i < cfg.global.betCounter - 1; i++) {
        Object.values(this.winObj).map((x, i) => x.points += this.pointsArray[i])    
      }
      if (cfg.global.betCounter == 15) Object.values(this.winObj).map(x => x.points == 3750 ? x.points = 5000 : x)
    }
    setTimeout(() => this.winTableTextCreator(), 100)
    
   
    //--------------------------------------- add DATA
    Array.from([this.btnExit, this.btnSound, ]).forEach((btn, index) => {
      btn.setInteractive({
          cursor: 'pointer',
          index
        })
        .on('pointerdown', () => {
          //  cfg.transitionBetweenScene('MenuScene') // translation between scene
          if (index == 0) { //exit
            this.game.sound.stopAll()
            this.anims.anims.clear()
            this.soundBtnExitClick()
            cfg.global.credits = 100
            cfg.global.betCounter = 1
            cfg.global.isPlayBgSound = true
            cfg.global.isPausedSound = false
            this.scene.start('MenuScene')
          }

          if (index == 1) {
            console.log('Music Pause ON/OFF' ,this.soundBgGame.isPlaying)
            if (!cfg.global.isPausedSound) {
              this.game.sound.stopAll()
              this.btnSound.setTexture('btnNoSound')
              this.btnSound.stop('btnSoundAnimation')
              cfg.global.isPausedSound = true
            } else {
              this.soundBgGame.play();
              this.btnSound.setTexture('btnSound')
              this.btnSound.play('btnSoundAnimation')
              cfg.global.isPausedSound = false
            }
            
           
            //console.log('Reload')
            // fnc.createText(this, cfg.width / 2 - 165, cfg.height / 2, '  RELOADING... ', 50, 'white', 'black').setDepth(5)
            // cfg.global.credits = 100,
            // cfg.global.betCounter = 1,
            // // cfg.global.isGameBegin = false,
            // this.anims.anims.clear()
            // this.soundBtnExitClick()
            // this.scene.pause(this.scene.scene)
           
            // setTimeout(() => {
            //   this.scene.resume('GameScene')
            //   this.scene.stop(this.scene.scene)
            //   this.scene.start('ReloadScene')
            // }, 1500);
         
          }
       
        })
    })

    //-------------------------------------(((Animation)))---------------------------
    //add multi sound images
    fnc.animation.createAnimationByArrayOfImages(this, 'btnSoundAnimation', this.btnSoundSpriteImagesArray,-1, 5)
    if (!cfg.global.isPausedSound) {
      this.btnSound.anims.play('btnSoundAnimation');
    } else {
      this.btnSound.setTexture('btnNoSound')
    }  
   
 

   
    //------------------------------------((((code))))-------------------------------
    this.startGame()
  }


  update(time) {
    this.changeBackground()
    this.setFirstBetButtonInactive()
  }

  //=====================================  Custom Function =======================

  startGame() {
    console.log('Game was start')
    // check is Game Over
    if (cfg.global.credits <= 0) return this.checkGameOver()
   
    //cards
    this.fiveCardsArray = []
    this.fiveCardsBackArray = []
    this.beforeStartCardsArray = []

    //-----------------------------------add interactive btn options
    Array.from([this.btnBetMinus, this.btnBetPlus, this.btnBetMax, this.btnDeal]).forEach((btn, index) => {
      btn.setInteractive({
        cursor: 'pointer',
        index
      })
        .on('pointerdown', () => { 
          this.updateUI()
          // bet only first hand
          if (this.currentHand.text != ' First Hand ' ) {
            //---------------------------------------------------------btnMinus
            if (index == 0) { //btnMinus decrease table points       
              if (cfg.global.betCounter > 1) {
                cfg.global.betCounter--
                // update table points
                Object.values(this.winObj).map((x, i) => x.points -= this.pointsArray[i])
                //restore royal Flush bonus points
                if (cfg.global.betCounter == 14) Object.values(this.winObj).map(x => x.points == 14750 ? x.points = 3500 : x)
                this.soundDecreasePoints() //sound
                this.updateUI() // updateData
              } else {
                this.soundOutOfPoints() //sound
              }
           
            }
            
            //---------------------------------------------------------btnPlus
            if (index == 1 ) { //btnPlus increase table points
              if (cfg.global.credits > 0 && cfg.global.betCounter < 15) {
                cfg.global.betCounter++
                // update table points
                Object.values(this.winObj).map((x, i) => x.points += this.pointsArray[i])
                //add royal Flush bonus points
                if (cfg.global.betCounter == 15) Object.values(this.winObj).map(x => x.points == 3750 ? x.points = 5000 : x)
                this.soundIncreasePoints() //sound
                this.updateUI() // updateData
              } else {
                this.soundOutOfPoints() //sound
              }
            }

            //----------------------------------------------------------btnMaxBet
            if (index == 2) { //btnMaxBet table points
              if (cfg.global.credits >= 15 && cfg.global.betCounter < 15) {     
                cfg.global.betCounter = 15 
                //updateData
                this.updateUI() 
                // update Table max bet
                Object.values(this.winObj).map((x, i) => x.points = this.pointsArray[i])
                Object.values(this.winObj).map(x => {
                  x.points *= 15
                  x.points = x.points == 3750 ? 5000 : x.points
                  return x
                })
                this.soundBetMax() //sound
                this.updateUI() //updateData
              } else {
                this.soundOutOfPoints() //sound
              }
            }
           
          }  

          //----------------------------------------------------------btn DEAL
          // prevent overflow button pressed
          if (this.canPressButton && !this.gameBusy) { 
            this.canPressButton = false
           
            if (index == 3) { //btnDeal
              this.handCounter++

              // ----------------------Refresh Game
              if (this.handCounter == 3) {
                console.log('Reload scene')
                this.scene.start('ReloadScene')
                this.updateUI()
                return
              }

              this.beforeStartCardsArray.map(x => x.destroy()) //clear cart from screen
              this.infoBetText.setText('').setVisible(false) //clear info bet text
              this.soundDrawDeal()

              //------------------------------------------firstHand
            if (this.handCounter == 1 ) {
              this.currentHand.setText(' First Hand ')
              this.generateRandomUniqueFiveCards() 
            }
              //-----------------------------------second hand cards
            if(this.handCounter == 2 )  {
              this.currentHand.setText('Second Hand ').setBackgroundColor('brown')
              this.generateSecondHandCards()
              this.fiveCardsArray.map(x => x.removeInteractive())
              //finish text message
              setTimeout(() => this.finishText.setVisible(true).setDepth(1), 800)
            }
            
            //-------- call function to check combination
            this.checkCardsCombination()
  
            //play sound and draw text if have card combination
            this.playSoundAndDrawTextCombination()
              
            
            if (this.handCounter == 2) {
              //--------- call function to add points
              setTimeout(() =>  this.addPointsToCredits() , 400)
                 
              //-------------- fixBetAndCredits is no more credits to max bet
              setTimeout(() => this.fixBetAndCredits(), 510)
             
              //  // check and set on/of buttons
              setTimeout(() => this.setOnOfBtnAlpha() , 520)
        
              //============ check Game Over ================
              setTimeout(() => { if (cfg.global.credits <= 0) this.checkGameOver() }, 530)
               
             } 
            
            }
          }

          //activate button Deal after time
          setTimeout(() => { this.canPressButton = true }, 550)

          setTimeout(() => {
            if (!cfg.global.isBetMax && this.handCounter == 2) {
              cfg.global.isBetMax = true
              cfg.global.credits -= cfg.global.betCounter 
              this.updateUI()
              this.fixBetAndCredits()
          }
            
          }, 560);
   
          //--------- animate button deal
          this.tweens.add({
            targets: this.btnDeal,
            duration: 700,
            alpha: 0.7,
            yoyo: true, 
            repeat: -1, 
          });

        })
      //---play bg music  
    })

    //card before start
    if (!cfg.global.isGameBegin) {
        this.updateUI()
        for (const xPos of [100, 290, 480, 670, 860]) {
          this.beforeStartCardsArray.push(this.add.image(xPos, cfg.height / 2 + 20, 'backRed').setScale(0.9)) 
        }
        //play BG Music      
        this.soundBgGame.play();
        cfg.global.isGameBegin = true
    } else {
      // check is sound play and start
      if (cfg.global.isPlayBgSound) {
        cfg.global.isPlayBgSound = false
        this.soundBgGame.play()
      }
 
        this.updateUI()
        // check and set on/of buttons
        this.setOnOfBtnAlpha()
        //firs hand after reload
        this.currentHand.setText(' First Hand ')
        this.generateRandomUniqueFiveCards()
        this.checkCardsCombination()
        this.playSoundAndDrawTextCombination() 
        this.handCounter = 1
      }

    // fix credits and betCounter after bet
    cfg.global.credits -= cfg.global.betCounter 
    this.updateUI()

   
  }

  //------------------------- function setFirstBet Button Inactive and Alpha
  setFirstBetButtonInactive() {
    if (this.currentHand.text == ' First Hand ')
      Array.from([this.btnBetMinus, this.btnBetPlus, this.btnBetMax]).map(x => x.setAlpha(0.3) && x.removeInteractive())
  }

  //------------------------- function setOnOfBtnAlpha
  setOnOfBtnAlpha() {
    if (cfg.global.credits < 15) {
      Array.from([this.btnBetMinus, this.btnBetPlus, this.btnBetMax]).map(x => x.setAlpha(0.3) && x.removeInteractive())
    } else {
      Array.from([this.btnBetMinus, this.btnBetPlus, this.btnBetMax]).map(x => x.setAlpha(1) && x.setInteractive())
    }
  }

  //-------------------------function  fixBetAndCredits is no credits to max bet
  fixBetAndCredits() {
    if (cfg.global.credits < 15) {
      cfg.global.betCounter = 1
      Object.values(this.winObj).map((x, i) => x.points = this.pointsArray[i])
      this.updateUI() 
      Array.from([this.btnBetMinus, this.btnBetPlus, this.btnBetMax]).map(x => x.setAlpha(0.3)&& x.removeInteractive())
      this.infoButtonText.setVisible(true) 
    } else {
      this.infoButtonText.setVisible(false)     
    }     
  }

  //-------------------------------function UPdate UI data
  updateUI() {
    // update bet counter
    this.bet.setText(cfg.global.betCounter)
   // update credits
    this.creditsText.setText(`CREDITS : ${cfg.global.credits}`)
    // update table
    this.winTableTextCreator()

    // console.log('Bet Counter:', cfg.global.betCounter);
    // console.log('Credits:', cfg.global.credits);
  } 

  //----------------------------------function SAVE cards interactive options
  holdTextElements = [];
  setFiveCardsInteractive() {
    Array.from([...this.fiveCardsArray]).forEach((card, index) => {
      card.setInteractive({
          cursor: 'pointer',
          index
        })
        .on('pointerdown', () => {
          // console.log(index, card.active);
          card.active = !card.active

          if (!card.active) card.active = false
          if (card.textElement) card.textElement.destroy()

          const newText = card.active ? 'CHANEL' : 'HOLD'
          card.textElement = fnc.createText(this, card.x - 40, card.y + 106, newText, 30).setAlpha(1)
          this.holdTextElements.push(card.textElement)
          this.soundBtnHoldChanel()

          this.tweens.add({
            targets: card.textElement,
            alpha: card.textElement.name == 'CHANEL' ? 0 : 1, // decrease to  0
            duration: 800,
            onComplete: () => {
              card.textElement.name == 'CHANEL' ? card.textElement.destroy() : null
            }
          })

        })
    })
  }

  //-------------------------------function changeBackground
  changeBackground() {
    let bgCard = 'backRed'
    if (cfg.global.betCounter <= 5) {
      this.background.setTexture('backgrounds', 0)
    } else if (cfg.global.betCounter > 5 && cfg.global.betCounter < 11) {
      this.background.setTexture('backgrounds', 1)
    } else if (cfg.global.betCounter == 15) {
      this.background.setTexture('backgrounds', 3)
      bgCard = 'backBlack' 
    } else {
      this.background.setTexture('backgrounds', 2)
    }
    //change bg cards if betCounter = 15
    try { this.beforeStartCardsArray.map(x => x.setTexture(bgCard)) } catch {}
     
  }

  //-------------------------------function winTableTextCreator
  textArray = []; //array save table text 
  winTableTextCreator() {
    this.textArray.map(x => x.destroy())
    this.winArray = Object.keys(this.winObj)
    let xPos = 15
    let yPos = 20
    for (let i = 0; i < this.winArray.length; i++) {
      if (i % 3 == 0) {
        yPos = 20
        if (i != 0) xPos += i == 3 ? 350 : 260
      } else yPos += 20

      let textLength = this.winArray[i].padEnd(this.winObj[this.winArray[i]].dot, '.')
      let points = ' ' + this.winObj[this.winArray[i]].points

      let text = fnc.createText(this, xPos, yPos, textLength + points , 28).setTint(0xffffff, 0xffffff, 0xffffff, 0xffdd00)
      this.textArray.push(text)
    }
  }


  //---------------------------------function generate Random Card and play tween animation
  generateRandomUniqueFiveCards() {
    this.gameBusy = true
    const uniqueNumbers = new Set()
    while (uniqueNumbers.size < 5) {
      uniqueNumbers.add(Phaser.Math.Between(0, 52))
    }
    const arrUniqNumbers = Array.from(uniqueNumbers)

   //--------------------test area
    //const arrUniqNumbers = [8, 9, 10, 11 ,12] // [10 J D K A] Royal flush  Done
    //const arrUniqNumbers = [8, 9, 6, 10 ,7] //Straight flush  Done
    //const arrUniqNumbers = [32, 19, 6, 45 ,7] //Four of kind  Done
    //const arrUniqNumbers = [32, 19, 6, 20, 7] //Full house Done
    //const arrUniqNumbers = [8, 9, 10, 11 , 2] //Flush Done
    // const arrUniqNumbers = [14,3,5,4,2] // Straight Done 
    //const arrUniqNumbers = [32, 19, 6, 46 ,5] // Three of Kind Done
    //const arrUniqNumbers = [32, 19, 7, 46 ,5] // Two Pair Done
    // const arrUniqNumbers = [3, 25, 17, 46, 12] // Jack or Better Done
    
    // arrUniqNumbers[4] = 52  ///only for test add joker
   
    //-----------------------------------------------------------------
    
    for (let i = 0; i < arrUniqNumbers.length; i++) {
      const cardXPos = [100, 290, 480, 670, 860]
      if (arrUniqNumbers[i] == 52) { //Joker
        this.fiveCardsArray[i] = this.add.image(cardXPos[i], cfg.height / 2 + 20, 'Joker')
          .setScale(0.6)
          .setName('Joker')
          .setInteractive()
          .setVisible(false)
      } else { //oder card
        this.fiveCardsArray[i] = this.add.image(cardXPos[i], cfg.height / 2 + 20, 'cards')
          .setScale(0.6)
          .setFrame(arrUniqNumbers[i])
          .setName(this.cardsObj[arrUniqNumbers[i]])
          .setInteractive()
          .setVisible(false)
      }
      // add five card back and prevent overflow
      if (this.fiveCardsBackArray.length < 5) {
        let card = 'backRed'
        if(cfg.global.betCounter == 15) card = 'backBlack'
        let cardBack = this.add.image(cardXPos[i], cfg.height / 2 + 20, card).setScale(0.9).setName(i)
        this.fiveCardsBackArray.push(cardBack)
      }
    }

    //-------------Tween animation
    this.cardsAnimation = this.tweens.add({
      targets: this.fiveCardsBackArray,
      scaleX: 0, // rotate back card
      duration: 400,
      ease: 'Linear',
      delay: 100,
      onStart: () => this.soundCardFan(),
      onComplete: (tween, targets) => {
        this.fiveCardsArray = this.fiveCardsArray.map(x => x.setVisible(true))
        this.tweens.add({
          targets: this.fiveCardsArray,
          scaleX: 0.6,
          onComplete: () => {  
            // console.log('front card rotation Done')
          }
        })
      }
    })

    // call function cardsInteractive to save card......................
    this.setFiveCardsInteractive()
    this.gameBusy = false
  }

  //----------------------------------function generate Second Hand Card adn play tween animation
  generateSecondHandCards() {
    this.gameBusy = true
    // get only save cards from first hand
    this.fiveCardsArrayTwo = this.fiveCardsArray.map(x => !x.active ? x : null)

    //clear unsaved carts from screen
    this.fiveCardsArray.map(x => !x.active ? x : x.destroy())

    // get save cards data
    this.saveCards = this.fiveCardsArrayTwo.filter(x => x != null ? x : null).map(card => card.name)

    // number of new cards
    this.numberOfNewCards = this.fiveCardsArrayTwo.filter(x => x == null).length

    //------ Generate new second hand card
    const uniqueNumbers = new Set()
    while (uniqueNumbers.size < this.numberOfNewCards) {
      let currentUniqNum = Phaser.Math.Between(0, 52)

      if (currentUniqNum == 52) {
        if (!this.saveCards.includes('Joker')) {
            uniqueNumbers.add(currentUniqNum)
        }
          continue
      } 
       
      if (!this.saveCards.includes(this.cardsObj[currentUniqNum])) {
        uniqueNumbers.add(currentUniqNum)
      }
    }

    const arrUniqNumbers = Array.from(uniqueNumbers)
    // generate cards
    for (let i = 0; i < this.fiveCardsArrayTwo.length; i++) {
      // check is array index have card
      if (this.fiveCardsArrayTwo[i]) continue

      let currentCard = arrUniqNumbers.shift()
      const cardXPos = [100, 290, 480, 670, 860]
      if (currentCard == 52) { //joker
        this.fiveCardsArrayTwo[i] = this.add.image(cardXPos[i], cfg.height / 2 + 20, 'Joker')
          .setScale(0.6)
          .setName('Joker')
          .setVisible(false)
      } else { //oder card
        this.fiveCardsArrayTwo[i] = this.add.image(cardXPos[i], cfg.height / 2 + 20, 'cards')
          .setScale(0.6)
          .setFrame(currentCard)
          .setName(this.cardsObj[currentCard])
          // .setInteractive()
          .setVisible(false)
      }
    }


    //restore scale position back card if card not hold 
    this.fiveCardsArrayTwo.map((x, i) => x.active ? this.fiveCardsBackArray[i].setScale(0.9) : x)

    //-------------Tween animation flip only no Hold cards
    this.tweens.add({
      targets: this.fiveCardsBackArray,
      scaleX: 0, // rotate back card
      duration: 400,
      ease: 'Linear',
      delay: 100,
      onStart: () => this.soundCardFan(),
      onComplete: (tween, targets) => {
        this.fiveCardsArrayTwo = this.fiveCardsArrayTwo.map(x => x.setVisible(true))
        this.tweens.add({
          targets: this.fiveCardsArrayTwo,
          scaleX: 0.6,
          onComplete: () => {      
            // console.log('front card rotation Done')
          }
        })
      }
    })

    //------------- set data to original cards array  
    this.fiveCardsArray = this.fiveCardsArrayTwo
    this.gameBusy = false
  }
  
 //-------------------------------function play sound and draw text 
  playSoundAndDrawTextCombination() {
    if (this.infoBetText.text.length > 0) {
      setTimeout(() => {
        const centerX = (cfg.width - this.infoBetText.width) / 2
        this.infoBetText.setX(centerX).setVisible(true)
        if (this.currentHand.text == ' First Hand ') {
          this.soundCheckFirstCombination()
        } else {
            if (this.handCounter == 2) { // prevent sound if reset game
              this.soundGetCombination()
              this.infoBetText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
            }
          }
      }, 500);
    }
  }

  //---------------------------------------Add Points to Credits
  addPointsToCredits() {
    if (Object.keys(this.winObj).includes(this.infoBetText.text)) {
        this.gameBusy = true
        let winPoints = this.winObj[this.infoBetText.text]['points']
        let interval = setInterval(() => {
            if (winPoints--) {
              cfg.global.credits += 1
              this.creditsText.setText(`CREDITS : ${cfg.global.credits}`)
              this.soundAddCreditPoints() 
            } else {
              clearInterval(interval) // Stop interval
              this.gameBusy = false
            }
        }, 7)
      
      let winIndex = this.textArray.find(x => x.name.includes(this.infoBetText.text))
      if (winIndex) winIndex.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000) 
     }
  }
  
 //-------------------------------function check Game Over
  checkGameOver() {
    console.log('Game Over');
    this.finishText.setVisible(false)
    this.creditsText.setText(`CREDITS : 0`)
    const ellipse = this.add.ellipse(cfg.width / 2 + 15, cfg.height / 2 + 10, 400, 120, 'black').setStrokeStyle().setDepth(1)
    this.text = fnc.createText(this, cfg.width / 3, cfg.height / 2 - 30, 'GAME OVER', 70, 'red',).setDepth(2)
    
    this.tweens.add({
      targets: this.text ,
      setScale: 1,
      duration: 600,
      delay: 1000,
      ease: 'Linear',
      repeat: -1, 
      yoyo: true, 
      onRepeat: (tween, targets) => {
        if (this.text.style.color === 'red') {
          this.text .setColor('white')
        } else {
          this.text .setColor('red')
        }
      }
    });
    
    
    
    
    
    
  }
   


  //==================================================================
  //------------------------------- function check is get combination
  checkCardsCombination() {
    //check if all cards have same suit
    const firstCardSuit = this.fiveCardsArray.filter(card => card.name != 'Joker')[0].name.slice(-1)
    const isOneSuit = this.fiveCardsArray.every(card => card.name == 'Joker' || card.name.slice(-1) == firstCardSuit)

    // get cards
    const cards = this.fiveCardsArray.map(card => (card.name == 'Joker' ? 'Joker' : card.name.slice(0, -1)))
    
    // sort cards by numbers add number format for card J, Q, K, A
    let sortedCardsByNumbers = cards.map(x => {
      if (x == 'J') return 11
      if (x == 'Q') return 12
      if (x == 'K') return 13
      if (x == 'A') return 14
      return isNaN(x) ? x : Number(x)
    }).sort((a, b) => a - b)

    // check is has Joker in card
    const isHasJoker = cards.includes('Joker')
  
    // get uniqueCards  
    const uniqueCards = [...new Set(cards)]
    let result = ''
    //--------------------------------------------Jacks of Better
    if (this.jacksOfBetter(cards, isHasJoker)) result = 'Jacks or Better'
    //--------------------------------------------Two Pair
    if (this.twoPair(sortedCardsByNumbers, isHasJoker)) result = 'Two Pair'
    //--------------------------------------------Three of a Kind
    if(this.threeOfKind(sortedCardsByNumbers, isHasJoker)) result = 'Three of a Kind'
    //---------------------------------------------Straight
    if(this.straight(sortedCardsByNumbers,uniqueCards, isHasJoker)) result = 'Straight'
    // --------------------------------------------Flush / боя
    if(this.flush(isOneSuit)) result = 'Flush'
    // --------------------------------------------Full House
    if(this.fullHouse(sortedCardsByNumbers, isHasJoker)) result = 'Full House'
    // ------------------------------------------- Four of a Kind
    if(this.fourOfKind(sortedCardsByNumbers, isHasJoker)) result = 'Four of a Kind'
    // ------------------------------------------- Straight Flush 
    if(this.straightFlush(isOneSuit, uniqueCards, sortedCardsByNumbers, isHasJoker)) result = 'Straight Flush'
    //-------------------------------------------- Royal Flush
    if(this.royalFlush(isOneSuit, uniqueCards, isHasJoker)) result = 'Royal Flush'
     
    this.infoBetText.setText(result) 
  }

  // ---function  Royal Flush
  royalFlush(isOneSuit, uniqueCards, isHasJoker) {
    //Royal Flush
    if (isOneSuit && uniqueCards.length == 5 && ['10', 'J', 'Q', 'K', 'A'].every(v => uniqueCards.includes(v))) {
      console.log('Royal Flush');
      return 'Royal Flush'
    }

    //Royal Flush with Joker
    if (isOneSuit && uniqueCards.length == 5 && isHasJoker) {
      const missingCard = uniqueCards.map(card => ['10', 'J', 'Q', 'K', 'A', 'Joker'].includes(card)).every(x => x == true)
      if (missingCard) {
        console.log('Royal Flush with Joker')
        return 'Royal Flush'
      }
    }
  }

  // ---function Straight Flush
  straightFlush(isOneSuit, uniqueCards, sortedCardsByNumbers, isHasJoker) {

    if (isHasJoker) {
      // out joker form cards
      let sortCardsNoJoker = sortedCardsByNumbers.filter(x => x != 'Joker').sort((a,b) => a - b)
    
      //---------- Search for a card that is missing between adjacent cards in the sorted array
      let missingCard = null;
      for (let i = 0; i < sortCardsNoJoker.length - 1; i++) {
        if (sortCardsNoJoker[i + 1] - sortCardsNoJoker[i] > 1) {
          missingCard = sortCardsNoJoker[i] + 1
          break
        }
      }
           
      if (missingCard) {
         //------- find missing card and put to array and sort 
        sortCardsNoJoker.push(missingCard)
        sortCardsNoJoker = sortCardsNoJoker.sort((a,b) => a - b)
        //  console.log('find missing card ', missingCard);
      } else {
        //-------- put in first position missing cards - 1 of second card value
         sortCardsNoJoker.unshift(sortCardsNoJoker[0] - 1)
        //  console.log('no missing card' , missingCard);
        }

      
        sortedCardsByNumbers = sortCardsNoJoker
    }
    // check isStraightFlush
    const isStraightFlush = sortedCardsByNumbers[4] - sortedCardsByNumbers[0] == 4

    //---------Straight Flush
    if (isOneSuit && uniqueCards.length == 5 && isStraightFlush) {
     console.log(isHasJoker ? 'Straight Flush with Joker' : 'Straight Flush')
     return 'Straight Flush'
    }
  }

  //---function Four of a Kind
  fourOfKind(sortedCardsByNumbers, isHasJoker) {
     const cardCounts = {}
  
    for (const card of sortedCardsByNumbers) {
      cardCounts[card] = (cardCounts[card] || 0) + 1
    }

    const values = Object.values(cardCounts)

    // // Four Of Kind
    if (values.includes(4)) {
      console.log('Four of a Kind')
      return 'Four of a Kind'
    }

    //  Four Of Kind with Joker
    if (isHasJoker && values.includes(3)) {
      console.log('Four of a Kind with Joker')
      return 'Four of a Kind'
    }
  }

  //---function  Full House
  fullHouse(sortedCardsByNumbers, isHasJoker) {
    const cardCounts = {}
    for (const card of sortedCardsByNumbers) {
      cardCounts[card] = (cardCounts[card] || 0) + 1
    }

    const values = Object.values(cardCounts)

    // Full house
    if (values.includes(3) && values.includes(2)) {
      console.log('Full House')
      return 'Full House'
    }

    //  Full House with Joker
    const isTwoParts = values.filter(x => x == 2).length == 2
    if (isHasJoker && isTwoParts) {
      console.log('Full House with Joker')
      return 'Full House'
    }
  }

  //----function  Flush /cards one Suit 
  flush(isOneSuit) {
    if (isOneSuit) {
      console.log('Flush one Suit')
      return 'Flush'
    }

  }

  //-----function  Straight  /five different cards in a row
  straight(sortedCardsByNumbers, uniqueCards, isHasJoker) {
    if (isHasJoker && uniqueCards.length == 5) {
      // out joker form cards
      let sortCardsNoJoker = sortedCardsByNumbers.filter(x => x != 'Joker').sort((a,b) => a - b)
    
      //---------- Search for a card that is missing between adjacent cards in the sorted array
      let missingCard = null;
      for (let i = 0; i < sortCardsNoJoker.length - 1; i++) {
        if (sortCardsNoJoker[i + 1] - sortCardsNoJoker[i] > 1) {
          missingCard = sortCardsNoJoker[i] + 1
          break
        }
      }
           
      if (missingCard) {
         //------- find missing card and put to array and sort 
        sortCardsNoJoker.push(missingCard)
        sortCardsNoJoker = sortCardsNoJoker.sort((a,b) => a - b)
        //  console.log('find missing card ', missingCard);
      } else {
        //-------- put in first position missing cards - 1 of second card value
         sortCardsNoJoker.unshift(sortCardsNoJoker[0] - 1)
        //  console.log('no missing card' , missingCard);
        }
        sortedCardsByNumbers = sortCardsNoJoker
    }
   
    // check isStraight
    const isStraight = sortedCardsByNumbers[4] - sortedCardsByNumbers[0] == 4

    if (isStraight && uniqueCards.length == 5) {
      console.log(isHasJoker ? 'Straight with Joker' : 'Straight')
      return 'Straight'
    }
  }

  //-----function Three of a Kind
  threeOfKind(sortedCardsByNumbers, isHasJoker) {
    const cardCounts = {}
   
    for (const card of sortedCardsByNumbers) {
      cardCounts[card] = (cardCounts[card] || 0) + 1
    }

    const values = Object.values(cardCounts)

    // Three Of Kind
    if (values.includes(3)) {
      console.log('Three of Kind')
      return 'Three of a Kind'
    }

    // Three Of Kind with Joker
    if (isHasJoker && values.includes(2)) {
      console.log('Three of Kind with Joker')
      return 'Three of a Kind'
    }

  }

  //-----function Two Pair
  twoPair(sortedCardsByNumbers, isHasJoker) {
    const cardCounts = {}
   
    for (const card of sortedCardsByNumbers) {
      cardCounts[card] = (cardCounts[card] || 0) + 1
    }

    const values = Object.values(cardCounts)
    const isTwoParts = values.filter(x => x == 2).length == 2

    // Two Pair
    if (isTwoParts) {
      console.log('Two Pair')
      return 'Two Pair'
    }

    // Two Pair with Joker  NEWER BE REACHED!
    if (isHasJoker && values.includes(1) && values.includes(2)) {
      console.log('Two Pair with Joker')
      return 'Two Pair'
    }
  }

  //------function Jacks of Better
  jacksOfBetter(cards, isHasJoker) {
    const cardCounts = {}
  
    for (const card of cards) {
      if (['J', 'Q', 'K', 'A'].includes(card)) {
        cardCounts[card] = (cardCounts[card] || 0) + 1
      }
    }

    const values = Object.values(cardCounts)

    // Jacks of Better
    if (values.includes(2)) {
      console.log('Jacks or Better')
      return 'Jacks or Better'
    }

    // Jacks of Better with Joker
    if (isHasJoker && values.includes(1)) {
      console.log('Jacks or Better with Joker')
      return 'Jacks or Better'
    }

  }

};