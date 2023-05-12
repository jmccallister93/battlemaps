import React, { useRef, useEffect } from "react";
import Phaser from "phaser";
import p5 from "p5";

import dirt1Image from "../assets/dirt/Dirt 1 .png";
import dirt2Image from "../assets/dirt/Dirt2.png";
import dirt3Image from "../assets/dirt/Dirt 3 .png";
import dirt4Image from "../assets/dirt/Dirt 4 .png";
import dirt5Image from "../assets/dirt/Dirt 5 .png";
import dirt6Image from "../assets/dirt/Dirt 6 .png";
import dirt7Image from "../assets/dirt/Dirt 7 .png";
import dirt8Image from "../assets/dirt/Dirt 8 .png";
import dirt9Image from "../assets/dirt/Dirt 9 .png";
import dirt10Image from "../assets/dirt/Dirt 10 .png";
import dirt11Image from "../assets/dirt/dirt11.jpg";
import grass1Image from "../assets/grass/grass1.png";
import grass2Image from "../assets/grass/grass2.jpg";
import grass3Image from "../assets/grass/grass3.jpg";
import grass4Image from "../assets/grass/grass4.jpg";
import grass5Image from "../assets/grass/grass5.png";
import grass6Image from "../assets/grass/grass6.png";
import grass7Image from "../assets/grass/grass7.png";
import grass8Image from "../assets/grass/grass8.png";
import grass9Image from "../assets/grass/grass9.png";

import grass11Image from "../assets/grass/grass11.png";
import grass12Image from "../assets/grass/grass12.png"

const PhaserScene = (props) => {
  const phaserContainerRef = useRef(null);

  useEffect(() => {
    // Create a new Phaser scene
    class MyScene extends Phaser.Scene {
      constructor() {
        super("my-scene");
      }

      preload() {
        this.load.image("dirt1", dirt1Image);
        this.load.image("dirt2", dirt2Image);
        this.load.image("dirt3", dirt3Image);
        this.load.image("dirt4", dirt4Image);
        this.load.image("dirt5", dirt5Image);
        this.load.image("dirt6", dirt6Image);
        this.load.image("dirt7", dirt7Image);
        this.load.image("dirt8", dirt8Image);
        this.load.image("dirt9", dirt9Image);
        this.load.image("dirt10", dirt10Image);
        this.load.image("dirt11", dirt11Image);
        this.load.image("grass1", grass1Image);
        this.load.image("grass2", grass2Image);
        this.load.image("grass3", grass3Image);
        this.load.image("grass4", grass4Image);
        this.load.image("grass5", grass5Image);
        this.load.image("grass6", grass6Image);
        this.load.image("grass7", grass7Image);
        this.load.image("grass8", grass8Image);
        this.load.image("grass9", grass9Image);
     
        this.load.image("grass11", grass11Image);
        this.load.image("grass12", grass12Image);
      }

      create() {
        const tileSize = 32; // Size of each tile in pixels
        const numTiles = 32; // Number of tiles in the scene

        const sceneWidth = tileSize * numTiles; // Calculate the width of the scene
        const sceneHeight = tileSize * numTiles; // Calculate the height of the scene

        this.cameras.main.setSize(800, 800); // Set the size of the camera to match the scene

        //Set grass tiles arrays
        const grassTiles = [
          "grass1",
        //   "grass2",
        //   "grass3",
        //   "grass4",
        //   "grass5",
        //   "grass6",
        //   "grass7",
        //   "grass8",
        //   "grass9",
        //   "grass11",
          "grass12"
        ];
        const dirtTiles = [
          "dirt1",
          "dirt2",
          "dirt3",
          "dirt4",
          "dirt5",
          "dirt6",
          "dirt7",
          "dirt8",
          "dirt9",
          "dirt11",
        ];

        const sketch = new p5();
        for (let row = 0; row < numTiles; row++) {
            for (let col = 0; col < numTiles; col++) {
              const tileX = col * tileSize;
              const tileY = row * tileSize;
              const terrainNoise = sketch.noise(col / 10, row / 10); // Scale the coordinates to control the "frequency" of the noise
              const textureNoise = sketch.noise((col + 100) / 10, (row + 100) / 10); // Offset the coordinates to get a different noise value
              
              let tileType;
              if (terrainNoise < 0.5) {
                const textureIndex = Math.floor(textureNoise * grassTiles.length);
                tileType = grassTiles[textureIndex];
              } else {
                const textureIndex = Math.floor(textureNoise * dirtTiles.length);
                tileType = dirtTiles[textureIndex];
              }
          
              this.add.image(tileX, tileY, tileType).setOrigin(0);
            }
          }
      }
    }
    // Create a new Phaser game instance
    const game = new Phaser.Game({
      // Use the Phaser.AUTO renderer
      type: Phaser.AUTO,
      // Attach the game to the ref's current property (DOM element)
      parent: phaserContainerRef.current,
      // Set the width and height of the game
      width: 800, // Replace with your desired width
      height: 800, // Replace with your desired height
      // Define the scene configuration
      scene: [MyScene],
    });

    // Clean up the Phaser game instance when the component unmounts
    return () => {
      game.destroy(true);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div ref={phaserContainerRef} style={{ width: "100%", height: "100%" }} />
  );
};

export default PhaserScene;
