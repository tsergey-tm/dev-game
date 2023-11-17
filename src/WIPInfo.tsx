import {FC} from "react";
import {useGameResultContext} from "./GameResultContext";
import "./WIPInfo.css"

export const WIPInfo: FC = () => {

    const {gameResult} = useGameResultContext();

    let taskCnt = 0;
    let productCnt = 0;
    let designCnt = 0;
    let editorCnt = 0;
    let devCnt = 0;
    let testCnt = 0;


    gameResult.cols.slice(1, -1).flat().forEach((task) => {
        taskCnt++;
        productCnt += task.product;
        designCnt += task.designer;
        editorCnt += task.editor;
        devCnt += task.developer;
        testCnt += task.tester;
    });

    return <div className={"WIPInfo"}>
        Объём запланированной и незавершенной работы:&nbsp;
        {taskCnt}&nbsp;задач,&nbsp;
        {productCnt}&nbsp;часов&nbsp;продакта,&nbsp;
        {designCnt}&nbsp;часов&nbsp;дизайнера,&nbsp;
        {editorCnt}&nbsp;часов&nbsp;редактора,&nbsp;
        {devCnt}&nbsp;часов&nbsp;разработки,&nbsp;
        {testCnt}&nbsp;часов&nbsp;тестирования
    </div>;
};