import "./Rules.css";
import React from "react";
import {GameSettingsInfo} from "./GameSettingsInfo";
import {LeveledCallbackRef} from "./Constants";
import {numberWithThousandsNbsp} from "./GlobalFunctions";
import {startConsumption} from "./TaskGenerator";

export const Rules = (props: { onRunGame: LeveledCallbackRef }) => {

    const beginButtonClick = (isHard: boolean) => {

        props.onRunGame(isHard);
    };

    return <div className={"RulesBlock"}>
        <div className={"RulesInnerBlockContextHeaderBlock"}>
            <div className={"RulesInnerBlockContextHeader"}>
                <div className={"RulesInnerBlockContextHeaderCaption"}>
                    Правила игры
                </div>
                <div className={"RulesInnerBlockContextHeaderText3"}>
                    У&nbsp;тебя стартап с&nbsp;идеальной командой: все обещают полгода не&nbsp;болеть
                    и&nbsp;не&nbsp;ходить в&nbsp;отпуск.<br/>
                    Управляй заказами так, чтобы за&nbsp;6&nbsp;месяцев выйти в&nbsp;прибыль, иначе проект закроют.
                </div>
            </div>
        </div>
        <div className={"RulesInnerBlockContextBlock"}>
            <div className={"RulesInnerBlockContextBlockTitle"}>
                Команда
            </div>
            <div className={"RulesInnerBlockContextBlockText"}>
                <p>
                    Есть продакт, 10&nbsp;программистов, 2&nbsp;тестировщика.
                    Тестировщиков мало, поэтому они могут не&nbsp;справиться с&nbsp;нагрузкой.
                    Ещё в&nbsp;команде дизайнер и&nbsp;редактор на&nbsp;полставки, но они доступны в&nbsp;любое время.
                </p>
                <p>
                    Ниже — описание нормы расхода для каждого.
                </p>
            </div>
            <GameSettingsInfo/>
            <div className={"RulesInnerBlockContextBlockTitle"}>
                Заказы
            </div>
            <div className={"RulesInnerBlockContextBlockText"}>
                <p>
                    Каждые 2&nbsp;недели появляются новые заказы.
                    В&nbsp;карточке заказа указаны: сколько человеко-часов нужно на&nbsp;каждом этапе,
                    прибыль после завершения и&nbsp;себестоимость.
                    Себестоимость&nbsp;— это сумма часов этапа, умноженная на&nbsp;стоимость нормочаса.
                    Сотрудники на&nbsp;окладах: платить им&nbsp;придётся, даже если они не&nbsp;заняты.
                </p>
                <p>
                    Пока заказ не&nbsp;в&nbsp;работе, можно менять приоритет, брать заказ в&nbsp;работу или возвращать
                    в&nbsp;бэклог.
                    После старта&nbsp;— приоритет изменить нельзя.<br/>
                    Все заказы делать не&nbsp;обязательно&nbsp;— ваша задача выжить с командой за полгода.
                </p>
            </div>
            <div className={"RulesInnerBlockContextBlockTitle"}>
                Процесс
            </div>
            <div className={"RulesInnerBlockContextBlockText"}>
                <p>
                    Работа над&nbsp;заказом идет последовательно: в&nbsp;начале продакт, потом дизайнер,
                    следом редактор, наконец разработчики&nbsp;и за&nbsp;ними тестировщики.<br/>
                    (В мобильной версии нам пришлось оставить только две колонки &quot;Заказы&quot;&nbsp;и
                    &quot;Будем делать&quot;, но&nbsp;вся работа проходит так&nbsp;же, просто&nbsp;вы этого
                    не&nbsp;видите)<br/>
                    Команда смотрит новые задачи каждые 2&nbsp;часа.<br/>
                    Рабочий день&nbsp;— 8&nbsp;часов, неделя&nbsp;— 40&nbsp;часов.<br/>
                    Раз в&nbsp;неделю выходит отчёт, где можно менять приоритеты заказов, которые ещё не&nbsp;начаты.
                </p>
            </div>
            <div className={"RulesInnerBlockContextBlockTitle"}>
                Цель
            </div>
            <div className={"RulesInnerBlockContextBlockText"}>
                <p>
                    Заработать как&nbsp;можно больше денег за&nbsp;полгода разработки,
                    как&nbsp;минимум&nbsp;— выйти в&nbsp;плюс.
                    Владелец бизнеса уже заплатил <span
                    dangerouslySetInnerHTML={{__html: numberWithThousandsNbsp(startConsumption)}}/>&nbsp;coins
                    за&nbsp;аренду серверов&nbsp;и
                    открыл кредитную линию, которую можно тратить только на&nbsp;зарплату.
                </p>
            </div>
            <div className={"RulesInnerBlockContextBlockTitle"}>
                <p>
                    Успехов!
                </p>
            </div>
        </div>
        <div className={"RulesButton"} onClick={() => beginButtonClick(false)}>
            Играть на лёгком уровне!
        </div>
        <div className={"RulesButton"} onClick={() => beginButtonClick(true)}>
            Играть на сложном уровне!
        </div>
    </div>
}
