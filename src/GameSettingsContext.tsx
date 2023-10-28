import React, {PropsWithChildren, useContext, useState} from "react";

export class StepInitParam {
    dayPower: number;
    weekPower: number;
    weekMoney: number;

    constructor(dayPower: number, weekPower: number, weekMoney: number) {
        this.dayPower = dayPower;
        this.weekPower = weekPower;
        this.weekMoney = weekMoney;
    }
}

export class InitParams {
    products: StepInitParam = new StepInitParam(8, 40, 200);
    designers: StepInitParam = new StepInitParam(8, 20, 100);
    editors: StepInitParam = new StepInitParam(8, 20, 100);
    developers: StepInitParam = new StepInitParam(80, 400, 3200);
    testers: StepInitParam = new StepInitParam(16, 80, 400);
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
