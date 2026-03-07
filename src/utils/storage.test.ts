import { loadTasks, saveTasks } from './storage';
import { STORAGE_KEY, INITIAL_TASKS } from '../constants';
import type { Task } from '../types';

describe('storage utility', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    describe('loadTasks', () => {
        it('should return INITIAL_TASKS and save them when localStorage is empty', () => {
            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

            const tasks = loadTasks();

            expect(tasks).toEqual(INITIAL_TASKS);
            expect(setItemSpy).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
        });

        it('should return tasks from localStorage when they exist', () => {
            const mockTasks: Task[] = [{ id: '1', title: 'Test Task', description: 'Desc', completed: false, createdAt: new Date().toISOString() }];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks));

            const tasks = loadTasks();

            expect(tasks).toEqual(mockTasks);
        });
    });

    describe('saveTasks', () => {
        it('should save tasks to localStorage correctly', () => {
            const mockTasks: Task[] = [{ id: '1', title: 'Test Task', description: 'Desc', completed: false, createdAt: new Date().toISOString() }];

            saveTasks(mockTasks);

            const stored = localStorage.getItem(STORAGE_KEY);
            expect(stored).toEqual(JSON.stringify(mockTasks));
        });
    });
});
