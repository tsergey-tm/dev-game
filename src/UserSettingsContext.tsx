import React, {PropsWithChildren, useContext, useState} from "react";

export class UserSettingsData {
    showKeys: boolean;

    constructor(showKeys: boolean) {
        this.showKeys = showKeys;
    }
}


export type SetUserSettings = (userSettings: UserSettingsData) => void;

export type UserSettingsContextType = {
    userSettings: UserSettingsData;
    setUserSettings: SetUserSettings;
}

export const UserSettingsContext = React.createContext<UserSettingsContextType | undefined>(undefined);
export const UserSettingsContextProvider = ({children}: PropsWithChildren<{}>) => {

    const getUserSettingsData = () => {
        const storedData = localStorage.getItem("gameUserSettings");

        const userSettingsData = new UserSettingsData(
            false
        );

        if (storedData) {
            return Object.assign(userSettingsData, JSON.parse(storedData));
        } else {
            return userSettingsData;
        }
    }
    const [userSettings, _setUserSettings] = useState<UserSettingsData>(getUserSettingsData());

    const setUserSettings: SetUserSettings = (userSettings: UserSettingsData) => {
        _setUserSettings(userSettings);

        localStorage.setItem("gameUserSettings", JSON.stringify(userSettings));
    }

    return (
        <UserSettingsContext.Provider value={{userSettings, setUserSettings}}>
            {children}
        </UserSettingsContext.Provider>
    );
};

export const useUserSettingsContext = () => {
    const context = useContext(UserSettingsContext);

    if (!context) {
        throw new Error('useUserSettingsContext must be used inside the UserSettingsContextProvider');
    }

    return context;
};
