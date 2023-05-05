import * as tf from "@tensorflow/tfjs";

const BaseModel = (props) => {
  const model = tf.sequential();

  // Add convolutional and pooling layers
  model.add(
    tf.layers.conv2d({
      /* ... */
    })
  );
  model.add(
    tf.layers.maxPooling2d({
      /* ... */
    })
  );
  // ... more layers ...

  // Add final dense layers for output
  model.add(
    tf.layers.dense({
      /* ... */
    })
  );

  // Compile the model
  model.compile({
    optimizer: tf.train.adam(/* learning rate */),
    loss: test,
    metrics: ["accuracy"],
  });

  //   async function trainModel() {
  //     const history = await model.fit(trainImages, trainLabels, {
  //       epochs: 20,
  //       batchSize: 20,
  //       validationData: [valImages, valLabels],
  //       callbacks: 20,
  //     });
  //     return history;
  //   }

  return <></>;
};

export default BaseModel;
