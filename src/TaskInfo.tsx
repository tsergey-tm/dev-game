import {FC} from "react";
import {Task, useGameResultContext} from "./GameResultContext";
import "./TaskInfo.css"
import {useGameSettingsContext} from "./GameSettingsContext";

export type TaskInfoCoord = {
    col: number;
    index: number;
}

export const TaskInfo: FC<TaskInfoCoord> = (props) => {

    const {gameResult, setGameResult} = useGameResultContext();
    const {initParams} = useGameSettingsContext();

    const task = gameResult.cols[props.col][props.index];

    const calcPrimeCost = (task: Task) =>
        task.product * initParams.products.weekMoney / initParams.products.weekPower +
        task.designer * initParams.designers.weekMoney / initParams.designers.weekPower +
        task.editor * initParams.editors.weekMoney / initParams.editors.weekPower +
        task.developer * initParams.developers.weekMoney / initParams.developers.weekPower +
        task.tester * initParams.testers.weekMoney / initParams.testers.weekPower;

    const takeToDo = (index: number) => {
        const newGameResult = gameResult.clone();

        newGameResult.cols[1].push(...newGameResult.cols[0].splice(index, 1));

        setGameResult(newGameResult);
    }

    const toBacklog = (index: number) => {
        const newGameResult = gameResult.clone();

        newGameResult.cols[0].unshift(...newGameResult.cols[1].splice(index, 1));

        setGameResult(newGameResult);
    }

    const moveToTop = (col: number, index: number) => {

        if (index === 0) {
            return;
        }

        const newGameResult = gameResult.clone();

        newGameResult.cols[col].splice(0, 0, ...newGameResult.cols[col].splice(index, 1));

        setGameResult(newGameResult);
    }

    const moveUp = (col: number, index: number) => {

        if (index === 0) {
            return;
        }

        const newGameResult = gameResult.clone();

        newGameResult.cols[col].splice(index - 1, 0, ...newGameResult.cols[col].splice(index, 1));

        setGameResult(newGameResult);
    }

    const moveDown = (col: number, index: number) => {

        if (index >= gameResult.cols[col].length) {
            return;
        }

        const newGameResult = gameResult.clone();

        newGameResult.cols[col].splice(index + 1, 0, ...newGameResult.cols[col].splice(index, 1));

        setGameResult(newGameResult);
    }

    const moveToBottom = (col: number, index: number) => {

        const length = gameResult.cols[col].length;
        if (index >= length) {
            return;
        }

        const newGameResult = gameResult.clone();

        newGameResult.cols[col].splice(length - 1, 0, ...newGameResult.cols[col].splice(index, 1));

        setGameResult(newGameResult);
    }

    return <div className={"TaskInfo"}>
        <table>
            <tbody>
            <tr>
                <td className={"TaskInfoName"} colSpan={4}>{task.name}</td>
            </tr>
            {task.endWeek < 0 &&
                <tr>
                    {(task.notStarted && props.col === 1) && <td rowSpan={7}>
                        <div className={"TaskInfoMoveButton"}
                             title={"Вернуть в backlog"}
                             onClick={() => toBacklog(props.index)}
                        >&nbsp;&#10094;&nbsp;</div>
                    </td>}
                    <td className={"TaskInfoData"}>Анализ</td>
                    <td className={"TaskInfoData"}>{task.product}</td>
                    {task.notStarted &&
                        <td rowSpan={task.notStarted ? 7 : 6}>
                            <div className={"TaskInfoMoveButton"}
                                 title={"В самый верх"}
                                 onClick={() => moveToTop(props.col, props.index)}
                            >&nbsp;&#10514;&nbsp;</div>
                            <div className={"TaskInfoMoveButton"}
                                 title={"Выше"}
                                 onClick={() => moveUp(props.col, props.index)}
                            >&nbsp;&#8593;&nbsp;</div>
                            <div className={"TaskInfoMoveButton"}
                                 title={"Ниже"}
                                 onClick={() => moveDown(props.col, props.index)}
                            >&nbsp;&#8595;&nbsp;</div>
                            <div className={"TaskInfoMoveButton"}
                                 title={"В самый низ"}
                                 onClick={() => moveToBottom(props.col, props.index)}
                            >&nbsp;&#10515;&nbsp;</div>
                        </td>
                    }
                    {(task.notStarted && props.col === 0) && <td rowSpan={7}>
                        <div className={"TaskInfoMoveButton"}
                             title={"Взять в работу"}
                             onClick={() => takeToDo(props.index)}
                        >&nbsp;&#10095;&nbsp;</div>
                    </td>}
                </tr>
            }
            {task.endWeek < 0 &&
                <tr>
                    <td className={"TaskInfoData"}>Дизайн</td>
                    <td className={"TaskInfoData"}>{task.designer}</td>
                    <td>&nbsp;</td>
                </tr>
            }
            {task.endWeek < 0 &&
                <tr>
                    <td className={"TaskInfoData"}>Редактура</td>
                    <td className={"TaskInfoData"}>{task.editor}</td>
                    <td>&nbsp;</td>
                </tr>
            }
            {task.endWeek < 0 &&
                <tr>
                    <td className={"TaskInfoData"}>Разработка</td>
                    <td className={"TaskInfoData"}>{task.developer}</td>
                    <td>&nbsp;</td>
                </tr>
            }
            {task.endWeek < 0 &&
                <tr>
                    <td className={"TaskInfoData"}>Тестирование</td>
                    <td className={"TaskInfoData"}>{task.tester}</td>
                    <td>&nbsp;</td>
                </tr>
            }
            <tr>
                <td className={"TaskInfoData"}>Доход</td>
                <td className={"TaskInfoData TaskInfoDataMoney"}>{task.money}</td>
                <td>&nbsp;</td>
            </tr>
            {(task.notStarted) &&
                <tr>
                    <td className={"TaskInfoData"}>Себестоимость</td>
                    <td className={"TaskInfoData"}>{calcPrimeCost(task)}</td>
                    <td>&nbsp;</td>
                </tr>
            }
            </tbody>
        </table>

    </div>
}