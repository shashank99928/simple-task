import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskForm from './TaskForm';

const mockCreateMutate = jest.fn((_data, options) => {
    if (options && options.onSuccess) options.onSuccess();
});
jest.mock('../../hooks/useCreateTask', () => ({
    __esModule: true,
    default: () => ({
        mutate: mockCreateMutate,
        isPending: false
    })
}));

const mockUpdateMutate = jest.fn((_data, options) => {
    if (options && options.onSuccess) options.onSuccess();
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

describe('TaskForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders Add New Task mode correctly', () => {
        render(<TaskForm mode="ADD_NEW_TASK" />);

        expect(screen.getByLabelText(/Task Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Task Description/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Add New Task/i })).toBeInTheDocument();
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
        expect(screen.getByRole('button', { name: /Update Task/i })).toBeInTheDocument();
    });

    it('shows validation error when title is empty and form is submitted', async () => {
        render(<TaskForm mode="ADD_NEW_TASK" />);

        fireEvent.click(screen.getByRole('button', { name: /Add New Task/i }));

        await waitFor(() => {
            expect(screen.getByText('Title is mandatory')).toBeInTheDocument();
            expect(mockCreateMutate).not.toHaveBeenCalled();
        });
    });

    it('shows validation error when title contains only spaces', async () => {
        render(<TaskForm mode="ADD_NEW_TASK" />);

        const titleInput = screen.getByLabelText(/Task Name/i);
        fireEvent.change(titleInput, { target: { value: '   ' } });
        fireEvent.click(screen.getByRole('button', { name: /Add New Task/i }));

        await waitFor(() => {
            expect(screen.getByText('Title is mandatory')).toBeInTheDocument();
            expect(mockCreateMutate).not.toHaveBeenCalled();
        });
    });

    it('clears validation error when user starts typing', async () => {
        render(<TaskForm mode="ADD_NEW_TASK" />);

        // Trigger validation error
        fireEvent.click(screen.getByRole('button', { name: /Add New Task/i }));

        await waitFor(() => {
            expect(screen.getByText('Title is mandatory')).toBeInTheDocument();
        });

        // Type to clear error
        const titleInput = screen.getByLabelText(/Task Name/i);
        fireEvent.change(titleInput, { target: { value: 'a' } });

        await waitFor(() => {
            expect(screen.queryByText('Title is mandatory')).not.toBeInTheDocument();
        });
    });

    it('creates a task successfully when valid input is provided', async () => {
        const onSuccessMock = jest.fn();
        render(<TaskForm mode="ADD_NEW_TASK" onSuccess={onSuccessMock} />);

        const titleInput = screen.getByLabelText(/Task Name/i);
        const descInput = screen.getByLabelText(/Task Description/i);

        fireEvent.change(titleInput, { target: { value: 'New Task' } });
        fireEvent.change(descInput, { target: { value: 'New Description' } });

        fireEvent.click(screen.getByRole('button', { name: /Add New Task/i }));

        await waitFor(() => {
            expect(mockCreateMutate).toHaveBeenCalledWith(
                { title: 'New Task', description: 'New Description', completed: false },
                expect.any(Object)
            );
            expect(mockRefetch).toHaveBeenCalled();
            expect(onSuccessMock).toHaveBeenCalled();

            // Check if form is reset
            expect(screen.getByLabelText(/Task Name/i)).toHaveValue('');
            expect(screen.getByLabelText(/Task Description/i)).toHaveValue('');
        });
    });

    it('updates a task successfully when valid input is provided in edit mode', async () => {
        const initialData = { title: 'Test Task', description: 'Test Description' };
        const onSuccessMock = jest.fn();

        render(
            <TaskForm
                mode="EDIT_TASK"
                taskId="1"
                initialData={initialData}
                onSuccess={onSuccessMock}
            />
        );

        const titleInput = screen.getByLabelText(/Task Name/i);
        fireEvent.change(titleInput, { target: { value: 'Updated Task' } });

        fireEvent.click(screen.getByRole('button', { name: /Update Task/i }));

        await waitFor(() => {
            expect(mockUpdateMutate).toHaveBeenCalledWith(
                {
                    id: '1',
                    payload: { title: 'Updated Task', description: 'Test Description' }
                },
                expect.any(Object)
            );
            expect(mockRefetch).toHaveBeenCalled();
            expect(onSuccessMock).toHaveBeenCalled();
        });
    });
});
