import {Task} from "./GameResultContext";
import {getRandomElementAndRemove} from "./GlobalFunctions";

export const startConsumption = 120000;

export const licenses = [10000, 5000, 1000];

export const taskGeneratorData = [
    [8, 2, 3, 320, 0, 2500],
    [5, 2, 2, 330, 0, 2500],
    [9, 4, 2, 320, 0, 2500],
    [11, 6, 4, 310, 0, 2500],
    [10, 8, 3, 320, 0, 2500],
    [7, 1, 2, 330, 0, 2500],
    [6, 2, 8, 230, 10, 6000],
    [9, 4, 1, 240, 10, 6000],
    [10, 6, 2, 250, 10, 6000],
    [8, 8, 4, 220, 10, 6000],
    [11, 1, 3, 230, 10, 6000],
    [6, 2, 2, 220, 10, 6000],
    [5, 4, 8, 240, 10, 6000],
    [8, 6, 1, 250, 20, 6000],
    [5, 8, 2, 230, 20, 6000],
    [9, 1, 4, 240, 20, 6000],
    [11, 2, 3, 220, 20, 6000],
    [10, 4, 2, 210, 20, 6000],
    [7, 6, 8, 240, 20, 6000],
    [6, 8, 1, 200, 20, 8000],
    [9, 1, 2, 210, 20, 8000],
    [10, 2, 4, 200, 20, 8000],
    [8, 4, 3, 190, 20, 8000],
    [11, 6, 2, 200, 20, 8000],
    [6, 8, 8, 210, 20, 8000],
    [5, 1, 1, 200, 20, 8000],
    [8, 2, 2, 210, 100, 10000],
    [5, 4, 4, 220, 100, 10000],
    [9, 6, 3, 230, 100, 10000],
    [11, 8, 2, 220, 100, 10000],
    [10, 1, 8, 210, 100, 10000],
    [7, 2, 1, 230, 100, 10000],
    [6, 4, 2, 180, 100, 8000],
    [9, 6, 4, 170, 100, 8000],
    [10, 8, 3, 160, 100, 8000],
    [8, 1, 2, 190, 100, 8000],
    [11, 2, 8, 180, 100, 8000],
    [6, 4, 1, 170, 100, 8000],
    [5, 6, 2, 110, 200, 10000],
    [8, 8, 4, 100, 200, 10000],
    [5, 1, 3, 120, 200, 10000],
    [9, 2, 2, 110, 200, 10000],
    [11, 4, 8, 100, 200, 10000],
    [10, 6, 1, 120, 200, 10000],
    [7, 8, 2, 110, 200, 10000],
    [6, 1, 4, 70, 300, 12500],
    [9, 2, 3, 50, 300, 12500],
    [10, 1, 2, 60, 300, 12500],
    [8, 4, 2, 50, 300, 12500],
    [11, 6, 8, 40, 300, 12500],
    [6, 8, 1, 50, 300, 12500],
    [5, 2, 4, 30, 300, 12500],
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

const generateLicense = (isHard: boolean): number => {
    return isHard ? licenses[Math.floor(Math.random() * licenses.length)] : 0;
};

const makeTask = (index: number, data: number[], isHard: boolean): Task => {
    const randomLicense = generateLicense(isHard);
    return new Task(index, data[0], data[1], data[2], data[3], data[4], data[5], randomLicense);
}

const taskGenerator = (isHard: boolean): Task[][] => {

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
        makeTask(index++, taskGeneratorData[getRandomElementAndRemove(firstDealData)!], isHard),
        makeTask(index++, taskGeneratorData[getRandomElementAndRemove(firstDealData)!], isHard),
        makeTask(index++, taskGeneratorData[getRandomElementAndRemove(firstDealData)!], isHard),
        makeTask(index++, taskGeneratorData[getRandomElementAndRemove(firstDealData)!], isHard)
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
                makeTask(index++, taskGeneratorData[getRandomElementAndRemove(d)!], isHard),
                makeTask(index++, taskGeneratorData[getRandomElementAndRemove(d)!], isHard),
                makeTask(index++, taskGeneratorData[getRandomElementAndRemove(d)!], isHard),
                makeTask(index++, taskGeneratorData[getRandomElementAndRemove(d)!], isHard)
            ]);
        } else {
            res.push([]);
        }
    }

    return res;
};

export default taskGenerator;
