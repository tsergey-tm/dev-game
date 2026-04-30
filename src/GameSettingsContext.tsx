import React, {PropsWithChildren, useContext, useState} from "react";
import {InitParams} from "./Constants";

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
