import s from "../style/main.module.scss";
// import BattleMapRender from "../components/BattleMapRender";
// import PhaserScene from "../components/PhaserScene";
import axios from "axios";
import { useState } from "react";

const MainPage = (props) => {
  const [imgSrc, setImgSrc] = useState(null);

  const generateImage = async () => {
    // Make a POST request to your FastAPI server
    const response = await axios.post("http://localhost:8000/generate/");

    // Get the base64 image from the response
    const base64Image = response.data.image;

    // Set the image source to be the base64 image
    setImgSrc(`data:image/png;base64,${base64Image}`);
  };
  return (
    <>
      <div className={s.mainPageContainer}>
        <h1>Welcome to Battlemaps</h1>
        <h2>Where you can generate Battlemaps based on your specific needs</h2>
        <div>
          <button onClick={generateImage}>Generate Image</button>
          {imgSrc && <img src={imgSrc} alt="Generated" />}
        </div>
        {/* <PhaserScene />
         */}
      </div>
    </>
  );
};

export default MainPage;
