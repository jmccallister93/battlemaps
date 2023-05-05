import * as tf from "@tensorflow/tfjs";
import { useEffect } from "react";

const BaseModel = (props) => {
  const trainImageUrls = [
    // Add your training image URLs here
  ];

  const trainLabels = [
    // Add your training labels here
  ];

  const valImageUrls = [
    // Add your validation image URLs here
  ];

  const valLabels = [
    // Add your validation labels here
  ];

  const model = tf.sequential();

  // Add convolutional and pooling layers
  model.add(
    tf.layers.conv2d({
      inputShape: [28, 28, 1], // Image dimensions and number of color channels (e.g., grayscale: 1, RGB: 3)
      filters: 32, // Number of filters (kernels) in the layer
      kernelSize: 3, // Size of the filters (3x3)
      activation: "relu", // Activation function (e.g., 'relu', 'tanh', 'sigmoid')
      padding: "same", // Padding type ('same' or 'valid')
    })
  );
  model.add(
    tf.layers.maxPooling2d({
      poolSize: [2, 2], // Size of pooling region (2x2)
      strides: [2, 2], // Step size for moving the pooling window
    })
  );
  // ... more layers if needed ...

  // Flatten the tensor before the dense layer
  model.add(tf.layers.flatten());

  // Add final dense layers for output
  model.add(
    tf.layers.dense({
      units: 10, // Number of output units (e.g., number of classes in a classification problem)
      activation: "softmax", // Activation function for output (e.g., 'softmax' for classification)
    })
  );

  // Compile the model
  model.compile({
    optimizer: tf.train.adam(0.001), // Change learning rate to a smaller value like 0.001
    loss: "categoricalCrossentropy", // Change loss function for classification (e.g., "categoricalCrossentropy")
    metrics: ["accuracy"],
  });

  //Load images form API
  async function loadImage(url) {
    const response = await fetch(url);
    const imageBlob = await response.blob();
    const imageBitmap = await createImageBitmap(imageBlob);
    const imageTensor = tf.browser
      .fromPixels(imageBitmap)
      .resizeNearestNeighbor([28, 28])
      .expandDims(0);
    return imageTensor;
  }

  //Load Dataset from API
  async function loadDataset(imageUrls, labels) {
    const imageTensors = [];
    const labelTensors = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const imageTensor = await loadImage(imageUrls[i]);
      imageTensors.push(imageTensor);

      // Assuming labels are one-hot encoded
      const labelTensor = tf.tensor1d(labels[i], "int32");
      labelTensors.push(labelTensor);
    }

    const images = tf.concat(imageTensors);
    const finalLabels = tf.concat(labelTensors); // Renamed to finalLabels

    return { images, finalLabels }; // Updated to finalLabels
  }

  //Prepare iamges for training
  async function prepareData() {
    const trainData = await loadDataset(trainImageUrls, trainLabels);
    const valData = await loadDataset(valImageUrls, valLabels);

    // Normalize the image data to the range [0, 1]
    trainData.images = trainData.images.div(255);
    valData.images = valData.images.div(255);

    return {
      trainImages: trainData.images,
      trainLabels: trainData.labels,
      valImages: valData.images,
      valLabels: valData.labels,
    };
  }

  async function main() {
    const { trainImages, trainLabels, valImages, valLabels } =
      await prepareData();
    const history = await trainModel(
      trainImages,
      trainLabels,
      valImages,
      valLabels
    );
  }

  // Pass the data as arguments to the trainModel function
  async function trainModel(trainImages, trainLabels, valImages, valLabels) {
    const history = await model.fit(trainImages, trainLabels, {
      epochs: 20,
      batchSize: 32,
      validationData: [valImages, valLabels],
      // Remove callbacks if you don't need it
    });
    return history;
  }

  useEffect(() => {
    main();
  }, []);

  return <></>;
};

export default BaseModel;
