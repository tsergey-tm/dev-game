import {FC} from "react";
import {Task, useGameResultContext} from "./GameResultContext";
import "./GameTable.css"
import {TaskInfo} from "./TaskInfo";
import {DragDropContext, Draggable, Droppable, DropResult} from "@hello-pangea/dnd";


export const GameTable: FC = () => {

    const {gameResult, setGameResult} = useGameResultContext();

    const getColumnData = (colIndex: number, tasks: Task[]) => {

        const dnd = (colIndex === 0 || colIndex === 1);

        const elements = tasks.map((task, index) => {
                if (dnd) {
                    return <Draggable
                        draggableId={task.name}
                        index={index}
                        key={task.name}
                    >
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <TaskInfo col={colIndex} index={index} moveTask={moveTask}/>
                            </div>
                        )}
                    </Draggable>
                } else {
                    return <TaskInfo key={task.name} col={colIndex} index={index} moveTask={moveTask}/>;
                }
            }
        );

        if (colIndex === 1 && elements.length === 0) {
            elements.push(
                <div className={"GameTableColEmpty Text-TT-Norms-Tochka-Extended-M"} key={"GameTableColEmpty"}>
                    <div className={"GameTableColEmptyText Text-TT-Norms-Tochka-Extended-S"}>
                        Перетащи задачу сюда, чтобы запланировать.
                        В&nbsp;работу&nbsp;задачи берутся<br/>
                        сверху&nbsp;&#8595;&nbsp;вниз.
                    </div>
                    <div className={"GameTableColEmptyCard GameTableColEmptyCard1"}>1</div>
                    <div className={"GameTableColEmptyCard GameTableColEmptyCard2"}>2</div>
                    <div className={"GameTableColEmptyCard GameTableColEmptyCard3"}>3</div>
                    <div className={"GameTableColEmptyCard GameTableColEmptyCard4"}>4</div>
                </div>
            )
        }

        if (colIndex === 0 || colIndex === 1) {
            return <Droppable droppableId={`${colIndex}`} direction={"vertical"}>
                {
                    (provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            className={"GameTableColDrop " + (snapshot.isDraggingOver ? "GameTableColDropReady" : "")}
                            {...provided.droppableProps}
                        >
                            {elements}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>;
        } else {
            return <div className={"GameTableColContainer"}>{elements}</div>;
        }
    }

    const moveTask = (colFrom: number, indexFrom: number, colTo: number, indexTo: number) => {

        const newGameResult = gameResult.clone();

        newGameResult.cols[colTo].splice(indexTo, 0, ...newGameResult.cols[colFrom].splice(indexFrom, 1));

        setGameResult(newGameResult);
    };

    const onDrop = (result: DropResult) => {

        if (result.destination === null) {
            return;
        }

        const colFrom: number = parseInt(result.source.droppableId);
        const colTo: number = parseInt(result.destination.droppableId);

        moveTask(colFrom, result.source.index, colTo, result.destination.index);
    }

    return <>
        <div className={"GameTable"}>
            <DragDropContext
                onDragEnd={(result: DropResult) => onDrop(result)}>
                {gameResult.colNames
                    .map((name, index) =>
                        <div key={"GameTableColHeader" + index}
                             className={"GameTableColHeader" +
                                 (index % 2 === 0 ? " GameTableColHeaderOdd" : " GameTableColHeaderEven") +
                                 (index > 1 ? " GameTableColHideable" : "")
                             }>
                            <div className={"GameTableColHeaderCaption Text-ABC-Gravity-L"}
                                 dangerouslySetInnerHTML={{__html: name}}
                            />
                            {[0, 1, 11].includes(index) &&
                                <div className={"GameTableColHeaderCounterBlock"}>
                                    <div className={"GameTableColCounter Text-TT-Norms-Tochka-Extended-S"}>
                                        {gameResult.cols[index].length}
                                    </div>
                                </div>
                            }
                        </div>
                    )}
                {gameResult.cols
                    .map((tasks, colIndex) =>
                        <div key={"GameTableCol" + colIndex}
                             className={"GameTableColTasks" +
                                 (colIndex % 2 === 0 ? " GameTableColTasksOdd" : " GameTableColTasksEven") +
                                 (colIndex > 1 ? " GameTableColHideable" : "")}>
                            {getColumnData(colIndex, tasks)}
                        </div>
                    )}
            </DragDropContext>
        </div>
    </>;
};
