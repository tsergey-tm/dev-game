import {useGameResultContext} from "./GameResultContext";
import "./GameResultInfo.css"
import {CoinImg} from "./images";
import {numberWithThousands} from "./GlobalFunctions";
import {SimpleCallbackRef} from "./Constants";

export const GameResultInfo = (props: { onRunGame: SimpleCallbackRef }) => {

    const {gameResult} = useGameResultContext();

    return <div className={"GameResult"}>
        <div className={"GameResultInfoBlock"}>
            <div className={"GameResultInfoBlockText1"}>
                Неделя: {gameResult!.week} из 26
            </div>
            <div className={"GameResultInfoBlockBlock"}>
                <div className={"GameResultInfoBlockText2"} title={
                    numberWithThousands(gameResult!.income) + " - " + numberWithThousands(gameResult!.consumption)
                }>
                    {numberWithThousands(gameResult!.income - gameResult!.consumption)}
                </div>
                <div className={"GameResultInfoBlockCoin"}>
                    <CoinImg className={"SvgFillContainer"}/>
                </div>
            </div>
        </div>
        <div className={"GameResultButton"} onClick={() => props.onRunGame()}>
            Запустить неделю
        </div>
    </div>
};
