import { NeuralNetwork, utilities } from "brain.js";
import trainingData from "./assets/trainingData/trainingData_2.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let net: any;

export const initNetwork = () => {
  // provide optional config object (or undefined). Defaults shown.
  const config = {
    inputSize: 256,
    hiddenLayers: [128],
    outputSize: 26,
  };
  
  // create a simple feed-forward neural network with backpropagation
  net = new NeuralNetwork(config);

  net.train(trainingData);
}

export const runNetwork = (input: Array<number>) => {
  return net.run(input);
}

export const getSvgOfNetwork = () => {
  return utilities.toSVG(net, {
    height: 2000,
    width: 2000,
    radius: 6,
    line: {
      className: '',
      width: 0.5,
      color: 'black',
    },
    inputs: {
      className: '',
      color: 'rgba(0, 128, 0, 0.5)',
    },
    hidden: {
      className: '',
      color: 'rgba(255, 127, 80, 0.5)',
    },
    outputs: {
      className: '',
      color: 'rgba(100, 149, 237, 0.5)',
    },
    fontSize: '16px',
  });
}
