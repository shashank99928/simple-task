import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TaskList from './TaskList';

jest.mock('../../hooks/useDeleteTask', () => ({
    // __esModule: true,
    default: () => ({
        mutate: jest.fn(),
        isPending: false
    })
}));

jest.mock('../../hooks/useUpdateTask', () => ({
    // __esModule: true,
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

describe('TaskList', () => {
    const mockTasks = [
        { id: '1', title: 'First Task', description: 'Desc 1', completed: false, createdAt: '2023-01-01' },
        { id: '2', title: 'Second Task', description: 'Desc 2', completed: true, createdAt: '2023-01-02' }
    ];

    it('renders empty state when no tasks are provided', () => {
        render(<TaskList tasks={[]} />);

        expect(screen.getByText('Task List')).toBeInTheDocument();
        expect(screen.getByText('No tasks found')).toBeInTheDocument();
    });

    it('renders list of tasks correctly', () => {
        render(
            <MemoryRouter>
                <TaskList tasks={mockTasks} />
            </MemoryRouter>
        );

        expect(screen.getByText('1. First Task')).toBeInTheDocument();
        expect(screen.getByText('2. Second Task')).toBeInTheDocument();
        // Since there are 2 tasks and 1 delete icon per task
        expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(2);
    });
});
