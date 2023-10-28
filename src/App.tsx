import React from 'react';
import './App.css';
import {GameSettingsInfo} from "./GameSettingsInfo";
import {GameSettingsContextProvider} from "./GameSettingsContext";
import {GameResultContextProvider} from "./GameResultContext";
import {GameResultInfo} from "./GameResultInfo";
import {GameTable} from "./GameTable";
import {GameRunner} from "./GameRunner";

function App() {
    return (
        <div className="App">
            <GameSettingsContextProvider>
                <GameResultContextProvider>
                    <GameSettingsInfo/>
                    <GameResultInfo/>
                    <GameRunner/>
                    <GameTable/>
                </GameResultContextProvider>
            </GameSettingsContextProvider>
        </div>
    );
}

export default App;
