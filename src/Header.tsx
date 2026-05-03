import "./Header.css";
import React from "react";
import {FullScreenHandle} from "react-full-screen";
import {GearImg} from "./images";
import {UserSettingsData, useUserSettingsContext} from "./UserSettingsContext";
import ReactModal from "react-modal";
import ReactSwitch from "react-switch";

export const Header = (props: { fullScreenHandler: FullScreenHandle, isLeaderBoard: boolean }) => {

    const {userSettings, setUserSettings} = useUserSettingsContext();

    const [configIsOpen, setConfigIsOpen] = React.useState(false);
    const [configIsKeys, setConfigIsKeys] = React.useState(userSettings.showKeys);
    const [configIsFullscreen, setConfigIsFullscreen] = React.useState(props.fullScreenHandler.active);

    function closeConfig() {

        setConfigIsOpen(false);
        if (userSettings.showKeys !== configIsKeys) {
            setUserSettings(new UserSettingsData(configIsKeys));
        }
        if (props.fullScreenHandler.active !== configIsFullscreen) {
            if (configIsFullscreen) {
                props.fullScreenHandler.enter().then();
            } else {
                props.fullScreenHandler.exit().then();
            }
        }
    }

    const openConfig = () => {
        setConfigIsOpen(true);
    };

    return <div className={"HeaderBlock"}>
        <div className={"HeaderInnerBlockNameRight"}>
            <GearImg className={"ScreenImg"} onClick={openConfig}/>
            <ReactModal
                isOpen={configIsOpen}
                onRequestClose={closeConfig}
                contentLabel="Настройки"
                parentSelector={() =>
                    document.querySelector('#AppElement') ||
                    props.fullScreenHandler.node?.current ||
                    document.querySelector('#top-layer') ||
                    document.querySelector('#fullscreen-container') ||
                    document.querySelector('#root') ||
                    document.body
                }
                className={"ModalConfig"}
                overlayClassName={"ModalConfigOverlay"}
            >
                <label className={"ConfigLabel"}>
                    <div>Полноэкранный режим</div>
                    <ReactSwitch
                        onChange={(v) => setConfigIsFullscreen(v)}
                        checked={configIsFullscreen}
                        className="ConfigLabelSwitch"
                    />
                </label>
                <label className={"ConfigLabel"}>
                    <div>Кнопки управления</div>
                    <ReactSwitch
                        onChange={(v) => setConfigIsKeys(v)}
                        checked={configIsKeys}
                        className="ConfigLabelSwitch"
                    />
                </label>
            </ReactModal>
        </div>
    </div>
};
