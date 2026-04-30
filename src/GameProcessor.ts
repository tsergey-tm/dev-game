import {GameResult, Task} from "./GameResultContext";

import {InitParams} from "./Constants";

const moveEmptyTesting = (newGameResult: GameResult) => {

    const process = (col: Task[]) => {
        for (let i = 0; i < col.length;) {
            if (col[i].tester === 0) {
                const task = col.splice(i, 1)[0];
                task.notFinished = false;
                newGameResult.cols[newGameResult.testerColIndex + 1].push(task);
                newGameResult.income += task.money;
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
            if (col[i].developer === 0) {
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
            if (col[i].editor === 0) {
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
            if (col[i].designer === 0) {
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
const processTwoHour = (newGameResult: GameResult,
                        wPoints: number,
                        twoHourPower: number,
                        taskStep: string,
                        colIndex: number,
                        isTesting: boolean,
                        isAnalyze: boolean) => {

    let twoHourPoints = Math.min(wPoints, twoHourPower);

    let isWorked = false;

    while (twoHourPoints > 0) {

        let tasks = newGameResult.cols[colIndex].slice(0);
        if (tasks !== undefined && tasks.length > 0) {
            let task = tasks[0];
            // @ts-ignore
            const currDo: number = Math.min(twoHourPoints, task[taskStep]);
            if (currDo > 0) {
                // @ts-ignore
                task[taskStep] -= currDo;
                twoHourPoints -= currDo;
                isWorked = true;
            }

            // @ts-ignore
            if (task[taskStep] === 0) {
                if (isTesting) {
                    moveEmptyTesting(newGameResult);
                } else {
                    const newTask = newGameResult.cols[colIndex].splice(0, 1)[0];
                    if (newTask !== undefined) {
                        newGameResult.cols[colIndex + 1].push(newTask);
                    }
                }
            }
        } else {
            let tasks = newGameResult.cols[colIndex - 1].splice(0, 1);
            if (tasks !== undefined && tasks.length > 0) {
                let task = tasks[0];
                if (isAnalyze) {
                    task.notStarted = false;
                }
                newGameResult.cols[colIndex].push(task);
            } else {
                break;
            }
        }
    }

    if (isWorked) {
        return wPoints - twoHourPower;
    }
    return wPoints;
};

export const calcNextWeek = (gameResult: GameResult, initParams: InitParams) => {
    const newGameResult = gameResult.clone();

    if (newGameResult.week >= 0) {

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

        moveEmptyAnalyze(newGameResult);

        for (let twoHours = 0; twoHours < 5 * 4; twoHours++) {
            testersPoints = processTwoHour(newGameResult,
                testersPoints,
                initParams.testers.twoHourPower,
                "tester",
                newGameResult.testerColIndex,
                true,
                false);

            developersPoints = processTwoHour(newGameResult,
                developersPoints,
                initParams.developers.twoHourPower,
                "developer",
                newGameResult.developerColIndex,
                false,
                false);

            editorsPoints = processTwoHour(newGameResult,
                editorsPoints,
                initParams.editors.twoHourPower,
                "editor",
                newGameResult.editorColIndex,
                false,
                false);

            designersPoints = processTwoHour(newGameResult,
                designersPoints,
                initParams.designers.twoHourPower,
                "designer",
                newGameResult.designerColIndex,
                false,
                false);

            productsPoints = processTwoHour(newGameResult,
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

    if (newGameResult.tasks.length > 0) {
        newGameResult.cols[0].unshift(...newGameResult.tasks.shift()!);
    }

    newGameResult.recalcWIP();

    return newGameResult;
}
