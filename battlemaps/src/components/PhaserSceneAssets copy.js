import React, { useRef, useEffect, useState } from "react";
import Phaser from "phaser";
import p5 from "p5";

import s from "../style/main.module.scss";
import SizeSelector from "./SizeSelector";
import grass from "../assets/GrassTile/grassTileMain.png";
import dirt from "../assets/DirtTile/dirtTileMain.png";

import edgeL from "../assets/GrassDirtEdges/edgeLeft.png";
import edgeT from "../assets/GrassDirtEdges/edgeTop.png";
import edgeR from "../assets/GrassDirtEdges/edgeRight.png";
import edgeB from "../assets/GrassDirtEdges/edgeBottom.png";

import cornerTL from "../assets/GrassDirtEdges/cornerTopLeft.png";
import cornerBL from "../assets/GrassDirtEdges/cornerBottomLeft.png";
import cornerTR from "../assets/GrassDirtEdges/cornerTopRight.png";
import cornerBR from "../assets/GrassDirtEdges/cornerBottomRight.png";

import smallTL from "../assets/GrassDirtEdges/smallTL.png";
import smallTR from "../assets/GrassDirtEdges/smallTR.png";
import smallBL from "../assets/GrassDirtEdges/smallBL.png";
import smallBR from "../assets/GrassDirtEdges/smallBR.png";
import smallTLBR from "../assets/GrassDirtEdges/smallTLBR.png";
import smallTRBL from "../assets/GrassDirtEdges/smallTRBL.png";

import splitLR from "../assets/GrassDirtEdges/splitLR.png";
import splitTB from "../assets/GrassDirtEdges/splitTB.png";

import islandM from "../assets/GrassDirtEdges/islandMid.png";
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
  const [size, setSize] = useState("medium");
  const [rerenderTrigger, setRerenderTrigger] = useState(0);
  const [noiseOffset, setNoiseOffset] = useState(0);

  const rerenderCanvas = () => {
    setRerenderTrigger((prevTrigger) => prevTrigger + 1);
    setNoiseOffset(Math.random() * 10000);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  const getSizeWidth = () => {
    switch (size) {
      case "small":
        return "560px";
      case "large":
        return "1280px";
      default:
        return "960px"; // medium size
    }
  };
  const getSizeHeight = () => {
    switch (size) {
      case "small":
        return "560px";
      case "large":
        return "960px";
      default:
        return "750px"; // medium size
    }
  };

  useEffect(() => {
    let height, width;

    switch (size) {
      case "small":
        width = 560;
        height = 560;
        break;
      case "large":
        width = 1280;
        height = 960;
        break;
      default: // medium size
        width = 960;
        height = 750;
    }
    // Create a new Phaser scene
    class MyScene extends Phaser.Scene {
      constructor() {
        super({ key: "myScene" });
      }

      preload() {
        this.load.image("dirt", dirt);

        this.load.image("grass", grass);

        this.load.image("edgeT", edgeT);
        this.load.image("edgeR", edgeR);
        this.load.image("edgeB", edgeB);
        this.load.image("edgeL", edgeL);

        this.load.image("cornerTR", cornerTR);
        this.load.image("cornerBR", cornerBR);
        this.load.image("cornerTL", cornerTL);
        this.load.image("cornerBL", cornerBL);

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
        this.load.image("islandM", islandM);

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

        const numTilesWidth = Math.ceil(width / tileSize);
        const numTilesHeight = Math.ceil(height / tileSize);

        this.cameras.main.setSize(width, height); // Set the size of the camera to match the scene

        //Set Tiles Arrays
        const grassTiles = ["grass"];
        const dirtTiles = ["dirt"];

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
        const bushAssets = ["bush1", "bush2", "bush3"];
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
        let tilemap = new Array(numTilesWidth);
        for (let i = 0; i < numTilesWidth; i++) {
          tilemap[i] = new Array(numTilesHeight);
        }

        let tileGrid = [];

        //Initiate Perlin Noise
        const sketch = new p5();
        for (let row = 0; row < numTilesHeight; row++) {
          tileGrid[row] = [];
          // Iterate over each row in the grid
          for (let col = 0; col < numTilesWidth; col++) {
            const tileX = col * tileSize;
            const tileY = row * tileSize;

            // Use Perlin noise to generate a smooth, natural-looking terrain height value
            const terrainNoise = sketch.noise(
              col / 10 + noiseOffset,
              row / 10 + noiseOffset
            );

            // Use Perlin noise to generate a value for texture variation
            const textureNoise = sketch.noise(
              (col + 100) / 10 + noiseOffset,
              (row + 100) / 10 + noiseOffset
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

            // Add the tile type to the tileArray
            tileGrid[row][col] = tileType;
          }
        }
        //touching tiles
        let touching = {};
        // Define the directions
        const directions = [
          "top",
          "topRight",
          "right",
          "bottomRight",
          "bottom",
          "bottomLeft",
          "left",
          "topLeft",
        ];
        const dRows = [-1, -1, 0, 1, 1, 1, 0, -1];
        const dCols = [0, 1, 1, 1, 0, -1, -1, -1];
        const newTiles = [...tileGrid];
        // Go through the tileGrid again to replace tiles
        for (let row = 0; row < numTiles; row++) {
          for (let col = 0; col < numTiles; col++) {
            // Check the 8 neighboring tiles
            for (let k = 0; k < directions.length; k++) {
              const di = dRows[k];
              const dj = dCols[k];
              // Skip if it's out of bounds
              if (
                row + di < 0 ||
                row + di >= row ||
                col + dj < 0 ||
                col + dj >= col
              ) {
                continue;
              }
              const neighborTile = newTiles[row + di][col + dj];
              // Compare types
              if (neighborTile.type !== newTiles[row][col].type) {
                if (!touching[neighborTile.type]) {
                  touching[neighborTile.type] = {};
                }
                touching[neighborTile.type][directions[k]] = true;
              }
            }
            newTiles[row][col].touching = touching;
          }
        }
      }
    }

    if (gameRef.current) {
      gameRef.current.destroy(true);
    }

    // Create a new Phaser game instance with the updated dimensions
    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      parent: phaserContainerRef.current,
      width: width, // use the updated width
      height: height, // use the updated height
      scene: [MyScene],
    });

    // gameRef.current = gameRef.current;

    // Clean up the Phaser game instance when the component unmounts
    return () => {
      gameRef.current.destroy(true);
    };
  }, [size, seed, rerenderTrigger]); // Empty dependency array ensures the effect runs only once

  return (
    <>
      <div className={s.mapContainer}>
        <div className={s.settings}>
          <div className={s.imageContainer}></div>
          <button onClick={rerenderCanvas} className={s.resetMapBtn}>
            Reset Map
          </button>
          <SizeSelector size={size} handleSizeChange={handleSizeChange} />
        </div>
        <div
          ref={phaserContainerRef}
          // style={{ width: "100%", height: "100%" }}
        />
      </div>
    </>
  );
};

export default PhaserScene;
