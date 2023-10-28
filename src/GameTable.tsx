import {FC} from "react";
import {useGameResultContext} from "./GameResultContext";
import "./GameTable.css"
import {TaskInfo} from "./TaskInfo";

export const GameTable: FC = () => {

    const {gameResult} = useGameResultContext();

    return <table className={"GameTable"}>
        <thead>
        <tr>
            {gameResult.colNames.map((name, index) =>
                <th>{name}<br/><span className={"GameTableHeaderCount"}>{gameResult.cols[index].length}</span></th>
            )}
        </tr>
        </thead>
        <tbody>
        <tr>
            {gameResult.cols.map((tasks, colIndex) => <td>{
                tasks.map((task, index) => <TaskInfo col={colIndex} index={index}/>)
            }</td>)}
        </tr>
        </tbody>
    </table>;
};