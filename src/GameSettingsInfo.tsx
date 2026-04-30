import {FC} from "react";
import {useGameSettingsContext} from "./GameSettingsContext";
import "./GameSettingsInfo.css"
import {useWindowSize} from "@react-hook/window-size";

export const GameSettingsInfo: FC = () => {

    const {initParams} = useGameSettingsContext();
    const [width, height] = useWindowSize();

    const getFatTable = () => {
        return <table className={'GameInfoTable Text-TT-Norms-Tochka-Extended-Medium-M'}>
            <thead>
            <tr>
                <th>&nbsp;</th>
                <th>Про&shy;дак&shy;ты</th>
                <th>Ди&shy;зай&shy;не&shy;ры</th>
                <th>Ре&shy;дак&shy;то&shy;ры</th>
                <th>Раз&shy;ра&shy;бот&shy;чи&shy;ки</th>
                <th>Тес&shy;ти&shy;ров&shy;щи&shy;ки</th>
                <th>Ито&shy;го</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>Про&shy;из&shy;во&shy;ди&shy;тель&shy;ность,<br/>час/нед.</th>
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
                <th>Рас&shy;хо&shy;ды,<br/>coin/нед.</th>
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
                <th>Нор&shy;мо&shy;час,<br/>coin/час</th>
                <td>{initParams.products.weekMoney / initParams.products.weekPower}</td>
                <td>{initParams.designers.weekMoney / initParams.designers.weekPower}</td>
                <td>{initParams.editors.weekMoney / initParams.editors.weekPower}</td>
                <td>{initParams.developers.weekMoney / initParams.developers.weekPower}</td>
                <td>{initParams.testers.weekMoney / initParams.testers.weekPower}</td>
                <td>&nbsp;</td>
            </tr>
            </tbody>
        </table>;
    }

    const getThinTable = () => {
        return <table className={'GameInfoTable Text-TT-Norms-Tochka-Extended-Medium-M'}>
            <thead>
            <tr>
                <th>&nbsp;</th>
                <th>Про&shy;из&shy;во&shy;ди&shy;тель&shy;ность,<br/>час/нед.</th>
                <th>Рас&shy;хо&shy;ды,<br/>coin/нед.</th>
                <th>Нор&shy;мо&shy;час,<br/>coin/час</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>Про&shy;дак&shy;ты</th>
                <td>{initParams.products.weekPower}</td>
                <td>{initParams.products.weekMoney}</td>
                <td>{initParams.products.weekMoney / initParams.products.weekPower}</td>
            </tr>
            <tr>
                <th>Ди&shy;зай&shy;не&shy;ры</th>
                <td>{initParams.designers.weekPower}</td>
                <td>{initParams.designers.weekMoney}</td>
                <td>{initParams.designers.weekMoney / initParams.designers.weekPower}</td>
            </tr>
            <tr>
                <th>Ре&shy;дак&shy;то&shy;ры</th>
                <td>{initParams.editors.weekPower}</td>
                <td>{initParams.editors.weekMoney}</td>
                <td>{initParams.editors.weekMoney / initParams.editors.weekPower}</td>
            </tr>
            <tr>
                <th>Раз&shy;ра&shy;бот&shy;чи&shy;ки</th>
                <td>{initParams.developers.weekPower}</td>
                <td>{initParams.developers.weekMoney}</td>
                <td>{initParams.developers.weekMoney / initParams.developers.weekPower}</td>
            </tr>
            <tr>
                <th>Тес&shy;ти&shy;ров&shy;щи&shy;ки</th>
                <td>{initParams.testers.weekPower}</td>
                <td>{initParams.testers.weekMoney}</td>
                <td>{initParams.testers.weekMoney / initParams.testers.weekPower}</td>
            </tr>
            <tr>
                <th>Ито&shy;го</th>
                <td>{initParams.products.weekPower +
                    initParams.designers.weekPower +
                    initParams.editors.weekPower +
                    initParams.developers.weekPower +
                    initParams.testers.weekPower}</td>
                <td>{initParams.products.weekMoney +
                    initParams.designers.weekMoney +
                    initParams.editors.weekMoney +
                    initParams.developers.weekMoney +
                    initParams.testers.weekMoney}</td>
                <td>&nbsp;</td>
            </tr>
            </tbody>
        </table>;
    }

    return <div className={'GameInfo'}>
        {height > width ? getThinTable() : getFatTable()}
    </div>
};
