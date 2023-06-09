import React, { useRef, useEffect, useState } from "react";
import Phaser from "phaser";
import p5 from "p5";

import grass5 from "../assets/GrassTile/grassTileMain.png";
import grass8 from "../assets/GrassTile/Grass_08-128x128.png";
import grass21 from "../assets/GrassTile/Grass_21-128x128.png";

import dirt1 from "../assets/DirtTile/Dirt_01-128x128.png";
import dirt2 from "../assets/DirtTile/Dirt_02-128x128.png";
import dirt9 from "../assets/DirtTile/dirtTileMain.png";

import edgeLeft from "../assets/GrassDirtEdges/edgeLeft.png";
import edgeTop from "../assets/GrassDirtEdges/edgeTop.png";
import edgeRight from "../assets/GrassDirtEdges/edgeRight.png";
import edgeBottom from "../assets/GrassDirtEdges/edgeBottom.png";

import cornerTopLeft from "../assets/GrassDirtEdges/cornerTopLeft.png";
import cornerBottomLeft from "../assets/GrassDirtEdges/cornerBottomLeft.png";
import cornerTopRight from "../assets/GrassDirtEdges/cornerTopRight.png";
import cornerBottomRight from "../assets/GrassDirtEdges/cornerBottomRight.png";

import smallTL from "../assets/GrassDirtEdges/smallTL.png";
import smallTR from "../assets/GrassDirtEdges/smallTR.png";
import smallBL from "../assets/GrassDirtEdges/smallBL.png";
import smallBR from "../assets/GrassDirtEdges/smallBR.png";

import splitLR from "../assets/GrassDirtEdges/splitLR.png";
import splitTB from "../assets/GrassDirtEdges/splitTB.png";

import islandT from "../assets/GrassDirtEdges/islandT.png";
import islandB from "../assets/GrassDirtEdges/islandB.png";
import islandL from "../assets/GrassDirtEdges/islandL.png";
import islandR from "../assets/GrassDirtEdges/islandR.png";

import treeTop1 from "../assets/Riverwood Assets Free Pack/Riverwood Assets With Shadow/Tree 1 S.png";
import treeTop2 from "../assets/Riverwood Assets Free Pack/Riverwood Assets With Shadow/Tree 2 S.png";
import treeTop3 from "../assets/Riverwood Assets Free Pack/Riverwood Assets With Shadow/Tree 5 S.png";
import treeTop4 from "../assets/Riverwood Assets Free Pack/Riverwood Assets With Shadow/Tree 6 S.png";

import rock5 from "../assets/Riverwood Assets Free Pack/Riverwood Assets With Shadow/Rock 5 S.png";
// import rock6 from "../assets/Riverwood Assets Free Pack/Riverwood Assets/Rock 6.png"
// import rock13 from "../assets/Riverwood Assets Free Pack/Riverwood Assets With Shadow/Rock 13 S - Copy.jpg"

import foliage1 from "../assets/ForestFloor/Foliage 1 - Green 1.png";
import foliage2 from "../assets/ForestFloor/Foliage 2 - Green 1.png";
import foliage3 from "../assets/ForestFloor/Foliage 3 - Green 1.png";
import foliage4 from "../assets/ForestFloor/Foliage 4 - Green 1.png";
import foliage5 from "../assets/ForestFloor/Foliage 5 - Green 1.png";
import foliage6 from "../assets/ForestFloor/Foliage 6 - Green 1.png";
import foliage9 from "../assets/ForestFloor/Foliage 9 - Green 1.png";
import foliage10 from "../assets/ForestFloor/Foliage 10 - Green 1.png";

import bush1 from "../assets/Riverwood Assets Free Pack/Riverwood Assets With Shadow/Bush 1 S.png";
import bush2 from "../assets/Riverwood Assets Free Pack/Riverwood Assets With Shadow/Berry Bush 1 S.png";
import bush3 from "../assets/Riverwood Assets Free Pack/Riverwood Assets With Shadow/Berry Bush 2 S.png";

import bush4 from "../assets/ForestFloor/Bush 4 - Green 2.png";
import bush5 from "../assets/ForestFloor/Bush 5 - Green 1.png";
import bush6 from "../assets/ForestFloor/Bush 6 - Green 3.png";
import bush7 from "../assets/ForestFloor/Bush 7 - Green 1.png";
import bush9 from "../assets/ForestFloor/Bush 9 - Yellow.png";

import fern1 from "../assets/Riverwood Assets Free Pack/Riverwood Assets With Shadow/Plant 1 S.png";
import fern2 from "../assets/Riverwood Assets Free Pack/Riverwood Assets With Shadow/Plant 2 S.png";
import fern3 from "../assets/Riverwood Assets Free Pack/Riverwood Assets With Shadow/Plant 5 S.png";
// import fern4 from "../assets/Riverwood Assets Free Pack/Riverwood Assets With Shadow/Small Plant 1 S.png";
// import fern5 from "../assets/Riverwood Assets Free Pack/Riverwood Assets With Shadow/Small Plant 15 S.png";

import flower5 from "../assets/ForestFloor/Flower 5 - Green 3.png";
import flower6 from "../assets/ForestFloor/Flower 6 - Green 3.png";

import flowers1 from "../assets/ForestFloor/Flowers 1.png";
import flowers2 from "../assets/ForestFloor/Flowers 2.png";
import flowers3 from "../assets/ForestFloor/Flowers 3.png";

import flowers5 from "../assets/ForestFloor/Flowers 5.png";

const PhaserScene = (props) => {
  const phaserContainerRef = useRef(null);
  const gameRef = useRef(null);
  const [seed, setSeed] = useState(Math.random());

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

        this.load.image("edgeTop", edgeTop);
        this.load.image("edgeRight", edgeRight);
        this.load.image("edgeBottom", edgeBottom);
        this.load.image("edgeLeft", edgeLeft);

        this.load.image("cornerTR", cornerTopRight);
        this.load.image("cornerBR", cornerBottomRight);
        this.load.image("cornerTL", cornerTopLeft);
        this.load.image("cornerBL", cornerBottomLeft);

        this.load.image("smallTL", smallTL);
        this.load.image("smallTR", smallTR);
        this.load.image("smallBL", smallBL);
        this.load.image("smallBR", smallBR);

        this.load.image("splitLR", splitLR);
        this.load.image("splitTB", splitTB);

        this.load.image("islandT", islandT);
        this.load.image("islandB", islandB);
        this.load.image("islandL", islandL);
        this.load.image("islandR", islandR);

        this.load.image("treeTop1", treeTop1);
        this.load.image("treeTop2", treeTop2);
        this.load.image("treeTop3", treeTop3);
        this.load.image("treeTop4", treeTop4);

        this.load.image("rock5", rock5);
        // this.load.image("rock6", rock6);
        // this.load.image("rock13", rock13);

        this.load.image("foliage1", foliage1);
        this.load.image("foliage2", foliage2);
        this.load.image("foliage3", foliage3);
        this.load.image("foliage4", foliage4);
        this.load.image("foliage5", foliage5);
        this.load.image("foliage6", foliage6);
        this.load.image("foliage9", foliage9);
        this.load.image("foliage10", foliage10);

        this.load.image("bush1", bush1);
        this.load.image("bush2", bush2);
        this.load.image("bush3", bush3);
        this.load.image("bush4", bush4);
        this.load.image("bush5", bush5);
        this.load.image("bush6", bush6);
        this.load.image("bush7", bush7);
        this.load.image("bush9", bush9);

        this.load.image("fern1", fern1);
        this.load.image("fern3", fern3);
        this.load.image("fern2", fern2);

        this.load.image("flower5", flower5);
        this.load.image("flower6", flower6);

        this.load.image("flowers1", flowers1);
        this.load.image("flowers2", flowers2);
        this.load.image("flowers3", flowers3);
        this.load.image("flowers5", flowers5);
      }

      create() {
        this.scene = this; // Add this line to assign the scene to this.scene

        // Create a list to store game objects
        this.gameObjects = [];

        const tileSize = 32; // Size of each tile in pixels
        const numTiles = 32; // Number of tiles in the scene

        this.cameras.main.setSize(960, 960); // Set the size of the camera to match the scene

        //Set Tiles Arrays
        const grassTiles = [
          "grass5",
          // "grass8",
          // "grass21",
          // "grassCorner5",
          // "grassEdge5",
          // "corner",
          // "edge"
        ];
        const dirtTiles = [
          // "dirt1",
          // "dirt2",
          "dirt9",
        ];

        //Set Asset Arrays
        const rockAssets = [
          "rock5",
          // "rock6",
          // "rock13"
        ];
        const treeAssets = ["treeTop1", "treeTop2", "treeTop3", "treeTop4"];
        const foliageAssets = [
          "foliage1",
          "foliage2",
          "foliage3",
          "foliage4",
          "foliage5",
          "foliage6",
          "foliage9",
          "foliage10",
        ];
        const bushAssets = [
          "bush1",
          "bush2",
          "bush3",
          // "bush4",
          // "bush5",
          // "bush6",
          // "bush7",
          // "bush8",
          // "bush19",
        ];
        const fernAssets = ["fern1", "fern2", "fern3"];
        const flowerAssets = ["flower5", "flower6"];
        const flowersAssets = ["flowers1", "flowers2", "flowers3", "flowers5"];

        const grassAssetsCombine = [].concat(
          treeAssets,
          foliageAssets,
          bushAssets,
          fernAssets,
          flowerAssets,
          flowersAssets
        );

        //Set Asset Sizing
        const assetSize = 256;
        const assetBaseScale = tileSize / assetSize;
        const scaleVariation = 0.3;

        // Initialize an empty 2D array to represent your tilemap
        let tilemap = new Array(numTiles);
        for (let i = 0; i < numTiles; i++) {
          tilemap[i] = new Array(numTiles);
        }

        let tileGrid = [];

        //Initiate Perlin Noise
        const sketch = new p5();
        for (let row = 0; row < numTiles; row++) {
          tileGrid[row] = [];
          // Iterate over each row in the grid
          for (let col = 0; col < numTiles; col++) {
            const tileX = col * tileSize;
            const tileY = row * tileSize;

            // Use Perlin noise to generate a smooth, natural-looking terrain height value
            const terrainNoise = sketch.noise(col / 10, row / 10);

            // Use Perlin noise to generate a value for texture variation
            const textureNoise = sketch.noise(
              (col + 100) / 10,
              (row + 100) / 10
            );

            let tileType; // Variable to store the type of the current tile

            //Grass Tiles
            if (terrainNoise < 0.5) {
              // If the terrain height is less than 0.5, the tile is a grass tile
              const textureIndex = Math.floor(textureNoise * grassTiles.length);
              tileType = grassTiles[textureIndex]; // Select a grass tile type based on the texture noise

              // Iterate over each type of grass asset
              // treeAssets.forEach((foliageAsset) => {
              //   if (Math.random() < 0.02) {
              //     const randomRotation = Math.random() * 360;
              //     const randomScale =
              //       assetBaseScale +
              //       Math.random() * scaleVariation -
              //       scaleVariation / 2;
              //     this.add
              //       .image(tileX, tileY, foliageAsset)
              //       .setOrigin(0)
              //       .setScale(randomScale)
              //       .setDepth(1);
              //     // .setAngle(randomRotation)
              //   }
              // });

              // Bush Asset
              // bushAssets.forEach((foliageAsset) => {
              //   if (Math.random() < 0.02) {
              //     const randomRotation = Math.random() * 360;
              //     const randomScale =
              //       assetBaseScale +
              //       Math.random() * scaleVariation -
              //       scaleVariation / 2;
              //     this.add
              //       .image(tileX, tileY, foliageAsset)
              //       .setOrigin(0)
              //       .setScale(randomScale)
              //       .setDepth(1);
              //     // .setAngle(randomRotation)
              //   }
              // });
              // Fern Asset
              // fernAssets.forEach((foliageAsset) => {
              //   if (Math.random() < 0.02) {
              //     const randomRotation = Math.random() * 360;
              //     const randomScale =
              //       assetBaseScale +
              //       Math.random() * scaleVariation -
              //       scaleVariation / 2;
              //     this.add
              //       .image(tileX, tileY, foliageAsset)
              //       .setOrigin(0)
              //       .setScale(randomScale)
              //       .setDepth(1);
              //     // .setAngle(randomRotation)
              //   }
              // });
            } else {
              //Dirt tiles
              const textureIndex = Math.floor(textureNoise * dirtTiles.length);
              tileType = dirtTiles[textureIndex];
              //Rock Assets
              // rockAssets.forEach((rockAsset) => {
              //   if (Math.random() < 0.02) {
              //     const randomRotation = Math.random() * 360;
              //     const randomScale =
              //       assetBaseScale +
              //       Math.random() * scaleVariation -
              //       scaleVariation / 2;
              //     this.add
              //       .image(tileX, tileY, rockAsset)
              //       .setOrigin(0)
              //       .setScale(randomScale)
              //       .setDepth(1);
              //     // .setAngle(randomRotation);
              //   }
              // });
            }

            let tile = this.add.image(tileX, tileY, tileType).setOrigin(0);
            this.gameObjects.push(tile);

            // Add the row and column number as text on top of the tile
            // let text = this.add
            //   .text(tileX, tileY, `(${col}, ${row})`, {
            //     fontSize: "6px",
            //     fill: "#fff",
            //   })
            //   .setOrigin(0);
            // this.gameObjects.push(text);

            // Add the tile type to the tileArray
            tileGrid[row][col] = tileType;
          }
        }
        //Nearby Array
        let nearbyTiles = {};
        // Go through the tileGrid again to replace tiles
        for (let row = 0; row < numTiles; row++) {
          for (let col = 0; col < numTiles; col++) {
            if (tileGrid[row][col]) {
              if (row < numTiles - 1) {
                // console.log("bottom " + tileGrid[row + 1][col]);
                let bottom = tileGrid[row + 1][col];
                nearbyTiles["bottom"] = bottom;
              }

              // right
              if (col < numTiles - 1) {
                // console.log("right " + tileGrid[row][col + 1]);
                let right = tileGrid[row][col + 1];
                nearbyTiles["right"] = right;
              }

              // bottom right
              if (row < numTiles - 1 && col < numTiles - 1) {
                // console.log("bottom right " + tileGrid[row + 1][col + 1]);
                let bottomRight = tileGrid[row + 1][col + 1];
                nearbyTiles["bottomRight"] = bottomRight;
              }

              // bottom left
              if (row < numTiles - 1 && col > 0) {
                let bottomLeft = tileGrid[row + 1][col - 1];
                nearbyTiles["bottomLeft"] = bottomLeft;
              }

              // top
              if (row > 0) {
                // console.log("top " + tileGrid[row - 1][col]);
                let top = tileGrid[row - 1][col];
                nearbyTiles["top"] = top;
              }

              // left
              if (col > 0) {
                // console.log("left " + tileGrid[row][col - 1]);
                let left = tileGrid[row][col - 1];
                nearbyTiles["left"] = left;
              }

              // top left
              if (row > 0 && col > 0) {
                // console.log("top left " + tileGrid[row - 1][col - 1]);
                let topLeft = tileGrid[row - 1][col - 1];
                nearbyTiles["topLeft"] = topLeft;
              }

              // top right
              if (row > 0 && col < numTiles - 1) {
                let topRight = tileGrid[row - 1][col + 1];
                nearbyTiles["topRight"] = topRight;
              }

              // Track whether we found a grass tile
              let foundGrass = false;

              // Track which direction the grass tile is in
              let grassDirection = [];

              if (tileGrid[row][col] === "dirt9") {
                // Check each nearby tile
                for (let direction in nearbyTiles) {
                  if (nearbyTiles[direction] === "grass5") {
                    foundGrass = true;
                    grassDirection.push(direction);
                  }
                }

                // If we found a grass tile, replace the current tile
                if (foundGrass) {
                  let newTileType;
                  let rotation;
                  let origin = 0;
                  let directionString = grassDirection.sort().join(" ");

                  for (let direction of grassDirection) {
                    switch (directionString) {
                      //Single Direction
                      case "bottom":
                        newTileType = "edgeLeft";
                        break;
                      case "right":
                        newTileType = "edgeRight";
                        break;
                      case "bottomRight":
                        newTileType = "smallBR";
                        break;
                      case "bottomLeft":
                        newTileType = "smallBL";
                        break;
                      case "top":
                        newTileType = "edgeTop";
                        break;
                      case "left":
                        newTileType = "edgeLeft";
                        break;
                      case "topLeft":
                        newTileType = "smallTL";
                        break;
                      case "topRight":
                        newTileType = "smallTR";
                        break;

                      //Bottom combos
                      case "bottom right":
                        newTileType = "cornerBR";
                        break;
                      case "bottom bottomRight":
                        newTileType = "edgeBottom";
                        break;
                      case "bottom bottomLeft":
                        newTileType = "edgeBottom";
                        break;
                      case "bottom top":
                        newTileType = "splitTB";
                        break;
                      case "bottom left":
                        newTileType = "cornerBL";
                        break;
                      case "bottom topLeft":
                        newTileType = "edgeBottom";
                        break;
                      case "bottom topRight":
                        newTileType = "edgeBottom";
                        break;

                      //Right Combos
                      case "right bottomRight":
                        newTileType = "edgeRight";
                        break;
                      case "right bottomLeft":
                        newTileType = "edgeRight";
                        break;
                      case "right top":
                        newTileType = "cornerTR";
                        break;
                      case "right left":
                        newTileType = "splitLR";
                        break;
                      case "right topLeft":
                        newTileType = "edgeRight";
                        break;
                      case "right topRight":
                        newTileType = "edgeRight";
                        break;

                      //BR combos
                      case "bottomRight top":
                        newTileType = "edgeTop";
                        break;
                      case "bottomRight bottomLeft":
                        //need to make
                        break;
                      case "bottomRight left":
                        newTileType = "edgeLeft";
                        break;
                      case "bottomRight topLeft":
                        //Need to make modified tiles
                        break;
                      case "bottomRight topRight":
                        //need to make tile
                        break;

                      //Bottom Left Combos
                      case "bottomLeft top":
                        newTileType = "edgeTop";
                        break;
                      case "bottomLeft left":
                        newTileType = "edgeLeft";
                        break;
                      case "bottomLeft topLeft":
                        //Need to make modified tiles
                        break;
                      case "bottomLeft topRight":
                        //need to make tile
                        break;

                      //Top Combos
                      case "top left":
                        newTileType = "cornerTL";
                        break;
                      case "top topLeft":
                        newTileType = "edgeTop";
                        break;
                      case "top topRight":
                        newTileType = "edgeTop";
                        break;

                      //Left Combo
                      case "left topLeft":
                        newTileType = "edgeLeft";
                        break;
                      case "left topRight":
                        newTileType = "edgeLeft";
                        break;

                      //TopLeft combo
                      case "topLeft topRight":
                        //Need to make tile
                        break;

                      //Bottom + Right double combos
                      case "bottom right bottomRight":
                        newTileType = "cornerBR";
                        break;
                      case "bottom right bottomLeft":
                        newTileType = "cornerBR";
                        break;
                      case "bottom right top":
                        newTileType = "islandR";
                        break;
                      case "bottom right left":
                        newTileType = "islandB";
                        break;
                      case "bottom right topLeft":
                        newTileType = "cornerBR";
                        break;
                      case "bottom right topRight":
                        newTileType = "cornerBR";
                        break;
                      default:
                        console.log(
                          "Grass direction not recognized: " + direction
                        );
                        break;
                    }

                    let newTile = this.add
                      .image(col * tileSize, row * tileSize, newTileType)
                      .setOrigin(origin)
                      .setScale(0.25)
                      .setAngle(rotation); // Set the rotation of the image
                    this.gameObjects[row * numTiles + col] = newTile;

                    // Also update tileGrid so the new tile is taken into account in future checks
                    tileGrid[row][col] = newTileType;
                  }
                }
                grassDirection = [];
              }
              // Reset the nearbyTiles array for the next iteration
              nearbyTiles = {};
            }
          }
        }
      }
    }
    // Create a new Phaser game instance
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: phaserContainerRef.current,
      width: 960,
      height: 960,
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
    // if (gameRef.current) {
    //   const sceneKey = "myScene";
    //   const sceneManager = gameRef.current.scene;
    //   const scene = sceneManager.keys[sceneKey];
    //   if (scene) {
    //     for (let i = 0; i < scene.gameObjects.length; i++) {
    //       scene.gameObjects[i].destroy();
    //     }
    //     scene.gameObjects = [];
    //     sceneManager.stop(sceneKey);
    //     sceneManager.start(sceneKey);
    //   }
    //   setSeed(Math.random());
    // }
  };

  return (
    <>
      <button onClick={restartScene}>Restart Scene</button>
      <div ref={phaserContainerRef} style={{ width: "100%", height: "100%" }} />
    </>
  );
};

export default PhaserScene;
