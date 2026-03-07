import { createContext } from 'react';
import type { NotificationContextType } from '../../types/index';

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
