import React, { useRef, useEffect } from "react";
import Phaser from "phaser";
import p5 from "p5";
import grass5 from "../assets/Grass/Grass_05-128x128.png"
import grass8 from "../assets/Grass/Grass_08-128x128.png"
import grass21 from "../assets/Grass/Grass_21-128x128.png"
import dirt1 from "../assets/Dirt/Dirt_01-128x128.png"
import dirt2 from "../assets/Dirt/Dirt_02-128x128.png"
import dirt9  from "../assets/Dirt/Dirt_09-128x128.png"


const PhaserScene = (props) => {
  const phaserContainerRef = useRef(null);

  useEffect(() => {
    // Create a new Phaser scene
    class MyScene extends Phaser.Scene {
      constructor() {
        super("my-scene");
      }

      preload() {
        this.load.image("dirt1", dirt1);
        this.load.image("dirt2", dirt2);
        this.load.image("dirt9", dirt9);
        this.load.image("grass5", grass5);
        this.load.image("grass8", grass8);
        this.load.image("grass21", grass21);
      
      }

      create() {
        const tileSize = 32; // Size of each tile in pixels
        const numTiles = 32; // Number of tiles in the scene

        const sceneWidth = tileSize * numTiles; // Calculate the width of the scene
        const sceneHeight = tileSize * numTiles; // Calculate the height of the scene

        this.cameras.main.setSize(800, 800); // Set the size of the camera to match the scene

        //Set grass tiles arrays
        const grassTiles = [
          "grass5",
          "grass8",
          "grass21"
        //   "grass3",
        //   "grass4",
        //   "grass5",
        //   "grass6",
        //   "grass7",
        //   "grass8",
        //   "grass9",
        //   "grass11",
          // "grass12"
        ];
        const dirtTiles = [
          "dirt1",
          "dirt2",
          "dirt9"
          // "dirt3",
          // "dirt4",
          // "dirt5",
          // "dirt6",
          // "dirt7",
          // "dirt8",
          // "dirt9",
          // "dirt11",
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
