import { useAtom } from "jotai";
import { FC, useMemo } from "react";
import { networkOutputAtom } from "../../jotaiStore";
import "./NeuralNetworkDisplay.css";

export const NeuralNetworkDisplay: FC = () => {
  const [ networkOutput ] = useAtom(networkOutputAtom);

  const predictions = useMemo(() => (
    Object.keys(networkOutput)
      .map((key) => ({ key, value: networkOutput[key] }))
  ), [networkOutput]);

  const sortedPredictionsByScore = useMemo(() => (
    [...predictions].sort((a, b) => b.value - a.value)
  ), [predictions]);

  const sortedPredictionsByKey = useMemo(() => (
    [...predictions].sort((a, b) => a.key.localeCompare(b.key))
  ), [predictions]);

  return (
    <div className="results">
      <div>
        <h3>Predictions by Score</h3>
        <div>
          <table>
            <tbody>
              {sortedPredictionsByScore.map((prediction) => (
                <tr key={prediction.key}>
                  <td>{prediction.key}</td>
                  <td>{(prediction.value * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h3>Predictions by Alphabet</h3>
        <div>
          <table>
            <tbody>
              {sortedPredictionsByKey.map((prediction) => (
                <tr key={prediction.key}>
                  <td>{prediction.key}</td>
                  <td>{(prediction.value * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <br/>
      <br/>
      <div dangerouslySetInnerHTML={{__html: getSvgOfNetwork()}}></div> */}
    </div>
  )
}