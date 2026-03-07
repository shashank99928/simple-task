import type { Task } from "../types";

export const STORAGE_KEY = 'tasks_data';
export const DELAY_MS = 600;

export const INITIAL_TASKS: Task[] = [
    {
        id: '1',
        title: 'Gym in the morning',
        description: 'Legs and abs',
        completed: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Workout in the evening ',
        description: 'Chest and back light workout',
        completed: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: '3',
        title: 'Buy Groceries',
        description: 'Buy Groceries plant protien, peanuts butter, fruits, vegetables',
        completed: false,
        createdAt: new Date().toISOString(),
    }
];
