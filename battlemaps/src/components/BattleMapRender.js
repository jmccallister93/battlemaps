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

import p5 from "p5";
import { useState, useEffect, useRef } from "react";

const tileSize = 20;
const rows = 50;
const cols = 50;

const BattleMapRender = (props) => {
  const [size, setSize] = useState("medium");
  const [rerenderTrigger, setRerenderTrigger] = useState(0);
  const [renderTriggered, setRenderTriggered] = useState(false);
  const [noiseOffset, setNoiseOffset] = useState(0);
  const containerRef = useRef();
  const sketchRef = useRef();
  const myP5 = useRef();

  const [tiles, setTiles] = useState(() => {
    const arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
      arr[i] = new Array(cols);
    }
    return arr;
  });

  const sketchProps = { tiles };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const rerenderCanvas = () => {
    setRerenderTrigger((prevTrigger) => prevTrigger + 1);
    setNoiseOffset(Math.random() * 10000);
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

  const containerStyle = {
    width: getSizeWidth(),
    height: getSizeHeight(),
    border: "1px solid black",
  };

  const tileSize = 20; // change to match your tile size

  //Initial render and nosie generation for tile
  useEffect(() => {
    let width, height;
    setRenderTriggered(true);

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

    const tilesX = width / tileSize;
    const tilesY = height / tileSize;

    containerRef.current.style.width = `${width}px`;
    containerRef.current.style.height = `${height}px`;

    if (myP5.current) {
      myP5.current.remove();
    }

    myP5.current = new p5(
      (p) => {
        let imgGrass;
        let imgDirt;

        p.preload = () => {
          imgGrass = p.loadImage(grass);
          imgDirt = p.loadImage(dirt);
        };

        p.setup = () => {
          const canvas = p.createCanvas(width, height);
          canvas.parent(containerRef.current);
          p.noLoop();
        };

        p.draw = () => {
          p.background(220);
          for (let i = 0; i < tilesX; i++) {
            for (let j = 0; j < tilesY; j++) {
                
                let noiseVal = p.noise(
                  i * 0.1 + noiseOffset,
                  j * 0.1 + noiseOffset
                );

                if (noiseVal < 0.5) {
                  p.image(
                    imgGrass,
                    i * tileSize,
                    j * tileSize,
                    tileSize,
                    tileSize
                  );
                } else {
                  p.image(
                    imgDirt,
                    i * tileSize,
                    j * tileSize,
                    tileSize,
                    tileSize
                  );
                }
              }
            
          }
        };

        p.remove = (() => {
          const originalRemove = p.remove;
          return () => {
            originalRemove.call(p);
            if (containerRef.current.firstChild) {
              containerRef.current.firstChild.remove();
            }
          };
        })();
      },
      containerRef.current,
      sketchProps
    );

    return () => {
      if (myP5.current) {
        myP5.current.remove();
      }
    };
  }, [size, rerenderTrigger, tiles, noiseOffset]);

  //Check touching tiles
  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(1, 1);
        p.noLoop();

        const newTiles = [...tiles];
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            const noiseVal = p.noise(
              i * 0.1 + noiseOffset,
              j * 0.1 + noiseOffset
            );
            newTiles[i][j] = {
              type: noiseVal < 0.5 ? "grass" : "dirt",
              touching: {},
            };
          }
        }

        // Now we check each tile for its neighbours
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
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

            // Check the 8 neighboring tiles
            for (let k = 0; k < directions.length; k++) {
              const di = dRows[k];
              const dj = dCols[k];
              // Skip if it's out of bounds
              if (
                i + di < 0 ||
                i + di >= rows ||
                j + dj < 0 ||
                j + dj >= cols
              ) {
                continue;
              }

              const neighborTile = newTiles[i + di][j + dj];
              // Compare types
              if (neighborTile.type !== newTiles[i][j].type) {
                if (!touching[neighborTile.type]) {
                  touching[neighborTile.type] = {};
                }
                touching[neighborTile.type][directions[k]] = true;
              }
            }

            newTiles[i][j].touching = touching;
          }
        }

        setTiles(newTiles);
      };
    };

    new p5(sketch);
  }, [rerenderTrigger]);

  useEffect(() => {
    function createNewTile(replacement) {
      switch (replacement) {
        case "replacement1":
          return islandM;
        case "replacement2":
          return islandR;
        case "replacement3":
          return islandR;
        case "replacement4":
          return islandR;
        case "replacement5":
          return islandR;
        case "replacement6":
          return cornerTR;
        case "replacement7":
          return edgeT;
        case "replacement8":
          return edgeT;
        case "replacement9":
          return smallTL;
        case "replacement10":
          return edgeL;
        case "replacement11":
          return edgeL;
        case "replacement12":
          return cornerBL;
        case "replacement13":
          return cornerBL;
        case "replacement14":
          return islandB;
        case "replacement15":
          return islandB;
        case "replacement16":
          return cornerBL;
        case "replacement17":
          return cornerBL;
        case "replacement18":
          return edgeL;
        case "replacement19":
          return smallBL;
        default:
          return null;
      }
    }

    let replacementTiles = tiles.map((row) =>
      row.map((tile) => {
        if (Object.keys(tile.touching).length > 0) {
          let replacementTile;

          function replaceTile(replacement) {
            replacementTile = createNewTile(replacement);
          }
          const directions = [
            "left",
            "right",
            "top",
            "bottom",
            "bottomLeft",
            "bottomRight",
            "topLeft",
            "topRight",
          ];

          // Recursive function to generate combinations
          function generateCombinations(
            prefix,
            remainingDirections,
            combinations
          ) {
            if (remainingDirections.length === 0) {
              combinations.push(prefix);
              return;
            }

            const currentDirection = remainingDirections[0];
            const newPrefix = [...prefix, currentDirection];
            generateCombinations(
              newPrefix,
              remainingDirections.slice(1),
              combinations
            );
            generateCombinations(
              prefix,
              remainingDirections.slice(1),
              combinations
            );
          }

          const combinations = [];
          generateCombinations([], directions, combinations);

          // Assign replacement values to the combinations
          const replacements = Array.from(
            { length: combinations.length },
            (_, i) => `replacement${i + 1}`
          );
          const combinationsWithReplacements = combinations.map(
            (directions, index) => ({
              directions,
              replacement: replacements[index],
            })
          );

          if (tile.touching.grass) {
            for (const combination of combinationsWithReplacements) {
              if (
                combination.directions.every(
                  (direction) => tile.touching.grass[direction]
                )
              ) {
                replaceTile(combination.replacement);
                break; // Exit the loop if a match is found
              }
            }
          }
          // replacementTile = test; // replace with actual replacement
          return replacementTile || tile; // If no condition was met, return the original tile
        }
        return tile; // Return original tile if it's not touching any different tiles
      })
    );
    setTiles(replacementTiles);
  }, [renderTriggered]);

  //   useEffect(() => {
  //     console.log(tiles);
  //   }, [tiles])

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
        <div ref={containerRef} />
      </div>
    </>
  );
};

export default BattleMapRender;
