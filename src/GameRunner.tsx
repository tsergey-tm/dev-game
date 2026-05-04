import React from "react";
import {useGameSettingsContext} from "./GameSettingsContext";
import {GameResult, useGameResultContext} from "./GameResultContext";
import {Header} from "./Header";
import {Rules} from "./Rules";
import {GameResultInfo} from "./GameResultInfo";
import {WIPInfo} from "./WIPInfo";
import {GameTable} from "./GameTable";
import "./GameRunner.css";
import {EndGame} from "./EndGame";
import {FullScreenHandle} from "react-full-screen";
import {calcNextWeek} from "./GameProcessor";
import taskGenerator from "./TaskGenerator";


export const GameRunner = (props: { fullScreenHandler: FullScreenHandle }) => {

    const {initParams} = useGameSettingsContext();
    const {gameResult, setGameResult} = useGameResultContext();

    const calcWeek = () => {
        setGameResult(calcNextWeek(gameResult!, initParams));
    }

    const startGame = (isHard: boolean) => {
        setGameResult(calcNextWeek(new GameResult(taskGenerator(isHard), isHard), initParams));
    }

    return <div className={"GameRunner"}>
        <Header fullScreenHandler={props.fullScreenHandler} isLeaderBoard={false}/>
        {gameResult === undefined && <Rules onRunGame={(isHard: boolean) => startGame(isHard)}/>}
        {gameResult !== undefined && gameResult.week >= 0 && gameResult.week < 26 &&
            <>
                <div className={"GameResultBlock"}>
                    <GameResultInfo onRunGame={() => calcWeek()}/>
                    <WIPInfo/>
                </div>
                <GameTable/>
            </>
        }
        {gameResult !== undefined && gameResult.week > 25 &&
            <EndGame/>
        }
    </div>
};
