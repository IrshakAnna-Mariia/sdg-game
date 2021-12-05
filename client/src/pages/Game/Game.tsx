import React from "react";
import  "phaser";
import Scene from "./Scene";
import { IonPhaser } from '@ion-phaser/react'
// import MobileJoystick from "./Control/MobileJoystick";
import Inventory from "./Inventory/inventory";
import Paper from "./Paper/Paper";



const Game = () => {

    const initialize = true    

    const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: '#262626',        
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }
            }
        },
        scene: [Scene, Inventory, Paper]
    };


    



    return (
        <IonPhaser game={config} initialize={initialize} />
    )
}

export default Game;