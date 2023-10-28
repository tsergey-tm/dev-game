import {FC} from "react";
import {useGameSettingsContext} from "./GameSettingsContext";
import "./GameSettingsInfo.css"

export const GameSettingsInfo: FC = () => {

    const {initParams} = useGameSettingsContext();

    return <div className={'GameInfo'}>
        <table className={'GameInfoTable'}>
            <thead>
            <tr>
                <th>&nbsp;</th>
                <th>Продакты</th>
                <th>Дизайнеры</th>
                <th>Редакторы</th>
                <th>Разработчики</th>
                <th>Тестировщики</th>
                <th>Итого</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>Производительность, час/нед.</th>
                <td>{initParams.products.weekPower}</td>
                <td>{initParams.designers.weekPower}</td>
                <td>{initParams.editors.weekPower}</td>
                <td>{initParams.developers.weekPower}</td>
                <td>{initParams.testers.weekPower}</td>
                <td>{initParams.products.weekPower +
                    initParams.designers.weekPower +
                    initParams.editors.weekPower +
                    initParams.developers.weekPower +
                    initParams.testers.weekPower}</td>
            </tr>
            <tr>
                <th>Расходы, coin/нед.</th>
                <td>{initParams.products.weekMoney}</td>
                <td>{initParams.designers.weekMoney}</td>
                <td>{initParams.editors.weekMoney}</td>
                <td>{initParams.developers.weekMoney}</td>
                <td>{initParams.testers.weekMoney}</td>
                <td>{initParams.products.weekMoney +
                    initParams.designers.weekMoney +
                    initParams.editors.weekMoney +
                    initParams.developers.weekMoney +
                    initParams.testers.weekMoney}</td>
            </tr>
            <tr>
                <th>Нормочас, coin/час</th>
                <td>{initParams.products.weekMoney / initParams.products.weekPower}</td>
                <td>{initParams.designers.weekMoney / initParams.designers.weekPower}</td>
                <td>{initParams.editors.weekMoney / initParams.editors.weekPower}</td>
                <td>{initParams.developers.weekMoney / initParams.developers.weekPower}</td>
                <td>{initParams.testers.weekMoney / initParams.testers.weekPower}</td>
                <td>&nbsp;</td>
            </tr>
            </tbody>
        </table>
    </div>
};