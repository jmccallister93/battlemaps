import React, { useRef, useEffect, useState } from "react";
import Phaser from "phaser";
import p5 from "p5";
import grass5 from "../assets/GrassTile/Grass_05-128x128.png";
import grass8 from "../assets/GrassTile/Grass_08-128x128.png";
import grass21 from "../assets/GrassTile/Grass_21-128x128.png";
import dirt1 from "../assets/DirtTile/Dirt_01-128x128.png";
import dirt2 from "../assets/DirtTile/Dirt_02-128x128.png";
import dirt9 from "../assets/DirtTile/Dirt_09-128x128.png";
import treeTop1 from "../assets/TreeTops/Tree - Isometric - Small - Green 2.png";
import treeTop2 from "../assets/TreeTops/Tree - Isometric - Small - Green 2.png";
import treeTop3 from "../assets/TreeTops/Tree - Isometric - Small - Green 3.png";
import bareTree1 from "../assets/TreeTops/Bare tree - Large A.png";
import mossyBoulder1 from "../assets/ForestFloor/Mossy Boulder 1 - Green 1.png";
import rock1 from "../assets/Camp/Rock, 1.png";
import rock2 from "../assets/Camp/Rock, 2.png";
import rock3 from "../assets/Camp/Rock, 3.png";
import rock4 from "../assets/Camp/Rock, outcrop.png";
import rock5 from "../assets/Camp/Rock, small, 1.png";
import rock6 from "../assets/Camp/Rock, small, 2.png";

const PhaserScene = (props) => {
  const phaserContainerRef = useRef(null);
  const gameRef = useRef(null);
  const [seed,setSeed] = useState(Math.random())

  useEffect(() => {
    // Create a new Phaser scene
    class MyScene extends Phaser.Scene {
      constructor() {
        super({ key: "myScene" });
      }

      preload() {
        this.load.image("dirt1", dirt1);
        this.load.image("dirt2", dirt2);
        this.load.image("dirt9", dirt9);
        this.load.image("grass5", grass5);
        this.load.image("grass8", grass8);
        this.load.image("grass21", grass21);
        this.load.image("treeTop1", treeTop1);
        this.load.image("treeTop2", treeTop2);
        this.load.image("treeTop3", treeTop3);
        this.load.image("bareTree1", bareTree1);
        this.load.image("mossyBoulder1", mossyBoulder1);
        this.load.image("rock1", rock1);
        this.load.image("rock2", rock2);
        this.load.image("rock3", rock3);
        this.load.image("rock4", rock4);
        this.load.image("rock5", rock5);
        this.load.image("rock6", rock6);
      }

      create() {
        this.scene = this; // Add this line to assign the scene to this.scene

        // Create a list to store game objects
        this.gameObjects = [];

        const tileSize = 32; // Size of each tile in pixels
        const numTiles = 32; // Number of tiles in the scene

        const sceneWidth = tileSize * numTiles; // Calculate the width of the scene
        const sceneHeight = tileSize * numTiles; // Calculate the height of the scene

        this.cameras.main.setSize(800, 800); // Set the size of the camera to match the scene

        //Set Tiles Arrays
        const grassTiles = ["grass5", "grass8", "grass21"];
        const dirtTiles = ["dirt1", "dirt2", "dirt9"];

        //Set Asset Arrays
        const rockAssets = [
          "rock1",
          "rock2",
          "rock3",
          "rock4",
          "rock5",
          "rock6",
        ];
        const treeAssets = ["treeTop1", "treeTop2", "treeTop3"];

        //Set Asset Sizing
        const assetSize = 256;
        const assetBaseScale = tileSize / assetSize;
        const scaleVariation = 0.3;

        const sketch = new p5();
        for (let row = 0; row < numTiles; row++) {
          for (let col = 0; col < numTiles; col++) {
            const tileX = col * tileSize;
            const tileY = row * tileSize;
            const terrainNoise = sketch.noise(col / 10, row / 10)
            const textureNoise = sketch.noise(
              (col + 100) / 10,
              (row + 100) / 10
            );

            let tileType;
            if (terrainNoise < 0.5) {
              const textureIndex = Math.floor(textureNoise * grassTiles.length);
              tileType = grassTiles[textureIndex];
              //Tree Top Assets
              treeAssets.forEach((treeAsset) => {
                if (Math.random() < 0.02) {
                  const randomRotation = Math.random() * 360;
                  const randomScale =
                    assetBaseScale +
                    Math.random() * scaleVariation -
                    scaleVariation / 2;
                  this.add
                    .image(tileX, tileY, treeAsset)
                    .setOrigin(0)
                    .setScale(randomScale)
                    .setDepth(1)
                    .setAngle(randomRotation);
                }
              });
              if (Math.random() < 0.01) {
                this.add
                  .image(tileX, tileY, "mossyBoulder1")
                  .setOrigin(0)
                  .setScale(assetBaseScale * 2)
                  .setDepth(1);
              }
            } else {
              const textureIndex = Math.floor(textureNoise * dirtTiles.length);
              tileType = dirtTiles[textureIndex];
              //Rock Assets
              rockAssets.forEach((rockAsset) => {
                if (Math.random() < 0.01) {
                  const randomRotation = Math.random() * 360;
                  const randomScale =
                    assetBaseScale +
                    Math.random() * scaleVariation -
                    scaleVariation / 2;
                  this.add
                    .image(tileX, tileY, rockAsset)
                    .setOrigin(0)
                    .setScale(randomScale)
                    .setDepth(1)
                    .setAngle(randomRotation);
                }
              });
            }

            let tile = this.add.image(tileX, tileY, tileType).setOrigin(0);
            this.gameObjects.push(tile);
          }
        }
      }
    }
    // Create a new Phaser game instance
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: phaserContainerRef.current,
      width: 800,
      height: 800,
      scene: [MyScene],
    });

    gameRef.current = game;

    // Clean up the Phaser game instance when the component unmounts
    return () => {
      game.destroy(true);
    };
  }, [seed]); // Empty dependency array ensures the effect runs only once

  // Define the restartScene function
  const restartScene = () => {
    if (gameRef.current) {
      const sceneKey = "myScene";
      const sceneManager = gameRef.current.scene;
      const scene = sceneManager.keys[sceneKey];
      if (scene) {
        for (let i = 0; i < scene.gameObjects.length; i++) {
          scene.gameObjects[i].destroy();
        }
        scene.gameObjects = [];
        sceneManager.stop(sceneKey);
        sceneManager.start(sceneKey);        
      }
      setSeed(Math.random())
    }
  };

  return (
    <>
      <button onClick={restartScene}>Restart Scene</button>
      <div ref={phaserContainerRef} style={{ width: "100%", height: "100%" }} />
    </>
  );
};

export default PhaserScene;
