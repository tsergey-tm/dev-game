import {Task} from "./GameResultContext";
import {getRandomElementAndRemove} from "./GlobalFunctions";

export const startConsumption = 85000;

export const taskGeneratorData = [
    [10, 2, 3, 320, 0, 2000],
    [10, 2, 2, 260, 0, 2000],
    [15, 4, 2, 270, 0, 2000],
    [5, 6, 4, 260, 0, 2000],
    [10, 8, 3, 280, 0, 2000],
    [15, 1, 2, 290, 0, 2000],
    [5, 2, 8, 230, 10, 4000],
    [10, 4, 1, 240, 10, 4000],
    [15, 6, 2, 250, 10, 4000],
    [5, 8, 4, 220, 10, 4000],
    [10, 1, 3, 230, 10, 4000],
    [15, 2, 2, 220, 10, 4000],
    [5, 4, 8, 240, 10, 4000],
    [10, 6, 1, 150, 10, 3000],
    [15, 8, 2, 130, 10, 3000],
    [5, 1, 4, 120, 10, 3000],
    [10, 2, 3, 140, 10, 3000],
    [15, 4, 2, 130, 10, 3000],
    [5, 6, 8, 120, 10, 3000],
    [10, 8, 1, 160, 30, 6000],
    [15, 1, 2, 180, 30, 6000],
    [5, 2, 4, 160, 30, 6000],
    [10, 4, 3, 140, 30, 6000],
    [15, 6, 2, 160, 30, 6000],
    [5, 8, 8, 150, 30, 6000],
    [10, 1, 1, 170, 30, 6000],
    [15, 2, 2, 160, 100, 10000],
    [5, 4, 4, 180, 100, 10000],
    [10, 6, 3, 170, 100, 10000],
    [15, 8, 2, 150, 100, 10000],
    [5, 1, 8, 170, 100, 10000],
    [10, 2, 1, 170, 100, 10000],
    [15, 4, 2, 140, 200, 10000],
    [5, 6, 4, 170, 200, 10000],
    [10, 8, 3, 160, 200, 10000],
    [15, 1, 2, 150, 200, 10000],
    [5, 2, 8, 110, 200, 10000],
    [10, 4, 1, 160, 200, 10000],
    [15, 6, 2, 110, 200, 10000],
    [5, 8, 4, 110, 200, 10000],
    [10, 1, 3, 160, 200, 10000],
    [15, 2, 2, 110, 200, 10000],
    [5, 4, 8, 110, 200, 10000],
    [10, 6, 1, 160, 200, 10000],
    [15, 8, 2, 130, 200, 10000],
    [5, 1, 4, 80, 300, 12000],
    [10, 2, 3, 50, 300, 12000],
    [15, 1, 2, 60, 300, 12000],
    [15, 4, 2, 50, 300, 12000],
    [5, 6, 8, 40, 300, 12000],
    [10, 8, 1, 50, 300, 12000],
    [5, 2, 4, 30, 300, 12000],
];

const blocks: number[][] = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 6],
    [1, 7],
    [1, 8],
    [1, 9],
    [1, 10],
    [1, 11],
    [6, 12],
    [2, 13],
    [2, 14],
    [2, 15],
    [2, 16],
    [2, 17],
    [2, 18],
    [2, 19],
    [2, 20],
    [2, 21],
    [2, 22],
    [2, 23],
    [2, 24],
    [6, 25],
    [3, 26],
    [3, 27],
    [3, 28],
    [3, 29],
    [3, 30],
    [3, 31],
    [4, 32],
    [4, 33],
    [4, 34],
    [4, 35],
    [4, 36],
    [4, 37],
    [4, 38],
    [4, 39],
    [4, 40],
    [4, 41],
    [4, 42],
    [4, 43],
    [6, 44],
    [5, 45],
    [5, 46],
    [5, 47],
    [5, 48],
    [5, 49],
    [5, 50],
    [6, 51]
];


const firstDeal: number[] = [51, 44, 25, 12];

const makeTask = (index: number, data: number[]): Task => {

    return new Task(index, data[0], data[1], data[2], data[3], data[4], data[5]);
}

const taskGenerator = (): Task[][] => {

    const res: Task[][] = [];

    const firstDealData: number[] = [...firstDeal];
    const blocksData: number[][] = [];
    const maxB = blocks.map(b => b[0]).reduce((a, b) => Math.max(a, b), 0);
    for (let i = 0; i <= maxB; i++) {
        blocksData.push([]);
    }
    blocks.forEach(block => blocksData[block[0]].push(block[1]));

    let index = 0;

    res.push([
        makeTask(index++, taskGeneratorData[getRandomElementAndRemove(firstDealData)!]),
        makeTask(index++, taskGeneratorData[getRandomElementAndRemove(firstDealData)!]),
        makeTask(index++, taskGeneratorData[getRandomElementAndRemove(firstDealData)!]),
        makeTask(index++, taskGeneratorData[getRandomElementAndRemove(firstDealData)!])
    ]);

    for (let i = 1; i < 26; i++) {
        if (i % 2 === 0) {
            const d = [
                (i % 4 === 0) ? getRandomElementAndRemove(blocksData[1])! : getRandomElementAndRemove(blocksData[0])!,
                getRandomElementAndRemove(blocksData[2])!,
                (i % 4 === 0) ? getRandomElementAndRemove(blocksData[3])! : getRandomElementAndRemove(blocksData[5])!,
                getRandomElementAndRemove(blocksData[4])!
            ];

            res.push([
                makeTask(index++, taskGeneratorData[getRandomElementAndRemove(d)!]),
                makeTask(index++, taskGeneratorData[getRandomElementAndRemove(d)!]),
                makeTask(index++, taskGeneratorData[getRandomElementAndRemove(d)!]),
                makeTask(index++, taskGeneratorData[getRandomElementAndRemove(d)!])
            ]);
        } else {
            res.push([]);
        }
    }

    return res;
};

export default taskGenerator;
