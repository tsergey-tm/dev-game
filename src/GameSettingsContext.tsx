import React, {PropsWithChildren, useContext, useState} from "react";

export class StepInitParam {
    twoHourPower: number;
    weekPower: number;
    weekMoney: number;

    constructor(twoHourPower: number, weekPower: number, weekMoney: number) {
        this.twoHourPower = twoHourPower;
        this.weekPower = weekPower;
        this.weekMoney = weekMoney;
    }
}

export class InitParams {
    products: StepInitParam = new StepInitParam(2, 40, 200);
    designers: StepInitParam = new StepInitParam(2, 20, 100);
    editors: StepInitParam = new StepInitParam(2, 20, 100);
    developers: StepInitParam = new StepInitParam(20, 400, 3200);
    testers: StepInitParam = new StepInitParam(4, 80, 400);
}

export type SetInitParams = (initParams: InitParams) => void;

export type GameSettingsContextType = {
    initParams: InitParams;
    setInitParams: SetInitParams;
}
export const GameSettingsContext = React.createContext<GameSettingsContextType | undefined>(undefined);
export const GameSettingsContextProvider = ({children}: PropsWithChildren<{}>) => {

    const [initParams, setInitParams] = useState<InitParams>(new InitParams());

    return (
        <GameSettingsContext.Provider value={{initParams, setInitParams}}>
            {children}
        </GameSettingsContext.Provider>
    );
};

export const useGameSettingsContext = () => {
    const context = useContext(GameSettingsContext);

    if (!context) {
        throw new Error('useGameContext must be used inside the GameContextProvider');
    }

    return context;
};
