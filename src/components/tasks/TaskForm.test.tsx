import { render, screen } from '@testing-library/react';
import TaskForm from './TaskForm';

jest.mock('../../hooks/useCreateTask', () => ({
    __esModule: true,
    default: () => ({
        mutate: jest.fn(),
        isPending: false
    })
}));

jest.mock('../../hooks/useUpdateTask', () => ({
    __esModule: true,
    default: () => ({
        mutate: jest.fn(),
        isPending: false
    })
}));

jest.mock('../../hooks/useTask', () => ({
    useTask: () => ({
        refetch: jest.fn()
    })
}));

describe('TaskForm', () => {
    it('renders Add New Task mode correctly', () => {
        render(<TaskForm mode="ADD_NEW_TASK" />);

        expect(screen.getByLabelText(/Task Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Task Description/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
    });

    it('renders Edit Task mode correctly', () => {
        const initialData = { title: 'Test Task', description: 'Test Description' };

        render(
            <TaskForm
                mode="EDIT_TASK"
                taskId="1"
                initialData={initialData}
            />
        );

        expect(screen.getByLabelText(/Task Name/i)).toHaveValue('Test Task');
        expect(screen.getByLabelText(/Task Description/i)).toHaveValue('Test Description');
        expect(screen.getByRole('button', { name: /Edit/i })).toBeInTheDocument();
    });
});
