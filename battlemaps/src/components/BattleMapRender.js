import s from "../style/main.module.scss";
import SizeSelector from "./SizeSelector";
import grass from "../assets/GrassTile/grassTileMain.png";
import dirt from "../assets/DirtTile/dirtTileMain.png";
import p5 from "p5";
import { useState, useEffect, useRef } from "react";

const tileSize = 20;
const rows = 50;
const cols = 50;

const BattleMapRender = (props) => {
  const [size, setSize] = useState("medium");
  const [rerenderTrigger, setRerenderTrigger] = useState(0);
  const [noiseOffset, setNoiseOffset] = useState(0);
  const containerRef = useRef();
  const myP5 = useRef();
  const sketchRef = useRef();

  const [tiles, setTiles] = useState(() => {
    const arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
      arr[i] = new Array(cols);
    }
    return arr;
  });

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

  useEffect(() => {
    let width, height;

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

    myP5.current = new p5((p) => {
      let imgGrass;
      let imgDirt;

      p.preload = () => {
        imgGrass = p.loadImage(grass);
        imgDirt = p.loadImage(dirt);
      };

      p.setup = () => {
        p.createCanvas(width, height);
        p.noLoop();
        containerRef.current.appendChild(p.canvas);
      };

      p.draw = () => {
        p.background(220);
        p.blendMode(p.BLEND);
        for (let i = 0; i < tilesX; i++) {
          for (let j = 0; j < tilesY; j++) {
            let noiseVal = p.noise(
              i * 0.1 + noiseOffset,
              j * 0.1 + noiseOffset
            );

            if (noiseVal < 0.5) {
              p.image(imgGrass, i * tileSize, j * tileSize, tileSize, tileSize);
            } else {
              p.image(imgDirt, i * tileSize, j * tileSize, tileSize, tileSize);
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
    });

    return () => {
      if (myP5.current) {
        myP5.current.remove();
      }
    };
  }, [size, rerenderTrigger]);

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
            console.log(touching)
          }
        }

        setTiles(newTiles);
      };
    };
    
    new p5(sketch);
  }, [rerenderTrigger]);

  useEffect(() => {
    console.log(tiles);
  }, [tiles])

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
