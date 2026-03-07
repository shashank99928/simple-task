import { render, screen } from '@testing-library/react';
import { NotificationProvider, useNotification } from './Notification';
import { useEffect } from 'react';

// A simple test component to consume the notification context
const TestComponent = () => {
    const { notifySuccess } = useNotification();

    useEffect(() => {
        notifySuccess('Test notification message');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div>Test Child</div>;
};

describe('Notification', () => {
    it('provides context and renders notification when triggered', () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );

        expect(screen.getByText('Test Child')).toBeInTheDocument();
        // The snackbar with the message should eventually show up based on the state update
        expect(screen.getByText('Test notification message')).toBeInTheDocument();
    });
});
