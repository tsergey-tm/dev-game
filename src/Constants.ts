export type SimpleCallbackRef = () => void;
export type LeveledCallbackRef = (isHard: boolean) => void;

export class StepInitParam {
    twoHourPower: number;
    weekPower: number;
    weekMoney: number;

    constructor(twoHourPower: number, weekPower: number, weekMoney: number) {
        this.twoHourPower = twoHourPower;
        this.weekPower = weekPower;
        this.weekMoney = weekMoney;
    }
}

export class InitParams {
    products: StepInitParam = new StepInitParam(2, 40, 200);
    designers: StepInitParam = new StepInitParam(2, 20, 100);
    editors: StepInitParam = new StepInitParam(2, 20, 100);
    developers: StepInitParam = new StepInitParam(20, 400, 3200);
    testers: StepInitParam = new StepInitParam(4, 80, 400);
}

export const initParams = new InitParams();
