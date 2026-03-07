import { useState, type ReactNode, type SyntheticEvent } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { type AlertColor } from '@mui/material/Alert';
import type { NotificationState } from '../../types';
import { NotificationContext } from './NotificationContext';

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notification, setNotification] = useState<NotificationState>({
        message: '',
        severity: 'info',
        open: false
    });

    const notify = (message: string, severity: AlertColor) => {
        setNotification({ message, severity, open: true });
    };


    const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification(prev => ({ ...prev, open: false }));
    };

    const notifySuccess = (message: string) => notify(message, 'success');
    const notifyError = (message: string) => notify(message, 'error');
    const notifyInfo = (message: string) => notify(message, 'info');
    const notifyWarning = (message: string) => notify(message, 'warning');

    return (
        <NotificationContext.Provider value={{
            notifySuccess,
            notifyError,
            notifyInfo,
            notifyWarning
        }}>
            {children}
            <Snackbar
                open={notification.open}
                autoHideDuration={1000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleClose}
                    severity={notification.severity}
                    elevation={6}
                    variant="filled"
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
};