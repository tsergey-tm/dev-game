import taskGenerator, { taskGeneratorData } from '../TaskGenerator';
import { Task } from '../GameResultContext';

/** Проверяет, что строка данных data совпадает с полями Task */
const taskMatchesData = (task: Task, data: number[]): boolean =>
    data[0] === task.product &&
    data[1] === task.designer &&
    data[2] === task.editor &&
    data[3] === task.developer &&
    data[4] === task.tester &&
    data[5] === task.money;

/** Вычисляет «сигнатуру» результата — строку индексов taskGeneratorData по порядку задач */
const signature = (result: ReturnType<typeof taskGenerator>): string =>
    result
        .flat()
        .map((task) => taskGeneratorData.findIndex((data) => taskMatchesData(task, data)))
        .join(',');

describe('taskGenerator', () => {
    it('все возвращаемые Task содержат данные из taskGeneratorData', () => {
        const result = taskGenerator();
        const allTasks = result.flat();

        allTasks.forEach((task) => {
            const matchingData = taskGeneratorData.find((data) => taskMatchesData(task, data));
            expect(matchingData).toBeDefined();
        });
    });

    it('каждая строка taskGeneratorData используется не более одного раза за вызов', () => {
        const result = taskGenerator();
        const allTasks = result.flat();

        const usedDataIndices: number[] = [];

        allTasks.forEach((task) => {
            const dataIndex = taskGeneratorData.findIndex(
                (data, idx) => !usedDataIndices.includes(idx) && taskMatchesData(task, data)
            );

            expect(dataIndex).not.toBe(-1);
            usedDataIndices.push(dataIndex);
        });
    });

    it('индексы Task назначены последовательно начиная с 0', () => {
        const result = taskGenerator();
        const allTasks = result.flat();

        allTasks.forEach((task, i) => {
            expect(task.index).toBe(i);
        });
    });

    it('порядок задач в разных вызовах taskGenerator отличается', () => {
        // Запускаем 10 раз и проверяем, что хотя бы две сигнатуры различаются
        const RUNS = 10;
        const signatures = Array.from({ length: RUNS }, () => signature(taskGenerator()));
        const uniqueSignatures = new Set(signatures);

        expect(uniqueSignatures.size).toBeGreaterThan(1);
    });
});
