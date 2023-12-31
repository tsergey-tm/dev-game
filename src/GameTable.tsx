import {FC} from "react";
import {useGameResultContext} from "./GameResultContext";
import "./GameTable.css"
import {TaskInfo} from "./TaskInfo";

export const GameTable: FC = () => {

    const {gameResult} = useGameResultContext();

    return <table className={"GameTable"}>
        <thead>
        <tr>
            {gameResult.colNames.map(name =>
                <th>{name}</th>
            )}
        </tr>
        <tr>
            {gameResult.colNames.map((_name, index) =>
                <td>{gameResult.cols[index].length}</td>
            )}
        </tr>
        </thead>
        <tbody>
        <tr>
            {gameResult.cols.map((tasks, colIndex) => <td>{
                tasks.map((_task, index) => <TaskInfo col={colIndex} index={index}/>)
            }</td>)}
        </tr>
        </tbody>
    </table>;
};