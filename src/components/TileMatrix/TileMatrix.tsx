import { FC, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { tileMapAtom, updateTileAtom, isMouseDownAtom, Position, networkOutputAtom } from "../../jotaiStore";
import { initTileMatrix } from "../../utils";
import { Tile } from "../Tile/Tile";
import { runNetwork } from "../../neuralNetworkHandler";
import "./TileMatrix.css";

type TrainingData = { output: { [k: string]: 1 }; input: number[]; }[];

export const TileMatrix: FC = () => {
  const [ tileMap, setTileMap ] = useAtom(tileMapAtom);
  const [ , updateTile ] = useAtom(updateTileAtom);
  const [ , setIsMouseDown ] = useAtom(isMouseDownAtom);
  const [ , setNetworkOutput ] = useAtom(networkOutputAtom);

  const [ dataLabel, setDataLabel ] = useState<string>("");
  const [ recordedData, setRecordedData ] = useState<TrainingData>([]);

  useEffect(() => {
    // register mouse down tracker
    document.addEventListener("mousedown", () => setIsMouseDown(true));
    document.addEventListener("mouseup", () => setIsMouseDown(false));
  }, [ setIsMouseDown ]);

  const updateTileInMatrix = (positon: Position, state: boolean) => {
    updateTile([positon, state]);
  }

  const clearTiles = () => {
    setTileMap(initTileMatrix());
  }
  
  const copyTiles = () => {
    let valueToCopy = "";

    tileMap.forEach((row) => {
      row.forEach((tile) => {
        if (valueToCopy != "") {
          valueToCopy = `${valueToCopy}, `;
        }
    
        valueToCopy = `${valueToCopy}${Number(tile)}`;
      })
    })

    navigator.clipboard.writeText(valueToCopy);
  }

  const analyseTiles = () => {
    const valuesToAnalyse: Array<number> = [];

    tileMap.forEach((row) => {
      row.forEach((tile) => {
        valuesToAnalyse.push(Number(tile));
      })
    });

    const output = runNetwork(valuesToAnalyse);
    setNetworkOutput(output);
  }

  const record = () => {
    if (!dataLabel) {
      return;
    }

    const tileMatrix: number[] = [];

    tileMap.forEach((row) => {
      row.forEach((tile) => {
        tileMatrix.push(Number(tile));
      })
    })

    const trainingData: TrainingData = [
      ...recordedData,
      { output: { [dataLabel.toUpperCase()]: 1 }, input: tileMatrix }
    ];

    setRecordedData(trainingData);
    clearTiles();
  }

  const copyRecording = () => {
    navigator.clipboard.writeText(JSON.stringify(recordedData));
  }

  return (
    <div>
      <div className="tile-matrix">
        {tileMap.map((row, x) => (
          row.map((_, y) => (
            <Tile key={x + y} x={x} y={y} updateTile={updateTileInMatrix} />
          ))
        ))}
      </div>
      
      <div className="controls main">
        <button onClick={clearTiles}>clear</button>
        <button onClick={analyseTiles}>analyse</button>
      </div>

      <hr/>

      <div className="controls">
        <div>
          <button onClick={copyTiles}>copy instance raw</button>
        </div>
        <div>
          <button onClick={record}>record</button>
          <input className="data-label" type="text" maxLength={1} value={dataLabel} onChange={(event) => setDataLabel(event.target.value)}/>
          <button onClick={copyRecording}>copy recordings</button>
        </div>
      </div>
    </div>
  )
}