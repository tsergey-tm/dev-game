import './EndGame.css';
import {useGameResultContext} from "./GameResultContext";
import {TargetImg, TargetMissImg} from "./images";
import {numberWithThousands} from "./GlobalFunctions";
import React from "react";
import {Link} from "react-router";

export const EndGame = () => {

    const {gameResult} = useGameResultContext();

    const profit = gameResult!.income - gameResult!.consumption;

    const targetIcon = () => {
        if (profit >= 0) {
            return <TargetImg className={"EndGameResultIcon2Img"}/>;
        } else {
            return <TargetMissImg className={"EndGameResultIcon2Img"}/>;
        }
    }

    const getBadGameText = () => {
        return <div className={"EndGameInfoText"}>
            <div className={"EndGameInfoCaption"}>
                Как&nbsp;улучшить результат? Читай в&nbsp;нашей статье!
            </div>
            <div className={"EndGameInfoText1"}>
                Игра основана на&nbsp;теории ограничений Голдратта.
                Помни о&nbsp;том, что в&nbsp;любой системе есть ограничение&nbsp;—
                именно оно и&nbsp;определяет её пропускную способность.
            </div>
        </div>;
    }

    const getGoodGameText = () => {
        return <div className={"EndGameInfoText"}>
            <div className={"EndGameInfoCaption"}>
                У&nbsp;тебя есть нужная сумма, проект жив. Кайф, поздравляем!
            </div>
            <div className={"EndGameInfoText1"}>
                Играй ещё&nbsp;— вдруг получится улучшить результат?
            </div>
        </div>;
    }

    return <div className={"EndGame"}>
        <div className={"EndGameHeaderBlock"}>
            <div className={"EndGameResultIcon1"}>
            </div>
            <div className={"EndGameBlock"}>
                <div className={"EndGameResultHeader"}>
                    Прошло полгода,<br/>твой результат
                </div>
                <div className={"EndGameResultProfit"}>
                    {numberWithThousands(profit)}
                    <div className={"EndGameResultIcon2"}>{targetIcon()}</div>
                </div>
            </div>
        </div>
        <div className={"EndGameBlock"}>
            <div className={"EndGameInfo"}>
                {profit < 0 ? getBadGameText() : getGoodGameText()}
            </div>
        </div>
        <Link to={"/article"} className={"EndGameArticleLink"}>
            <div className={"EndGameButton"}>
                Читать статью
            </div>
        </Link>
        <div className={"EndGameBlock"} onClick={() => window.location.reload()}>
            <div className={"EndGameButton"}>
                Играть ещё!
            </div>
        </div>
    </div>;
}
