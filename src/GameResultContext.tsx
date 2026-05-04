import React, {PropsWithChildren, useContext, useState} from "react";
import {startConsumption} from "./TaskGenerator";
import {initParams} from "./Constants";

export class Task {
    index: number;
    name: string;
    product: number;
    designer: number;
    editor: number;
    developer: number;
    tester: number;
    money: number;
    primeCost: number;
    license: number;
    notStarted: boolean = true;
    notFinished: boolean = true;

    constructor(index: number,
                product: number,
                designer: number,
                editor: number,
                developer: number,
                tester: number,
                money: number,
                license: number
    ) {
        this.index = index;
        this.name = "TASK-" + (index + 1);
        this.product = product;
        this.designer = designer;
        this.editor = editor;
        this.developer = developer;
        this.tester = tester;
        this.money = money;
        this.license = license;
        this.primeCost =
            this.product * initParams.products.weekMoney / initParams.products.weekPower +
            this.designer * initParams.designers.weekMoney / initParams.designers.weekPower +
            this.editor * initParams.editors.weekMoney / initParams.editors.weekPower +
            this.developer * initParams.developers.weekMoney / initParams.developers.weekPower +
            this.tester * initParams.testers.weekMoney / initParams.testers.weekPower;
    }

    clone(): Task {
        const cloneObj = new Task(this.index,
            this.product,
            this.designer,
            this.editor,
            this.developer,
            this.tester,
            this.money,
            this.license);
        cloneObj.notStarted = this.notStarted;
        cloneObj.notFinished = this.notFinished;
        return cloneObj;
    }
}

export class Effectiveness {
    mayWork: number = 0;
    work: number = 0;

    clone(): Effectiveness {
        const cloneObj = new Effectiveness();

        cloneObj.mayWork = this.mayWork;
        cloneObj.work = this.work;

        return cloneObj;
    }

    toString(): string {

        if (this.mayWork === 0) {
            return "0%";
        } else {
            return (100 * this.work / this.mayWork).toFixed() + "%";
        }
    }
}

export class GameResult {
    isHard: boolean;
    tasks: Task[][];
    week: number = -1;
    income: number = 0;
    consumption: number = startConsumption;
    cols: Task[][] = [];
    effProduct: Effectiveness = new Effectiveness();
    effDesigner: Effectiveness = new Effectiveness();
    effEditor: Effectiveness = new Effectiveness();
    effDeveloper: Effectiveness = new Effectiveness();
    effTester: Effectiveness = new Effectiveness();
    productHours = 0;
    designHours = 0;
    editorHours = 0;
    devHours = 0;
    testHours = 0;
    readonly colNames: string[];
    readonly productColIndex: number = 2;
    readonly designerColIndex: number = 4;
    readonly editorColIndex: number = 6;
    readonly developerColIndex: number = 8;
    readonly testerColIndex: number = 10;

    constructor(tasks: Task[][], isHard: boolean) {

        this.isHard = isHard;
        this.tasks = tasks;

        this.colNames = [
            "Заказы",
            "Будем делать",
            "Анализ",
            "Анализ готов",
            "Дизайн",
            "Дизайн готов",
            "Редактура",
            "Готово к разра&shy;ботке",
            "Разра&shy;ботка",
            "Готово к тести&shy;рованию",
            "Тести&shy;рование",
            "Готово"
        ];

        for (let i = 0; i < this.colNames.length; i++) {
            this.cols.push([]);
        }
    }

    clone(): GameResult {

        const t: Task[][] = [];
        this.tasks.forEach(task => t.push(task.map(t => t.clone())));

        const cloneObj = new GameResult(t, this.isHard);

        cloneObj.week = this.week;
        cloneObj.income = this.income;
        cloneObj.consumption = this.consumption;

        cloneObj.effProduct = this.effProduct.clone();
        cloneObj.effDesigner = this.effDesigner.clone();
        cloneObj.effEditor = this.effEditor.clone();
        cloneObj.effDeveloper = this.effDeveloper.clone();
        cloneObj.effTester = this.effTester.clone();

        cloneObj.productHours = this.productHours;
        cloneObj.designHours = this.designHours;
        cloneObj.editorHours = this.editorHours;
        cloneObj.devHours = this.devHours;
        cloneObj.testHours = this.testHours;

        for (let i = 0; i < cloneObj.cols.length; i++) {
            cloneObj.cols[i].push(...this.cols[i].map(value => value.clone()));
        }

        return cloneObj;
    }

    recalcWIP(): void {

        this.productHours = 0;
        this.designHours = 0;
        this.editorHours = 0;
        this.devHours = 0;
        this.testHours = 0;

        this.cols.slice(1, -1).flat().forEach((task) => {
            this.productHours += task.product;
            this.designHours += task.designer;
            this.editorHours += task.editor;
            this.devHours += task.developer;
            this.testHours += task.tester;
        });
    }
}

export type SetGameResult = (gameResult: GameResult) => void;

export type GameResultContextType = {
    gameResult: GameResult | undefined;
    setGameResult: SetGameResult;
}

export const GameResultContext = React.createContext<GameResultContextType | undefined>(undefined);

export const GameResultContextProvider = ({children}: PropsWithChildren<{}>) => {

    const [gameResult, _setGameResult] = useState<GameResult | undefined>(undefined);

    const setGameResult: SetGameResult = (newGameResult) => {
        newGameResult.recalcWIP();
        _setGameResult(newGameResult);
    }

    return (
        <GameResultContext.Provider value={{gameResult, setGameResult}}>
            {children}
        </GameResultContext.Provider>
    );
};

export const useGameResultContext = () => {
    const context = useContext(GameResultContext);

    if (!context) {
        throw new Error('useGameResultContext must be used inside the GameResultContextProvider');
    }

    return context;
};
