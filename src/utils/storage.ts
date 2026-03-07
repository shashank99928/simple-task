import type { Task } from "../types";
import { STORAGE_KEY, INITIAL_TASKS } from "../constants";

export const loadTasks = (): Task[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        return JSON.parse(data);
    }

    saveTasks(INITIAL_TASKS);
    return INITIAL_TASKS;
};

export const saveTasks = (tasks: Task[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
