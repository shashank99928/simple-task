import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TaskList from './TaskList';

const mockDeleteMutate = jest.fn((_id, options) => {
    if (options && options.onSuccess) {
        options.onSuccess();
    }
});
jest.mock('../../hooks/useDeleteTask', () => ({
    __esModule: true,
    default: () => ({
        mutate: mockDeleteMutate,
        isPending: false
    })
}));

const mockUpdateMutate = jest.fn((_id, options) => {
    if (options && options.onSuccess) {
        options.onSuccess();
    }
});
jest.mock('../../hooks/useUpdateTask', () => ({
    __esModule: true,
    default: () => ({
        mutate: mockUpdateMutate,
        isPending: false
    })
}));

const mockRefetch = jest.fn();
jest.mock('../../hooks/useTask', () => ({
    useTask: () => ({
        refetch: mockRefetch
    })
}));

describe('TaskList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockTasks = [
        { id: '1', title: 'First Task', description: 'Desc 1', completed: false, createdAt: '2023-01-01' },
        { id: '2', title: 'Second Task', description: 'Desc 2', completed: true, createdAt: '2023-01-02' }
    ];

    it('renders empty state when no tasks are provided', () => {
        render(<TaskList tasks={[]} />);

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

    it('opens confirmation dialog on delete button click, and calls delete on accept', async () => {
        render(
            <MemoryRouter>
                <TaskList tasks={mockTasks} />
            </MemoryRouter>
        );

        const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
        fireEvent.click(deleteButtons[0]);

        // Dialog should open
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        const acceptButton = screen.getByText('Accept');

        fireEvent.click(acceptButton);

        await waitFor(() => {
            expect(mockDeleteMutate).toHaveBeenCalledWith('1', expect.any(Object));
            expect(mockRefetch).toHaveBeenCalled();
        });
    });

    it('toggles task status when checkbox is clicked', async () => {
        render(
            <MemoryRouter>
                <TaskList tasks={mockTasks} />
            </MemoryRouter>
        );

        const checkboxes = screen.getAllByRole('checkbox');
        // Uncompleted task (First Task)
        fireEvent.click(checkboxes[0]);

        await waitFor(() => {
            expect(mockUpdateMutate).toHaveBeenCalledWith(
                {
                    id: '1',
                    payload: { ...mockTasks[0], completed: true }
                },
                expect.any(Object)
            );
            expect(mockRefetch).toHaveBeenCalled();
        });
    });
});
