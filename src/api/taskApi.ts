import axios from "axios";
import type { CreateTaskPayload, Task, UpdateTaskInput } from "../types";


const STORAGE_KEY = 'tasks_data';
const DELAY_MS = 600;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


const loadTasks = (): Task[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        return JSON.parse(data);
    }

    // Default data
    const initialTasks: Task[] = [
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
    saveTasks(initialTasks);
    return initialTasks;
};

const saveTasks = (tasks: Task[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};



// Create a custom axios instance
const apiClient = axios.create({
    baseURL: '/api'
});

apiClient.defaults.adapter = async (config) => {

    const method = config.method?.toLowerCase();
    const tasks = loadTasks();

    if (method === 'get') {
        await delay(DELAY_MS);

        const url = config.url;

        console.log({ url });

        if (url === '/tasks') {
            return { data: tasks, status: 200, statusText: 'OK', headers: {}, config };
        }

        const id = decodeURIComponent(url?.split('/').pop() || '');
        const task = tasks.find(task => String(task.id) === id);

        if (!task) {
            return Promise.reject(new Error('Task not found'));
        }

        return { data: task, status: 200, statusText: 'OK', headers: {}, config };
    }

    if (method === 'post') {
        await delay(DELAY_MS);
        const payload = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;

        const newTask = {
            id: payload.id || String(Date.now()),
            title: payload.title,
            description: payload.description,
            completed: payload.completed || false,
            createdAt: payload.createdAt || new Date().toISOString()
        };

        saveTasks([...tasks, newTask]);
        return { data: newTask, status: 200, statusText: 'OK', headers: {}, config };
    }

    if (method === 'put') {
        await delay(DELAY_MS);
        const urlArgs = config.url?.split('/') || [];
        const id = decodeURIComponent(urlArgs[urlArgs.length - 1] || '');

        const payload = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;

        const taskIndex = tasks.findIndex(t => String(t.id) === id);
        let updatedTask = undefined;

        if (taskIndex > -1) {
            updatedTask = { ...tasks[taskIndex], ...payload };
            tasks[taskIndex] = updatedTask;
            saveTasks([...tasks]);
        }

        return { data: updatedTask, status: 200, statusText: 'OK', headers: {}, config };
    }

    if (method === 'delete') {
        await delay(DELAY_MS);
        const urlArgs = config.url?.split('/') || [];
        const id = decodeURIComponent(urlArgs[urlArgs.length - 1] || '');

        const filteredTasks = tasks.filter(t => String(t.id) !== id);
        saveTasks(filteredTasks);

        return { data: { success: true }, status: 200, statusText: 'OK', headers: {}, config };
    }


    await delay(DELAY_MS);

    return { data: tasks, status: 200, statusText: 'OK', headers: {}, config };

}



export const taskApi = {
    getTasks: async (): Promise<Task[]> => {
        const response = await apiClient.get<Task[]>('/tasks');
        return response.data;
    },

    getTaskById: async (id: string): Promise<Task> => {
        const response = await apiClient.get<Task>(`/tasks/${id}`);
        return response.data;
    },

    createTask: async (payload: CreateTaskPayload): Promise<Task> => {
        const response = await apiClient.post<Task>('/tasks', payload);
        return response.data;
    },

    updateTask: async (id: string, payload: UpdateTaskInput): Promise<Task> => {
        const response = await apiClient.put<Task>(`/tasks/${id}`, payload);
        return response.data;
    },

    deleteTask: async (id: string): Promise<void> => {
        await apiClient.delete(`/tasks/${id}`);
    }
};
