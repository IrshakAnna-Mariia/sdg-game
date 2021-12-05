import Phaser from 'phaser';

export default class Inventory extends Phaser.Scene {
    constructor() {
        super({ key: 'game-menu' });
    }
     preload() {


        //this.load.image('btn', '../Assets/btn.png');
    }
    create() {

       // this.add.image(128,window.innerHeight-54, 'btn').setScale(1.2);
        
  //   	let pl = this.add.image(128, 128, 'player');
  //   	pl.setScale(0.1)

		// this.cameras.main.setRenderToTexture(this.customPipeline)
		// this.cameras.main.ignore(pl)
		//extracam.ignore(volcano)
    }

}