import React from "react";
import {useGameSettingsContext} from "./GameSettingsContext";
import {useGameResultContext} from "./GameResultContext";
import {Header} from "./Header";
import {Rules} from "./Rules";
import {GameResultInfo} from "./GameResultInfo";
import {WIPInfo} from "./WIPInfo";
import {GameTable} from "./GameTable";
import "./GameRunner.css";
import {EndGame} from "./EndGame";
import {FullScreenHandle} from "react-full-screen";
import {calcNextWeek} from "./GameProcessor";


export const GameRunner = (props: { fullScreenHandler: FullScreenHandle }) => {

    const {initParams} = useGameSettingsContext();
    const {gameResult, setGameResult} = useGameResultContext();

    const calcWeek = () => {
        setGameResult(calcNextWeek(gameResult, initParams));
    }

    return <div className={"GameRunner Text-TT-Norms-Tochka-Extended-S"}>
        <Header fullScreenHandler={props.fullScreenHandler} isLeaderBoard={false}/>
        {gameResult.week < 0 && <Rules onRunGame={() => calcWeek()}/>}
        {gameResult.week >= 0 && gameResult.week < 26 &&
            <>
                <div className={"GameResultBlock"}>
                    <GameResultInfo onRunGame={() => calcWeek()}/>
                    <WIPInfo/>
                </div>
                <GameTable/>
            </>
        }
        {gameResult.week > 25 &&
            <EndGame/>
        }
    </div>
};
