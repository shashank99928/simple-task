import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import TaskList from "./TaskList";

const mockDeleteMutate = jest.fn((_id, options) => {
  if (options && options.onSuccess) {
    options.onSuccess();
  }
});
jest.mock("../../hooks/useDeleteTask", () => ({
  __esModule: true,
  default: () => ({
    mutate: mockDeleteMutate,
    isPending: false,
  }),
}));

const mockUpdateMutate = jest.fn((_id, options) => {
  if (options && options.onSuccess) {
    options.onSuccess();
  }
});
jest.mock("../../hooks/useUpdateTask", () => ({
  __esModule: true,
  default: () => ({
    mutate: mockUpdateMutate,
    isPending: false,
  }),
}));

jest.mock("../../hooks/useTask", () => ({
  useTask: () => ({
    data: [],
    isFetching: false,
    isError: false,
    refetch: jest.fn(),
  }),
}));

describe("TaskList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockTasks = [
    {
      id: "1",
      title: "First Task",
      description: "Desc 1",
      completed: false,
      createdAt: "2023-01-01",
    },
    {
      id: "2",
      title: "Second Task",
      description: "Desc 2",
      completed: true,
      createdAt: "2023-01-02",
    },
  ];

  it("renders empty state when no tasks are provided", () => {
    render(<TaskList tasks={[]} />);
    expect(screen.getByText("No tasks found")).toBeInTheDocument();
  });

  it("renders list of tasks correctly", () => {
    render(
      <MemoryRouter>
        <TaskList tasks={mockTasks} />
      </MemoryRouter>,
    );

    expect(screen.getByText("1. First Task")).toBeInTheDocument();
    expect(screen.getByText("2. Second Task")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /delete/i })).toHaveLength(2);
  });

  it("opens confirmation dialog on delete button click, and calls delete on accept", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <TaskList tasks={mockTasks} />
      </MemoryRouter>,
    );

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });

    await user.click(deleteButtons[0]);

    const cancelButton = await screen.findByRole("button", { name: /Cancel/i });
    expect(cancelButton).toBeInTheDocument();

    const acceptButton = screen.getByRole("button", {
      name: /Confirm Deletion/i,
    });
    await user.click(acceptButton);

    // 2. FIXED: Removed the incorrect expect.anything() argument
    await waitFor(() => {
      expect(mockDeleteMutate).toHaveBeenCalledWith("1");
    });

    // Wait for the dialog to close. Since it uses keepMounted, check that the Cancel button is no longer visible
    await waitFor(() => {
      const cancelButton = screen.queryByRole("button", { name: /Cancel/i });
      if (cancelButton) {
        expect(cancelButton).not.toBeVisible();
      }
    });
  });

  it("toggles task status when checkbox is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <TaskList tasks={mockTasks} />
      </MemoryRouter>,
    );

    const checkboxes = screen.getAllByRole("checkbox");

    await user.click(checkboxes[0]);

    // 3. FIXED: Removed the incorrect expect.anything() argument
    await waitFor(() => {
      expect(mockUpdateMutate).toHaveBeenCalledWith({
        id: "1",
        payload: { ...mockTasks[0], completed: true },
      });
    });
  });
});
