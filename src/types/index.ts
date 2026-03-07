import type { AlertColor } from "@mui/material";

export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string;
}

export interface NotificationState {
    message: string;
    severity: AlertColor;
    open: boolean;
}

export interface NotificationContextType {
    notifySuccess: (message: string) => void;
    notifyError: (message: string) => void;
    notifyInfo: (message: string) => void;
    notifyWarning: (message: string) => void;
}


export type CreateTaskPayload = Omit<Task, 'id' | 'createdAt' | 'completed'>;
export type UpdateTaskInput = Omit<Task, 'id' | 'createdAt'>;