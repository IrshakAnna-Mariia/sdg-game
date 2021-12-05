import Server from './server/Server.js';
import Inventory from './Inventory/inventory.js';
import Adaptive from './Adaptive/detect.js';
import MobileJoystick from './Control/MobileJoystick.js';
import Paper from './Paper/Paper.js';
import Phaser from 'phaser';
let self;
export default class Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'game-main' });
    }
    preload() {        
        this.Server = new Server();
        this.Adaptive = new Adaptive();
        this.Adaptive.mobile();
        this.speed = 200;
        this.load.image('tiles', 'Assets/tileset x1.png');
        this.load.tilemapTiledJSON('tilemap', 'tilemap.json');
        this.load.atlas('faune', 'player/texture.png', 'player/texture.json');
        this.load.atlas('treasure', 'treasure/texture.png', 'treasure/texture.json');
        this.load.atlas('arcade', 'Assets/arcade-joystick.png', 'arcade-joystick.json');
        this.load.image('grid', 'Assets/grid.png');
        this.load.image('sw', 'textures/tile050.png');
        this.load.image('sw2', 'textures/tile083.png');
        this.load.image('paper1', 'Assets/paper1.png');
        this.load.plugin('rexvirtualjoystickplugin', 'virtualjoystickplugin.min.js', true);
        this.load.plugin('rexoutlinepipelineplugin', 'Outline/rexoutlinepipelineplugin.min.js', true);
    }

    create() {
        this.outline = true;
        this.is_floor = true;
        this.is_paper = false;
        this.scene.run('game-menu');
        this.scene.run('game-ui');
        this.scene.run('game-paper');
        this.postFxPlugin = this.plugins.get('rexoutlinepipelineplugin');
        const KeyCodes = Phaser.Input.Keyboard.KeyCodes;
        this.cursor = this.input.keyboard.addKeys({ up: KeyCodes.W, down: KeyCodes.S, left: KeyCodes.A, right: KeyCodes.D, interaction: KeyCodes.F });
        this.map = this.make.tilemap({ key: 'tilemap' });
        const tileset = this.map.addTilesetImage('tileset x1', 'tiles')
        this.map.createLayer('Floor', tileset);
        this.FloorA2 = this.map.createLayer('FloorA2', tileset);
        this.FloorA1 = this.map.createLayer('FloorA1', tileset);
        const wallsLayer2 = this.map.createLayer('Wall2', tileset);
        wallsLayer2.setCollisionByProperty({ colider: true });
        const wallsLayer = this.map.createLayer('Wall', tileset)
        wallsLayer.setCollisionByProperty({ colider: true });
        this.Paper = new Paper();
        this.Inventory = new Inventory();
        this.Inventory.initialization(this);
        this.MobileJoystick = new MobileJoystick();
        this.MobileJoystick.getThis(this);
        if (window.mobileAndTabletCheck()) {
           // this.ismobile = true;
            //this.scene.run('game-control');
        }
        self = this;


        // const debugGraph = this.add.graphics().setAlpha(0.7);
        // wallsLayer.renderDebug(debugGraph,{
        //  tileColor:null,
        //  collidingTileCOlor: new Phaser.Display.Color(243,234,48,255),
        //  faceColor: new Phaser.Display.Color(40,39,37,255)
        // })
        // wallsLayer2.renderDebug(debugGraph,{
        //  tileColor:null,
        //  collidingTileCOlor: new Phaser.Display.Color(243,234,48,255),
        //  faceColor: new Phaser.Display.Color(40,39,37,255)
        // })

        //PLAYER
        this.faune = this.physics.add.sprite(128, 128, 'faune', 'run-down-1.png')

        this.physics.add.collider(this.faune, wallsLayer);
        this.physics.add.collider(this.faune, wallsLayer2);
        //this.physics.add.overlap(this.FloorA1, this.faune, this.handlePlayerFloorCollision);


        this.faune.setDepth(4);
        this.faune.body.setSize(this.faune.width * 0.5, this.faune.height * 0.55);
        this.faune.body.setOffset(this.faune.width / 4, this.faune.height / 2);

        this.anims.create({
            key: 'faune-idle-down',
            frames: [{ key: 'faune', frame: 'tile006.png' }]
        })
        this.anims.create({
            key: 'faune-run-down',
            frames: this.anims.generateFrameNames('faune', { start: 6, end: 8, prefix: 'tile00', suffix: '.png' }),
            repeat: -1,
            frameRate: 15
        });
        this.anims.create({
            key: 'faune-run-up',
            frames: this.anims.generateFrameNames('faune', { start: 0, end: 2, prefix: 'tile00', suffix: '.png' }),
            repeat: -1,
            frameRate: 15
        });
        this.anims.create({
            key: 'faune-run-side',
            frames: this.anims.generateFrameNames('faune', { start: 9, end: 11, prefix: 'tile00', suffix: '.png' }),
            repeat: -1,
            frameRate: 15
        });
        this.anims.create({
            key: 'chest-open',
            frames: this.anims.generateFrameNames('treasure', { start: 0, end: 2, prefix: 'chest_empty_open_anim_f', suffix: '.png' }),
            frameRate: 15
        });

        this.faune.anims.play('faune-run-down');
        //PLAYER

        this.chests = this.physics.add.staticGroup();
        this.sword = this.physics.add.staticGroup();
        this.paper = this.physics.add.staticGroup();
        const chestsLayer = this.map.getObjectLayer('Chests');
        chestsLayer.objects.forEach(chestObj => {
            this.chests.get((chestObj.x + chestObj.width * 0.5), chestObj.y - chestObj.height * 0.5, 'treasure', 'chest_empty_open_anim_f0.png');
        });
        this.chests.children.entries.forEach((child) => {
            child.body.setSize(child.width * 3.5, child.height * 3.5);
        });

        // const swordLayer = this.map.getObjectLayer('Sword');
        // swordLayer.objects.forEach(sworddObj => {
        //     sworddObj.properties.forEach(item => {
        //         this.sword.get((sworddObj.x + sworddObj.width * 0.5), sworddObj.y - sworddObj.height * 0.5, item.value);
        //     })
        // });
        const paperLayer = this.map.getObjectLayer('Paper');
        paperLayer.objects.forEach(paperObj => {

            paperObj.properties.forEach(item => {
                this.paper.get((paperObj.x + paperObj.width * 0.5), paperObj.y - paperObj.height * 0.5, item.value);

            })
            this.paper.children.entries.forEach((child) => {
                child.body.setSize(child.width * 3.5, child.height * 3.5);
            });
        });

        this.sword.setDepth(3);
        this.sword.children.entries.forEach((child) => {
            child.angle = -21;
        });
        this.physics.add.overlap(this.sword, this.faune, this.handlePlayerChestCollision);
        this.physics.add.overlap(this.paper, this.faune, this.handlePlayerChestCollision);

        this.physics.add.collider(this.faune, this.chests, this.handlePlayerChestCollision, undefined, this);

        this.cameras.main.startFollow(this.faune, true);
        //const chest = this.add.sprite(64,64,'treasure','treasure/chest_empty_open_anim_f0.png');

        //chest.play('chest-open')
        let isOpenInv = false;
        window.addEventListener('keyup', async (e) => {
            //console.log(e.keyCode)
            // if (e.keyCode == 73) {
            //     if(isOpenInv) {this.scene.stop('game-ui'); isOpenInv = false; } else {this.scene.run('game-ui'); isOpenInv = true }
            // }
            if (e.keyCode == 70) {
                if (this.is_paper) {
                    this.Paper.removePaper(this);
                    this.scene.run('game-ui');
                }
                this.chests.children.entries.forEach((child) => {
                    const dist = Phaser.Math.Distance.BetweenPoints(this.faune, child);
                    if (dist <= 50) {
                        child.play('chest-open');
                    	console.log(child.texture.key)
                        this.Inventory.addItem(child.texture.key, this);
                        //child.destroy();
                        //const data = {}
                        //this.Server.requestData(`/game/api/testapi/`)
                    }
                });
                this.sword.children.entries.forEach((child) => {
                    const dist = Phaser.Math.Distance.BetweenPoints(this.faune, child);
                    if (dist <= 50) {
                    	console.log(child.texture.key)

                        this.Inventory.addItem(child.texture.key, this);
                        child.destroy();
                        // if (this.helptxt) {
                        //     this.helptxt.destroy();
                        // }
                    }
                });
                this.paper.children.entries.forEach((child) => {

                    const dist = Phaser.Math.Distance.BetweenPoints(this.faune, child);
                    if (dist <= 50) {
                        //this.Inventory.addItem(child.texture.key, this);

                        this.is_paper = true;
                        this.Paper.showPaper(this);
                        child.destroy();

                        // if (this.helptxt) {
                        //     this.helptxt.destroy();
                        // }
                    }
                });
            }
        });
        this.cameras.main.setZoom(1.5);
    }



    handlePlayerChestCollision = (obj1, obj2) => {

        // if (this.helptxt) {
        //     this.helptxt.destroy();
        // }
        // const style = { font: "bold 12px Arial", fill: "#fff" };
        // var graphics = this.add.graphics();
        // var color = 0xff0000;
        // var thickness = 2;
        // var alpha = 1;
        // var radius = 50;
        // graphics.lineStyle(thickness, color, alpha);
        // var a = new Phaser.Geom.Point(400, 300);
        if (this.outline) {
            this.postFxPlugin.add(obj2, {
                thickness: 3,
                outlineColor: 0xff8a50
            });
            this.outline = false;
        }


        // this.helptxt = graphics.strokeCircle(obj2.x, obj2.y, 50);
        // //this.add.text(obj2.x - obj2.width, obj2.y - 24, `Press F`, style);
        // this.helptxt.setDepth(5);
        if (obj2.texture.key == "treasure") {
            obj2.body.setSize(obj2.width, obj2.height)
        }
        const timeout = setInterval(() => {
            // this.helptxt.setRadius(radius);
            // radius--;
            const destroyDist = Phaser.Math.Distance.BetweenPoints(obj1, obj2);
            if (destroyDist >= 50) {
                // this.helptxt.destroy();
                this.outline = true;
                this.postFxPlugin.remove(obj2);
                if (obj2.texture.key == "treasure") {
                    obj2.body.setSize(obj2.width * 3.5, obj2.height * 3.5);
                }
                clearInterval(timeout);
            }
        }, 100)


        //this.helptxt.setScrollFactor(0.7);

        //obj2.play("chest-open");
        //console.log("obj2.body.blocked");
        //this.input.keyboard.on('keydown', function (event) {
        //console.log(event);
        //});


    }



    update() {
        if (!this.cursor || !this.faune || this.ismobile) {
            return
        }
        if (this.is_floor) {
            if (this.FloorA1.getTileAtWorldXY(this.faune.x, this.faune.y)) {
                this.FloorA1.destroy();
                this.is_floor = false;
            }
        }

        if (this.cursor.left.isDown) {
            this.faune.setVelocity(-this.speed, 0);
            this.faune.anims.play('faune-run-side', true);
            this.faune.setFlipX(true);
        } else if (this.cursor.right.isDown) {
            this.faune.setVelocity(this.speed, 0);
            this.faune.anims.play('faune-run-side', true);
            this.faune.setFlipX(false);
        } else if (this.cursor.up.isDown) {
            this.faune.setVelocity(0, -this.speed);
            this.faune.anims.play('faune-run-up', true);
        } else if (this.cursor.down.isDown) {
            this.faune.setVelocity(0, this.speed);
            this.faune.anims.play('faune-run-down', true);

        } else {
            this.faune.anims.play('faune-run-down');
            this.faune.setVelocity(0, 0);

        }




    }

}