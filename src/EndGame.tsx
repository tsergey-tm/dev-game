import './EndGame.css';
import {useGameResultContext} from "./GameResultContext";
import {ButtonGoodImg, ButtonImg, EndGameImg, TargetImg, TargetMissImg} from "./images";
import {numberWithThousands} from "./GlobalFunctions";
import React from "react";
import {Link} from "react-router";

export const EndGame = () => {

    const {gameResult} = useGameResultContext();

    const profit = gameResult.income - gameResult.consumption;

    const targetIcon = () => {
        if (profit >= 0) {
            return <TargetImg className={"EndGameResultIcon2Img"}/>;
        } else {
            return <TargetMissImg className={"EndGameResultIcon2Img"}/>;
        }
    }

    const getBadGameText = () => {
        return <div className={"EndGameInfoText"}>
            <div className={"EndGameInfoCaption Text-TT-Norms-Tochka-Extended-DemiBold-XXL"}>
                Как&nbsp;улучшить результат? Читай в&nbsp;нашей статье!
            </div>
            <div className={"EndGameInfoText1 Text-TT-Norms-Tochka-Extended-Medium-L"}>
                Игра основана на&nbsp;теории ограничений Голдратта.
                Помни о&nbsp;том, что в&nbsp;любой системе есть ограничение&nbsp;—
                именно оно и&nbsp;определяет её пропускную способность.
            </div>
        </div>;
    }

    const getGoodGameText = () => {
        return <div className={"EndGameInfoText"}>
            <div className={"EndGameInfoCaption Text-TT-Norms-Tochka-Extended-DemiBold-XXL"}>
                У&nbsp;тебя есть нужная сумма, проект жив. Кайф, поздравляем!
            </div>
            <div className={"EndGameInfoText1 Text-TT-Norms-Tochka-Extended-Medium-L"}>
                Играй ещё&nbsp;— вдруг получится улучшить результат?
            </div>
        </div>;
    }

    return <div className={"EndGame"}>
        <div className={"EndGameHeaderBlock"}>
            <div className={"EndGameResultIcon1"}>
                {profit < 0 ?
                    <ButtonImg className={"EndGameResultIcon1Img"}/> :
                    <ButtonGoodImg className={"EndGameResultIcon1Img"}/>}
            </div>
            <div className={"EndGameBlock"}>
                <EndGameImg className={"EndGameResultHeaderImg"}/>
                <div className={"EndGameResultProfit Text-ABC-Gravity-XXXL"}>
                    {numberWithThousands(profit)}
                </div>
            </div>
            <div className={"EndGameResultIcon2"}>{targetIcon()}</div>
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
