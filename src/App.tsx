import React, {useEffect} from 'react';
import './App.css';
import {GameSettingsContextProvider} from "./GameSettingsContext";
import {GameResultContextProvider} from "./GameResultContext";
import {GameRunner} from "./GameRunner";
import {FullScreen, useFullScreenHandle} from "react-full-screen";
import {UserSettingsContextProvider} from "./UserSettingsContext";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router";
import {Article} from "./Article";
import ReactModal from "react-modal";

function App() {

    const handle = useFullScreenHandle();

    const router = createBrowserRouter([
            {
                index: true,
                path: "/",
                element: <GameRunner fullScreenHandler={handle}/>
            },
            {
                path: "/article",
                element: <Article/>
            },
            {
                path: "*",
                element: <Navigate to="/" replace/>
            }
        ], {
            basename: '/dev-game/'
        }
    );

    useEffect(() => {
        ReactModal.setAppElement('#AppElement');
    }, []);

    return (
        <FullScreen handle={handle} className={"FullScreenContainer"}>
            <div className={"App"} id='AppElement'>
                <GameSettingsContextProvider>
                    <GameResultContextProvider>
                        <UserSettingsContextProvider>
                            <div className={"AppContainer"} id={"AppContainer"}>
                                <RouterProvider router={router}/>
                            </div>
                        </UserSettingsContextProvider>
                    </GameResultContextProvider>
                </GameSettingsContextProvider>
            </div>
        </FullScreen>
    );
}

export default App;
