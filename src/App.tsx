import { FC } from "react"
import { TileMatrix } from "./components/TileMatrix/TileMatrix";
import { NeuralNetworkDisplay } from "./components/NeutralNetworkDisplay/NeuralNetworkDisplay";
import "./App.css";

export const App: FC = () => {
  return (
    <main>
      <TileMatrix/>
      <NeuralNetworkDisplay/>
    </main>
  )
}