import {FC} from "react";
import {useGameResultContext} from "./GameResultContext";
import "./WIPInfo.css"
import {useGameSettingsContext} from "./GameSettingsContext";
import {numberWithThousands} from "./GlobalFunctions";

const WIPInfoLine = (props: { header: string, val: number, total: number }) => {

    const green = Math.round(Math.min(Math.max(props.val / props.total, 0), 1) * 100);
    const yellow = Math.round(Math.min(Math.max((props.val - props.total) / props.total, 0), 1) * 100);
    const red = Math.round(Math.min(Math.max((props.val - props.total * 2) / props.total, 0), 1) * 100);

    let clazz: string;
    if (red > 0) {
        clazz = "WIPInfoLineBarRed";
    } else if (yellow > 0) {
        clazz = "WIPInfoLineBarYellow";
    } else {
        clazz = "WIPInfoLineBarGreen";
    }

    return <div className={"WIPInfoLine"}>
        <div className={"WIPInfoLineHeader"}>
            {props.header}
        </div>
        <div className={"WIPInfoLineGauge"}>
            <div className={"WIPInfoLineBar"}>
                <div className={"WIPInfoLineBarGrey"}>
                    <div className={clazz} style={{width: green + "%"}}/>
                </div>
            </div>
            <div className={"WIPInfoLineBar"}>
                <div className={"WIPInfoLineBarGrey"}>
                    <div className={clazz} style={{width: yellow + "%"}}/>
                </div>
            </div>
            <div className={"WIPInfoLineBar"}>
                <div className={"WIPInfoLineBarGrey"}>
                    <div className={clazz} style={{width: red + "%"}}/>
                </div>
            </div>
        </div>
        <div className={"WIPInfoLineText"}>
            {numberWithThousands(props.val)} / {numberWithThousands(props.total)}
        </div>
    </div>;
}

export const WIPInfo: FC = () => {

    const {gameResult} = useGameResultContext();
    const {initParams} = useGameSettingsContext();

    return <div className={"WIPInfo"}>
        <div className={"WIPInfoHeader"}>Объём незавершенной работы (WIP)</div>
        <div className={"WIPINFODisplay"}>
            <WIPInfoLine header={"Анализ"} val={gameResult!.productHours} total={initParams.products.weekPower}/>
            <WIPInfoLine header={"Дизайн"} val={gameResult!.designHours} total={initParams.designers.weekPower}/>
            <WIPInfoLine header={"Редактура"} val={gameResult!.editorHours} total={initParams.editors.weekPower}/>
            <WIPInfoLine header={"Разработка"} val={gameResult!.devHours} total={initParams.developers.weekPower}/>
            <WIPInfoLine header={"Тестирование"} val={gameResult!.testHours} total={initParams.testers.weekPower}/>
        </div>
    </div>;
};
