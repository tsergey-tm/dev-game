import {GameResult} from "../GameResultContext";
import {calcNextWeek} from "../GameProcessor";
import taskGenerator from "../TaskGenerator";
import {InitParams} from "../Constants";

type ApplyStrategy = (gameResult: GameResult, threshold: number) => void;


/**
 * Применяет выигрышную стратегию:
 * перемещает задачи из backlog (cols[0]) в todo (cols[1]).
 *
 * Правила:
 * - задачи с tester === 0 берём в todo сразу (независимо от порога)
 * - пока testHours < threshold, добавляем задачи по приоритету money/tester (убывание)
 */
const applyStrategyTCU: ApplyStrategy = (gameResult: GameResult, threshold: number): void => {
    const backlog = gameResult.cols[0];
    const todo = gameResult.cols[1];

    // Берём задачи без тестирования (tester === 0) сразу, без учёта порога
    for (let i = backlog.length - 1; i >= 0; i--) {
        if (backlog[i].tester === 0) {
            const [task] = backlog.splice(i, 1);
            todo.push(task);
        }
    }

    // Если testHours уже >= threshold — дальше не берём
    if (gameResult.testHours >= threshold) {
        return;
    }

    // Сортируем оставшиеся задачи в backlog по приоритету money/tester (убывание)
    const sorted = backlog.slice().sort((a, b) => {
        const prioA = a.money / a.tester;
        const prioB = b.money / b.tester;
        return prioB - prioA;
    });

    // Добавляем задачи пока testHours < threshold
    for (const task of sorted) {
        if (gameResult.testHours >= threshold) {
            break;
        }
        const idx = backlog.indexOf(task);
        if (idx !== -1) {
            backlog.splice(idx, 1);
            todo.push(task);
            gameResult.testHours += task.tester;
        }
    }
};

/**
 * Запускает симуляцию 26 недель с заданным порогом threshold.
 *
 * Порядок событий за каждую неделю:
 * 1. calcNextWeek:
 *    - если week >= 0: обрабатывает текущий todo (команды работают)
 *    - week++
 *    - добавляет новые задачи в backlog (cols[0]) из tasks.shift()
 * 2. Игрок двигает задачи из backlog в todo (applyStrategyTCU)
 * На следующей итерации команды обрабатывают обновлённый todo.
 *
 * Возвращает итоговую прибыль (income - consumption) после 26 недель.
 */
const runSimulation =
    (threshold: number, applyStrategy: ApplyStrategy, isHard: boolean): number => {
        // Инициализация игры
        let gameResult = new GameResult(taskGenerator(isHard), isHard);
        const initParams = new InitParams();

        // Первый вызов: week -1 -> 0, добавляет начальные задачи в cols[0]
        // Ничего не делает кроме увеличения week и добавления задач
        gameResult = calcNextWeek(gameResult, initParams);

        // 26 рабочих недель (week 0..25)
        for (let week = 0; week < 26; week++) {
            // Игрок двигает задачи из только что пополненного backlog в to do
            applyStrategy(gameResult, threshold);

            // Команда работает (week >= 0)
            gameResult = calcNextWeek(gameResult, initParams);
        }

        return gameResult.income - gameResult.consumption;
    };

/**
 * Стратегия по себестоимости:
 * - пока testHours < threshold, добавляем задачи по убыванию приоритета money/primeCost
 * - защита от деления на ноль: если primeCost === 0, приоритет = Infinity
 */
const applyStrategyCostPrice: ApplyStrategy = (gameResult: GameResult, threshold: number): void => {
    const backlog = gameResult.cols[0];
    const todo = gameResult.cols[1];

    // Если testHours уже >= threshold — не берём задачи
    if (gameResult.testHours >= threshold) {
        return;
    }

    // Сортируем задачи в backlog по приоритету money/primeCost (убывание)
    const sorted = backlog.slice().sort((a, b) => {
        const prioA = a.money / a.primeCost;
        const prioB = b.money / b.primeCost;
        return prioB - prioA;
    });

    // Добавляем задачи пока testHours < threshold
    for (const task of sorted) {
        if (gameResult.testHours >= threshold) {
            break;
        }
        const idx = backlog.indexOf(task);
        if (idx !== -1) {
            backlog.splice(idx, 1);
            todo.push(task);
            gameResult.testHours += task.tester;
        }
    }
};


describe('Оптимальный порог testHours для разных стратегий', () => {

    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    const minThreshold = 80;
    const maxThreshold = 800;

    test('Стратегия проход на ограничение на простом уровне', () => {

        let maxProfit = -Infinity;
        let bestThreshold = 0;

        for (let threshold = minThreshold; threshold <= maxThreshold; threshold += 10) {
            const profit = runSimulation(threshold, applyStrategyTCU, false);

            process.stdout.write(`Порог ${threshold} ч → прибыль: ${profit}\n`);

            if (profit > maxProfit) {
                maxProfit = profit;
                bestThreshold = threshold;
            }
        }

        process.stdout.write('\n');
        process.stdout.write('=== МАКСИМАЛЬНЫЙ РЕЗУЛЬТАТ ===\n');
        process.stdout.write(`Оптимальный порог: ${bestThreshold} часов\n`);
        process.stdout.write(`Максимальная прибыль: ${maxProfit}\n`);
        process.stdout.write('==============================\n');

    });

    test('Стратегия деньги на себестоимость на простом уровне', () => {

        let maxProfit = -Infinity;
        let bestThreshold = 0;

        for (let threshold = minThreshold; threshold <= maxThreshold; threshold += 10) {
            const profit = runSimulation(threshold, applyStrategyCostPrice, false);

            process.stdout.write(`Порог ${threshold} ч → прибыль: ${profit}\n`);

            if (profit > maxProfit) {
                maxProfit = profit;
                bestThreshold = threshold;
            }
        }

        process.stdout.write('\n');
        process.stdout.write('=== МАКСИМАЛЬНЫЙ РЕЗУЛЬТАТ ===\n');
        process.stdout.write(`Оптимальный порог: ${bestThreshold} часов\n`);
        process.stdout.write(`Максимальная прибыль: ${maxProfit}\n`);
        process.stdout.write('==============================\n');
    });

    test('Стратегия проход на ограничение на сложном уровне', () => {

        let maxProfit = -Infinity;
        let bestThreshold = 0;

        for (let threshold = minThreshold; threshold <= maxThreshold; threshold += 10) {
            const profit = runSimulation(threshold, applyStrategyTCU, true);

            process.stdout.write(`Порог ${threshold} ч → прибыль: ${profit}\n`);

            if (profit > maxProfit) {
                maxProfit = profit;
                bestThreshold = threshold;
            }
        }

        process.stdout.write('\n');
        process.stdout.write('=== МАКСИМАЛЬНЫЙ РЕЗУЛЬТАТ ===\n');
        process.stdout.write(`Оптимальный порог: ${bestThreshold} часов\n`);
        process.stdout.write(`Максимальная прибыль: ${maxProfit}\n`);
        process.stdout.write('==============================\n');

    });

    test('Стратегия деньги на себестоимость на сложном уровне', () => {

        let maxProfit = -Infinity;
        let bestThreshold = 0;

        for (let threshold = minThreshold; threshold <= maxThreshold; threshold += 10) {
            const profit = runSimulation(threshold, applyStrategyCostPrice, true);

            process.stdout.write(`Порог ${threshold} ч → прибыль: ${profit}\n`);

            if (profit > maxProfit) {
                maxProfit = profit;
                bestThreshold = threshold;
            }
        }

        process.stdout.write('\n');
        process.stdout.write('=== МАКСИМАЛЬНЫЙ РЕЗУЛЬТАТ ===\n');
        process.stdout.write(`Оптимальный порог: ${bestThreshold} часов\n`);
        process.stdout.write(`Максимальная прибыль: ${maxProfit}\n`);
        process.stdout.write('==============================\n');
    });
});

describe('Проверка диапазонов при случайной игре', () => {

    const repeatCount = 100;
    const minThreshold = 200;
    const maxThreshold = 300;

    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    test('Стратегия проход на ограничение на простом уровне', () => {
        for (let threshold = minThreshold; threshold <= maxThreshold; threshold += 10) {
            const profits = [];
            for (let i = 0; i < repeatCount; i++) {
                const profit = runSimulation(threshold, applyStrategyTCU, false);
                profits.push(profit);
            }
            const minProfit = profits.reduce((min, p) => Math.min(min, p), Infinity);
            process.stdout.write(`Порог ${threshold} ч → прибыль: ${minProfit}\n`);
            expect(profits.every(p => p >= 0)).toBe(true);
        }
    });

    test('Стратегия деньги на себестоимость на простом уровне', () => {
        for (let threshold = minThreshold; threshold <= maxThreshold; threshold += 10) {
            const profits = [];
            for (let i = 0; i < repeatCount; i++) {
                const profit = runSimulation(threshold, applyStrategyCostPrice, false);
                profits.push(profit);
            }
            const maxProfit = profits.reduce((max, p) => Math.max(max, p), -Infinity);
            process.stdout.write(`Порог ${threshold} ч → прибыль: ${maxProfit}\n`);
            expect(profits.every(p => p <= 0)).toBe(true);
        }
    });

    test('Стратегия проход на ограничение на сложном уровне', () => {
        for (let threshold = minThreshold; threshold <= maxThreshold; threshold += 10) {
            const profits = [];
            for (let i = 0; i < repeatCount; i++) {
                const profit = runSimulation(threshold, applyStrategyTCU, true);
                profits.push(profit);
            }
            const minProfit = profits.reduce((min, p) => Math.min(min, p), Infinity);
            process.stdout.write(`Порог ${threshold} ч → прибыль: ${minProfit}\n`);
            expect(profits.every(p => p >= 0)).toBe(true);
        }
    });

    test('Стратегия деньги на себестоимость на сложном уровне', () => {
        for (let threshold = minThreshold; threshold <= maxThreshold; threshold += 10) {
            const profits = [];
            for (let i = 0; i < repeatCount; i++) {
                const profit = runSimulation(threshold, applyStrategyCostPrice, true);
                profits.push(profit);
            }
            const maxProfit = profits.reduce((max, p) => Math.max(max, p), -Infinity);
            process.stdout.write(`Порог ${threshold} ч → прибыль: ${maxProfit}\n`);
            expect(profits.every(p => p <= 0)).toBe(true);
        }
    });
});
