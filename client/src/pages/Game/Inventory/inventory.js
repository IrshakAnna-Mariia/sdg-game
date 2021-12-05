import Server from '../server/Server.js';
import Phaser from 'phaser';

const inventoryItems = []
let self;
export default class Inventory extends Phaser.Scene {
    constructor() {
        super({ key: 'game-ui' });        
    }
    preload(){
            this.load.image('resistor', `../Assets/resistor.png`);
    }
    create() {
        self = this;        
        this.Server = new Server();
        const invent = this.add.group({
            classtype: Phaser.GameObjects.Image,
            key: 'grid',
            quantity: 6
        });
     
        // this.cameras.main.fadeOut(600);
        // this.cameras.main.fadeIn(600);
        // x: window.innerWidth/2 - 64,
        // y: window.innerHeight/2 - 64
    


        
        Phaser.Actions.GridAlign(invent.getChildren(), {
            width: 6,
            height: 1,
            cellWidth: 64,
            cellHeight: 64,
            x: window.innerWidth / 2 - (2*64),
            y: window.innerHeight - 32
        });
  



    }
    render = (ph)=>{        
        inventoryItems.forEach((child,index)=>{            
            const itemImg = self.add.image(window.innerWidth / 2 - (3*64) + ((index+1) * 64),window.innerHeight - 36,'resistor');
            itemImg.angle = 0;
            itemImg.setScale(0.08);
        });

    }
    addItem = async (key, ph) => {
        const item = await ph.Server.requestData(`/game/api/inventory/get/${key}`);
        inventoryItems.push(item); 
        this.render(ph);       
    }

    initialization = async (ph) => {        
        const res = await ph.Server.requestData('/game/api/inventory/get-all')        
        if (res) {
            inventoryItems = [...res]
        }
        this.render(ph)
    }


}