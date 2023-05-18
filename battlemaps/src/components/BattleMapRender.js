import s from "../style/main.module.scss";
import SizeSelector from "./SizeSelector";
import grass from "../assets/GrassTile/grassTileMain.png"
import dirt from "../assets/DirtTile/dirtTileMain.png"
import p5 from "p5";
import { useState, useEffect, useRef } from "react" 

const BattleMapRender = (props) => {
  const [size, setSize] = useState("medium");
  const containerRef = useRef();
  const myP5 = useRef();
  const sketchRef = useRef()

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

    myP5.current = new p5(p => {
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
        for (let i = 0; i < tilesX; i++) {
          for (let j = 0; j < tilesY; j++) {
            let noiseVal = p.noise(i * 0.1, j * 0.1);
            if (noiseVal < 0.5) {
              p.image(imgGrass, i * tileSize, j * tileSize, tileSize, tileSize);
            } else {
              p.image(imgDirt, i * tileSize, j * tileSize, tileSize, tileSize);
            }
          }
        }
      };

    });

    return () => myP5.current.remove();

  }, [size]);

  return (
    <>
       <div className={s.mapContainer}>
        <div className={s.settings}>
          <SizeSelector size={size} handleSizeChange={handleSizeChange} />
        </div>
        <div className={s.sceneContainer}>
          <div ref={containerRef} style={{ border: "1px solid black" }} />
        </div>
      </div>
    </>
  );
};

export default BattleMapRender;
