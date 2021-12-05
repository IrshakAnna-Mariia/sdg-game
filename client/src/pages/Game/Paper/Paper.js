import Scene from '../Scene.js';
import Phaser from 'phaser';
let self;
export default class Paper extends Phaser.Scene {
    constructor() {
        super({ key: 'game-paper' });
    }
    preload() {
        this.load.image('full_paper1', '../Assets/paper2.png');
        this.load.plugin('rexkawaseblurpipelineplugin', 'rexkawaseblurpipelineplugin.min.js', true);
    }
    create() {
        self = this;
    }

    showPaper = (ph) => {
        self.scene.stop('game-ui');
        ph.cameras.main.fadeIn(2000, 0, 0, 0);
        let cam = ph.cameras.main;
        let postFxPlugin2 = self.plugins.get('rexkawaseblurpipelineplugin');
        self.postFxPipeline = postFxPlugin2.add(ph.cameras.main, {
            blur: 4,
            quality: 3
        });
        self.paper = self.add.image(window.innerWidth / 2, window.innerHeight / 2, "full_paper1");
        let percentSize = self.paper.height / self.paper.width;
        self.paper.displayWidth = window.innerWidth / 1.5;
        self.paper.displayHeight = self.paper.displayWidth * percentSize;
    }
    removePaper = (ph) => {
        self.plugins.get('rexkawaseblurpipelineplugin').remove(ph.cameras.main);
        self.paper.destroy();
    }
}