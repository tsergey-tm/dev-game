import React, {PropsWithChildren, useContext, useState} from "react";

export class Task {
    name: string;
    product: number;
    designer: number;
    editor: number;
    developer: number;
    tester: number;
    money: number;
    notStarted: boolean = true;
    startWeek: number = -1;
    endWeek: number = -1;

    constructor(name: string,
                product: number,
                designer: number,
                editor: number,
                developer: number,
                tester: number,
                money: number
    ) {
        this.name = name;
        this.product = product;
        this.designer = designer;
        this.editor = editor;
        this.developer = developer;
        this.tester = tester;
        this.money = money;
    }

    clone(): Task {
        const cloneObj = new Task(this.name,
            this.product,
            this.designer,
            this.editor,
            this.developer,
            this.tester,
            this.money);
        cloneObj.notStarted = this.notStarted;
        cloneObj.startWeek = this.startWeek;
        cloneObj.endWeek = this.endWeek;
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
    week: number = -1;
    taskIndex: number = 1;
    income: number = 0;
    consumption: number = 0;
    cols: Task[][] = [];
    effProduct: Effectiveness = new Effectiveness();
    effDesigner: Effectiveness = new Effectiveness();
    effEditor: Effectiveness = new Effectiveness();
    effDeveloper: Effectiveness = new Effectiveness();
    effTester: Effectiveness = new Effectiveness();
    readonly colNames: string[];
    readonly productColIndex: number = 2;
    readonly designerColIndex: number = 4;
    readonly editorColIndex: number = 6;
    readonly developerColIndex: number = 8;
    readonly testerColIndex: number = 10;

    constructor() {
        this.colNames = [
            "Backlog",
            "Нужно сделать",
            "Анализ",
            "Анализ готов",
            "Дизайн",
            "Дизайн готов",
            "Редактура",
            "Готово к разработке",
            "Разработка",
            "Готово к тестированию",
            "Тестирование",
            "Готово"
        ];

        for (let i = 0; i < this.colNames.length; i++) {
            this.cols.push([]);
        }
    }

    clone(): GameResult {
        const cloneObj = new GameResult();

        cloneObj.week = this.week;
        cloneObj.taskIndex = this.taskIndex;
        cloneObj.income = this.income;
        cloneObj.consumption = this.consumption;

        cloneObj.effProduct = this.effProduct.clone();
        cloneObj.effDesigner = this.effDesigner.clone();
        cloneObj.effEditor = this.effEditor.clone();
        cloneObj.effDeveloper = this.effDeveloper.clone();
        cloneObj.effTester = this.effTester.clone();

        for (let i = 0; i < cloneObj.cols.length; i++) {
            cloneObj.cols[i].push(...this.cols[i].map(value => value.clone()));
        }

        return cloneObj;
    }
}

export type SetGameResult = (gameResult: GameResult) => void;

export type GameResultContextType = {
    gameResult: GameResult;
    setGameResult: SetGameResult;
}

export const GameResultContext = React.createContext<GameResultContextType | undefined>(undefined);

export const GameResultContextProvider = ({children}: PropsWithChildren<{}>) => {

    const initialState = new GameResult();
    const [gameResult, setGameResult] = useState<GameResult>(initialState);

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