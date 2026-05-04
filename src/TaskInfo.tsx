import {FC} from "react";
import {useGameResultContext} from "./GameResultContext";
import "./TaskInfo.css"
import {useUserSettingsContext} from "./UserSettingsContext";
import {KeysBottomImg, KeysDownImg, KeysLeftImg, KeysRightImg, KeysTopImg, KeysUpImg} from "./images";
import {numberWithThousandsNbsp} from "./GlobalFunctions";

export type MoveTaskCallback = (colFrom: number, indexFrom: number, colTo: number, indexTo: number) => void;

export type TaskInfoCoord = {
    col: number;
    index: number;
    moveTask: MoveTaskCallback;
}

export const TaskInfo: FC<TaskInfoCoord> = (props) => {

    const {gameResult} = useGameResultContext();
    const {userSettings} = useUserSettingsContext();

    const task = gameResult!.cols[props.col][props.index];

    const moveTop = (col: number, index: number) => {
        if (index > 0) {
            props.moveTask(col, index, col, 0);
        }
    };

    const moveUp = (col: number, index: number) => {
        if (index > 0) {
            props.moveTask(col, index, col, index - 1);
        }
    };

    const moveDown = (col: number, index: number) => {
        if (index < gameResult!.cols[col].length - 1) {
            props.moveTask(col, index, col, index + 1);
        }
    };

    const moveBottom = (col: number, index: number) => {
        if (index < gameResult!.cols[col].length - 1) {
            props.moveTask(col, index, col, gameResult!.cols[col].length - 1);
        }
    };

    const moveToDo = (col: number, index: number) => {
        props.moveTask(col, index, col + 1, gameResult!.cols[col + 1].length);
    };

    const moveBacklog = (col: number, index: number) => {
        props.moveTask(col, index, col - 1, gameResult!.cols[col - 1].length);
    };

    const getButtons = (props: TaskInfoCoord) => {


        if (props.col === 0) {
            return <>
                <div className={"TaskInfoButtons"}>
                    <KeysTopImg className={"TaskInfoKeys"} onClick={() => moveTop(props.col, props.index)}/>
                    <KeysUpImg className={"TaskInfoKeys"} onClick={() => moveUp(props.col, props.index)}/>
                    <KeysDownImg className={"TaskInfoKeys"} onClick={() => moveDown(props.col, props.index)}/>
                    <KeysBottomImg className={"TaskInfoKeys"} onClick={() => moveBottom(props.col, props.index)}/>
                    <KeysRightImg className={"TaskInfoKeys"}
                                  onClick={() => moveToDo(props.col, props.index)}/>
                </div>
                <div className={"TaskInfoButtonsCompact"}>
                    <KeysTopImg className={"TaskInfoKeys"} onClick={() => moveTop(props.col, props.index)}/>
                    <KeysUpImg className={"TaskInfoKeys"} onClick={() => moveUp(props.col, props.index)}/>
                    <div className={"TaskInfoKeysColChange"}>
                        <KeysRightImg className={"TaskInfoKeys"}
                                      onClick={() => moveToDo(props.col, props.index)}/>
                    </div>
                    <KeysBottomImg className={"TaskInfoKeys"} onClick={() => moveBottom(props.col, props.index)}/>
                    <KeysDownImg className={"TaskInfoKeys"} onClick={() => moveDown(props.col, props.index)}/>
                </div>
            </>;
        } else {
            return <>
                <div className={"TaskInfoButtons"}>
                    <KeysLeftImg className={"TaskInfoKeys TaskInfoKeysColChange"}
                                 onClick={() => moveBacklog(props.col, props.index)}/>
                    <KeysTopImg className={"TaskInfoKeys"} onClick={() => moveTop(props.col, props.index)}/>
                    <KeysUpImg className={"TaskInfoKeys"} onClick={() => moveUp(props.col, props.index)}/>
                    <KeysDownImg className={"TaskInfoKeys"} onClick={() => moveDown(props.col, props.index)}/>
                    <KeysBottomImg className={"TaskInfoKeys"} onClick={() => moveBottom(props.col, props.index)}/>
                </div>
                <div className={"TaskInfoButtonsCompact"}>
                    <div className={"TaskInfoKeysColChange"}>
                        <KeysLeftImg className={"TaskInfoKeys"}
                                     onClick={() => moveBacklog(props.col, props.index)}/>
                    </div>
                    <KeysUpImg className={"TaskInfoKeys"} onClick={() => moveUp(props.col, props.index)}/>
                    <KeysTopImg className={"TaskInfoKeys"} onClick={() => moveTop(props.col, props.index)}/>
                    <KeysDownImg className={"TaskInfoKeys"} onClick={() => moveDown(props.col, props.index)}/>
                    <KeysBottomImg className={"TaskInfoKeys"} onClick={() => moveBottom(props.col, props.index)}/>
                </div>
            </>;
        }
    }

    return <div className={"TaskInfo"}>
        <div className={"TaskInfoCaption"}>{task.name}</div>
        {(task.notStarted || task.product > 0) &&
            <div className={"TaskInfoDataLine"}>
                <div className={"TaskInfoData"}>Анализ</div>
                <div className={"TaskInfoDataNum"}>{task.product}</div>
            </div>
        }
        {(task.notStarted || task.designer > 0) &&
            <div className={"TaskInfoDataLine"}>
                <div className={"TaskInfoData"}>Дизайн</div>
                <div className={"TaskInfoDataNum"}>{task.designer}</div>
            </div>
        }
        {(task.notStarted || task.editor > 0) &&
            <div className={"TaskInfoDataLine"}>
                <div className={"TaskInfoData"}>Редактура</div>
                <div className={"TaskInfoDataNum"}>{task.editor}</div>
            </div>
        }
        {(task.notStarted || task.developer > 0) &&
            <div className={"TaskInfoDataLine"}>
                <div className={"TaskInfoData"}>Разработка</div>
                <div className={"TaskInfoDataNum"}>{task.developer}</div>
            </div>
        }
        {(task.notStarted || task.tester > 0) &&
            <div className={"TaskInfoDataLine"}>
                <div className={"TaskInfoData"}>Тестирование</div>
                <div className={"TaskInfoDataNum"}>{task.tester}</div>
            </div>
        }
        {(task.notStarted && task.license > 0) &&
            <div className={"TaskInfoDataLine"}>
                <div className={"TaskInfoData"}>Лицензия</div>
                <div className={"TaskInfoDataNum"}
                     dangerouslySetInnerHTML={{"__html": numberWithThousandsNbsp(task.license)}}/>
            </div>
        }
        {(task.notStarted || task.product + task.designer + task.editor + task.developer + task.tester > 0) &&
            <div className={"TaskInfoSpaceDiv"}/>
        }
        <div className={"TaskInfoDataLine"}>
            <div className={"TaskInfoData"}>Доход</div>
            <div className={"TaskInfoDataNum TaskInfoDataMoney"}
                 dangerouslySetInnerHTML={{"__html": numberWithThousandsNbsp(task.money + task.license)}}/>
        </div>
        {task.notStarted &&
            <>
                <div className={"TaskInfoDataLine"}>
                    <div className={"TaskInfoData"}>Себестоимость</div>
                    <div className={"TaskInfoDataNum"}
                         dangerouslySetInnerHTML={{"__html": numberWithThousandsNbsp(task.primeCost + task.license)}}/>
                </div>
                {userSettings.showKeys && getButtons(props)}
            </>
        }
    </div>
}
