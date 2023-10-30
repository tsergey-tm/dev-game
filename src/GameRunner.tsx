import React from "react";
import {useGameSettingsContext} from "./GameSettingsContext";
import {GameResult, Task, useGameResultContext} from "./GameResultContext";
import TaskGenerator from "./TaskGenerator";

export const GameRunner = () => {

    const {initParams} = useGameSettingsContext();
    const {gameResult, setGameResult} = useGameResultContext();

    const moveEmptyTesting = (newGameResult: GameResult) => {

        const process = (col: Task[]) => {
            for (let i = 0; i < col.length;) {
                if (col[i].developer + col[i].tester === 0) {
                    const task = col.splice(i, 1)[0];
                    task.endWeek = newGameResult.week;
                    newGameResult.cols[newGameResult.testerColIndex + 1].push(task);
                } else {
                    i++;
                }
            }
        };

        process(newGameResult.cols[newGameResult.testerColIndex - 1]);
        process(newGameResult.cols[newGameResult.testerColIndex]);
    }

    const moveEmptyDev = (newGameResult: GameResult) => {

        const process = (col: Task[]) => {
            for (let i = 0; i < col.length;) {
                if (col[i].developer + col[i].editor === 0) {
                    newGameResult.cols[newGameResult.developerColIndex + 1].push(...col.splice(i, 1));
                } else {
                    i++;
                }
            }
        };

        process(newGameResult.cols[newGameResult.developerColIndex - 1]);
        process(newGameResult.cols[newGameResult.developerColIndex]);
        moveEmptyTesting(newGameResult);
    }

    const moveEmptyEditing = (newGameResult: GameResult) => {

        const process = (col: Task[]) => {
            for (let i = 0; i < col.length;) {
                if (col[i].designer + col[i].editor === 0) {
                    newGameResult.cols[newGameResult.editorColIndex + 1].push(...col.splice(i, 1));
                } else {
                    i++;
                }
            }
        };

        process(newGameResult.cols[newGameResult.editorColIndex - 1]);
        process(newGameResult.cols[newGameResult.editorColIndex]);
        moveEmptyDev(newGameResult);
    }

    const moveEmptyDesign = (newGameResult: GameResult) => {

        const process = (col: Task[]) => {

            for (let i = 0; i < col.length;) {
                if (col[i].designer + col[i].product === 0) {
                    newGameResult.cols[newGameResult.designerColIndex + 1].push(...col.splice(i, 1));
                } else {
                    i++;
                }
            }
        };

        process(newGameResult.cols[newGameResult.designerColIndex - 1]);
        process(newGameResult.cols[newGameResult.designerColIndex]);
        moveEmptyEditing(newGameResult);
    }

    const moveEmptyAnalyze = (newGameResult: GameResult) => {

        const process = (col: Task[]) => {
            for (let i = 0; i < col.length;) {
                if (col[i].product === 0) {
                    const task = col.splice(i, 1)[0];
                    task.startWeek = newGameResult.week;
                    task.notStarted = false;
                    newGameResult.cols[newGameResult.productColIndex + 1].push(task);
                } else {
                    i++;
                }
            }
        };

        process(newGameResult.cols[newGameResult.productColIndex - 1]);
        process(newGameResult.cols[newGameResult.productColIndex]);
        moveEmptyDesign(newGameResult);
    }

    function processDay(newGameResult: GameResult,
                        wPoints: number,
                        twoHourPower: number,
                        taskStep: string,
                        colIndex: number,
                        isTesting: boolean,
                        isAnalyze: boolean) {

        let weekPoints = wPoints;

        let dayPoints = Math.min(weekPoints, twoHourPower);

        while (dayPoints > 0) {
            let tasks = newGameResult.cols[colIndex].slice(0);
            if (tasks !== undefined && tasks.length > 0) {
                let task = tasks[0];
                // @ts-ignore
                const currDo: number = Math.min(dayPoints, task[taskStep]);
                if (currDo > 0) {
                    // @ts-ignore
                    task[taskStep] -= currDo;
                    dayPoints -= currDo;
                    weekPoints -= currDo;
                }

                // @ts-ignore
                if (task[taskStep] === 0) {
                    if (isTesting) {
                        moveEmptyTesting(newGameResult);
                    } else {
                        const newTask = newGameResult.cols[colIndex].splice(0, 1)[0];
                        if (newTask !== undefined) {
                            if (isAnalyze) {
                                newTask.startWeek = newGameResult.week;
                                newTask.notStarted = false;
                            }
                            newGameResult.cols[colIndex + 1].push(newTask);
                        }
                    }
                }
            } else {
                let tasks = newGameResult.cols[colIndex - 1].splice(0, 1);
                if (tasks !== undefined && tasks.length > 0) {
                    newGameResult.cols[colIndex].push(...tasks);
                } else {
                    break;
                }
            }
        }

        return weekPoints;
    }

    const calcWeek = () => {
        const newGameResult = gameResult.clone();

        if (newGameResult.week >= 0) {

            newGameResult.cols.slice(-1)[0].forEach(task => newGameResult.income += task.money);
            newGameResult.consumption += initParams.products.weekMoney;
            newGameResult.consumption += initParams.designers.weekMoney;
            newGameResult.consumption += initParams.editors.weekMoney;
            newGameResult.consumption += initParams.developers.weekMoney;
            newGameResult.consumption += initParams.testers.weekMoney;

            let productsPoints = initParams.products.weekPower;
            let designersPoints = initParams.designers.weekPower;
            let editorsPoints = initParams.editors.weekPower;
            let developersPoints = initParams.developers.weekPower;
            let testersPoints = initParams.testers.weekPower;

            for (let towHours = 0; towHours < 5 * 4; towHours++) {
                testersPoints = processDay(newGameResult,
                    testersPoints,
                    initParams.testers.twoHourPower,
                    "tester",
                    newGameResult.testerColIndex,
                    true,
                    false);

                developersPoints = processDay(newGameResult,
                    developersPoints,
                    initParams.developers.twoHourPower,
                    "developer",
                    newGameResult.developerColIndex,
                    false,
                    false);

                editorsPoints = processDay(newGameResult,
                    editorsPoints,
                    initParams.editors.twoHourPower,
                    "editor",
                    newGameResult.editorColIndex,
                    false,
                    false);

                designersPoints = processDay(newGameResult,
                    designersPoints,
                    initParams.designers.twoHourPower,
                    "designer",
                    newGameResult.designerColIndex,
                    false,
                    false);

                productsPoints = processDay(newGameResult,
                    productsPoints,
                    initParams.products.twoHourPower,
                    "product",
                    newGameResult.productColIndex,
                    false,
                    true);

                moveEmptyAnalyze(newGameResult);
            }

            newGameResult.effProduct.mayWork += initParams.products.weekPower;
            newGameResult.effDesigner.mayWork += initParams.designers.weekPower;
            newGameResult.effEditor.mayWork += initParams.editors.weekPower;
            newGameResult.effDeveloper.mayWork += initParams.developers.weekPower;
            newGameResult.effTester.mayWork += initParams.testers.weekPower;

            newGameResult.effProduct.work += initParams.products.weekPower - productsPoints;
            newGameResult.effDesigner.work += initParams.designers.weekPower - designersPoints;
            newGameResult.effEditor.work += initParams.editors.weekPower - editorsPoints;
            newGameResult.effDeveloper.work += initParams.developers.weekPower - developersPoints;
            newGameResult.effTester.work += initParams.testers.weekPower - testersPoints;


        }
        newGameResult.week++;

        if (newGameResult.week % 2 === 0) {
            const items = TaskGenerator(newGameResult.week / 2, newGameResult.taskIndex);
            newGameResult.taskIndex += items.length;
            newGameResult.cols[0].unshift(...items);
        }

        setGameResult(newGameResult);
    }

    return <div className="RunGame">
        <button className="RunGameButton"
                disabled={gameResult.week > 25}
                onClick={() => calcWeek()}
        >{gameResult.week < 0 ? "Я прочитал описание, давайте задачи!" : (gameResult.week > 25 ? "Полгода прошло, посмотрите результаты. Для перезапуска - обновите страницу" : "Запустить неделю")}
        </button>
        {gameResult.week < 0 &&
            <div>
                <h3>Описание</h3>
                <p>
                    У вас стартап с идеальной командой. На этапе старта команда обещает полгода не болеть и не ходить в
                    отпуск.
                </p>
                <p>Команда состоит из:
                    <ul>
                        <li>продакта (product owner и т.п.)</li>
                        <li>дизайнера и редактора, которые доступны нам на полставки каждый, но зато в любое время</li>
                        <li>десяток хороших программистов</li>
                        <li>тестировщиков: но остатка денег хватило всего на двоих (похоже они не справятся с нагрузкой)
                        </li>
                    </ul>
                </p>
                <p>
                    Каждые 2 недели будут появляться новые задачи. В задаче указаны сколько человеко-часов потребуется
                    на каждом этапе.
                    Завершенные задачи начинают приносить еженедельную прибыль, указанную на карточке.
                </p>
                <p>
                    Пока задачу никто не взял в работу вы можете кнопками управления перемещать задачи:
                    <ul>
                        <li>поднимать и опускать задачи в приоритете (чем выше тем приоритетнее)</li>
                        <li>брать задачу на разработку</li>
                        <li>возвращать задачу в бэклог</li>
                    </ul>
                    Но после того, как с задачей начали работать, над ней работают в порядке очереди. И поменять
                    приоритет уже не получится: "чайка-менеджмент" у нас не практикуется.
                </p>
                <p>
                    Сотрудники проверяют доску на предмет новых задач каждые 2 часа. Рабочий день - 8 часов. Рабочая
                    неделя 40 часов на человека.
                </p>
                <p>
                    Отчет команда приносит каждую неделю. Тогда же можно пересмотреть приоритеты задач.
                </p>
                <p>
                    Ваша задача заработать как можно больше денег за полгода разработки. Но так как это стартап, далеко
                    не
                    факт, что вы сможете выйти в плюс за такой короткий период.
                </p>
                <p>
                    Успехов!
                </p>
            </div>
        }
    </div>
};