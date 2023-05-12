import React, { useRef, useEffect } from "react";
import Phaser from "phaser";
import p5 from "p5";
import grass5 from "../assets/GrassTile/Grass_05-128x128.png";
import grass8 from "../assets/GrassTile/Grass_08-128x128.png";
import grass21 from "../assets/GrassTile/Grass_21-128x128.png";
import dirt1 from "../assets/DirtTile/Dirt_01-128x128.png";
import dirt2 from "../assets/DirtTile/Dirt_02-128x128.png";
import dirt9 from "../assets/DirtTile/Dirt_09-128x128.png";
import treeTop1 from "../assets/TreeTops/Tree - Isometric - Small - Green 2.png";
import bareTree1 from "../assets/TreeTops/Bare tree - Large A.png";
import mossyBoulder1 from "../assets/ForestFloor/Mossy Boulder 1 - Green 1.png"
import rock1 from "../assets/Camp/Rock, 1.png"
import rock2 from "../assets/Camp/Rock, 2.png"
import rock3 from "../assets/Camp/Rock, 3.png"
import rock4 from "../assets/Camp/Rock, outcrop.png"
import rock5 from "../assets/Camp/Rock, small, 1.png"
import rock6 from "../assets/Camp/Rock, small, 2.png"



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
        this.load.image("treeTop1", treeTop1);
        this.load.image("bareTree1", bareTree1);
        this.load.image("mossyBoulder1", mossyBoulder1);
        this.load.image("rock1", rock1)
        this.load.image("rock2", rock2)
        this.load.image("rock3", rock3)
        this.load.image("rock4", rock4)
        this.load.image("rock5", rock5)
        this.load.image("rock6", rock6)
      }

      create() {
        const tileSize = 32; // Size of each tile in pixels
        const numTiles = 32; // Number of tiles in the scene

        const sceneWidth = tileSize * numTiles; // Calculate the width of the scene
        const sceneHeight = tileSize * numTiles; // Calculate the height of the scene

        this.cameras.main.setSize(800, 800); // Set the size of the camera to match the scene

        //Set Asset Arrays
        const grassTiles = ["grass5", "grass8", "grass21"];
        const dirtTiles = ["dirt1", "dirt2", "dirt9"];
        const rockAssets = ["rock1", "rock2","rock3","rock4","rock5","rock6",]

        //Set Asset Sizing
        const assetSize = 256;
        const assetBaseScale = tileSize / assetSize; // Calculate the scale
        const scaleVariation = 0.3; // The maximum amount the scale can vary from the base


        const sketch = new p5();
        for (let row = 0; row < numTiles; row++) {
          for (let col = 0; col < numTiles; col++) {
            const tileX = col * tileSize;
            const tileY = row * tileSize;
            const terrainNoise = sketch.noise(col / 10, row / 10); // Scale the coordinates to control the "frequency" of the noise
            const textureNoise = sketch.noise(
              (col + 100) / 10,
              (row + 100) / 10
            ); // Offset the coordinates to get a different noise value

            let tileType;
            if (terrainNoise < 0.5) {
              const textureIndex = Math.floor(textureNoise * grassTiles.length);
              tileType = grassTiles[textureIndex];
              //Tree Assets
              if (Math.random() < 0.05) {
                const randomScale = assetBaseScale + Math.random() * scaleVariation - (scaleVariation / 2);
                this.add
                  .image(tileX, tileY, "treeTop1")
                  .setOrigin(0)
                  .setScale(randomScale)
                  .setDepth(1)
              }
              if (Math.random() < 0.01) {
                this.add
                  .image(tileX, tileY, "mossyBoulder1")
                  .setOrigin(0)
                  .setScale(assetBaseScale * 2)
                  .setDepth(1)
              }
            } else {
              const textureIndex = Math.floor(textureNoise * dirtTiles.length);
              tileType = dirtTiles[textureIndex];
              //Rock Assets
              rockAssets.forEach((rockAsset) => {
                if (Math.random() < 0.01) {
                  const randomRotation = Math.random() * 360;
                  const randomScale = assetBaseScale + Math.random() * scaleVariation - (scaleVariation / 2);
                  this.add
                    .image(tileX, tileY, rockAsset)
                    .setOrigin(0)
                    .setScale(randomScale)
                    .setDepth(1)
                    .setAngle(randomRotation);
                }
              });
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
