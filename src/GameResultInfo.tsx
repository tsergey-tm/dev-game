import {useGameResultContext} from "./GameResultContext";
import "./GameResultInfo.css"

export const GameResultInfo = () => {

    const {gameResult} = useGameResultContext();

    function numberWithThousands(x: number) {
        return x.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    return <div className={"GameResult"}>
        Неделя: {gameResult.week},
        расходы: {numberWithThousands(gameResult.consumption)} coin,
        доходы: {numberWithThousands(gameResult.income)} coin,
        результат: {numberWithThousands(gameResult.income - gameResult.consumption)} coin<br/>
        Эффективность:
        Продакты {gameResult.effProduct.toString()},
        Дизайнеры {gameResult.effDesigner.toString()},
        Редакторы {gameResult.effEditor.toString()},
        Разработчики {gameResult.effDeveloper.toString()},
        Тестировщики {gameResult.effTester.toString()}
    </div>
};