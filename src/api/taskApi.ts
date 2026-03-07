import axios from "axios";
import type { CreateTaskPayload, Task, UpdateTaskInput } from "../types";

import { loadTasks, saveTasks, delay } from "../utils";
import { DELAY_MS } from "../constants";

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
