import axios from "axios";

const GAN = (props) => {
  axios
    .post("http://localhost:8000/generate/", { seed: 42 })
    .then((response) => {
      // The response will contain a base64-encoded image
      let image = response.data.image;
      // ...
    });

  return <></>;
};

export default GAN;
