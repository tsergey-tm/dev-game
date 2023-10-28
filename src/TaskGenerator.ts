import {Task} from "./GameResultContext";

const TaskGenerator = (week: number, taskIndex: number) => {
    switch (week % 5) {
        case 1:
            return [
                new Task("TASK-" + (taskIndex), 5, 0, 0, 300, 10, 500),
                new Task("TASK-" + (taskIndex + 1), 10, 2, 1, 300, 0, 100),
                new Task("TASK-" + (taskIndex + 2), 15, 4, 2, 150, 100, 300),
                new Task("TASK-" + (taskIndex + 3), 5, 4, 2, 100, 100, 300)
            ];

        case 2:
            return [
                new Task("TASK-" + (taskIndex), 10, 8, 8, 100, 100, 500),
                new Task("TASK-" + (taskIndex + 1), 10, 8, 4, 200, 60, 300),
                new Task("TASK-" + (taskIndex + 2), 5, 4, 2, 100, 40, 400),
                new Task("TASK-" + (taskIndex + 3), 5, 4, 2, 200, 10, 400)
            ];

        case 3:
            return [
                new Task("TASK-" + (taskIndex), 10, 4, 8, 100, 50, 500),
                new Task("TASK-" + (taskIndex + 1), 10, 8, 1, 100, 70, 280),
                new Task("TASK-" + (taskIndex + 2), 10, 6, 2, 400, 0, 200),
                new Task("TASK-" + (taskIndex + 3), 10, 4, 2, 50, 30, 300)
            ];

        case 4:
            return [
                new Task("TASK-" + (taskIndex), 15, 6, 4, 50, 200, 1000),
                new Task("TASK-" + (taskIndex + 1), 10, 6, 1, 300, 10, 500),
                new Task("TASK-" + (taskIndex + 2), 15, 4, 2, 150, 200, 1000),
                new Task("TASK-" + (taskIndex + 3), 15, 4, 2, 30, 200, 1000)
            ];

        default:
            return [
                new Task("TASK-" + (taskIndex), 10, 8, 4, 200, 60, 600),
                new Task("TASK-" + (taskIndex + 1), 10, 8, 4, 100, 30, 300),
                new Task("TASK-" + (taskIndex + 2), 10, 8, 4, 10, 70, 210),
                new Task("TASK-" + (taskIndex + 3), 15, 0, 1, 100, 100, 300)
            ];
    }
};

export default TaskGenerator;