import Container from "@mui/material/Container"

import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import type { CreateTaskPayload, UpdateTaskInput } from "../../types"
import { useState } from "react"
import useCreateTask from "../../hooks/useCreateTask"
import useUpdateTask from "../../hooks/useUpdateTask"
import { useTask } from "../../hooks/useTask"
import { useEffect } from "react"

const ButtonTitle = {
    EDIT_TASK: "Edit",
    ADD_NEW_TASK: "Save"
}

const initialState = {
    title: "",
    description: "",
    completed: false,

}



interface TaskFormProps {
    mode?: "ADD_NEW_TASK" | "EDIT_TASK";
    taskId?: string;
    initialData?: CreateTaskPayload & { completed?: boolean };
    onSuccess?: () => void;
}

const TaskForm = ({ mode = "ADD_NEW_TASK", taskId, initialData, onSuccess }: TaskFormProps) => {

    const { mutate: createTask, isPending: isCreating } = useCreateTask()
    const { mutate: updateTask, isPending: isUpdating } = useUpdateTask()
    const { refetch } = useTask();
    const [form, setForm] = useState<CreateTaskPayload & { completed?: boolean }>(initialData || initialState);

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        }
    }, [initialData]);


    const handleSubmit = () => {
        if (mode === "EDIT_TASK" && taskId) {
            updateTask({ id: taskId, payload: form as UpdateTaskInput }, {
                onSuccess: () => {
                    refetch();
                    if (onSuccess) onSuccess();
                }
            });
        } else {
            createTask(form, {
                onSuccess: () => {
                    setForm({ ...initialState });
                    refetch();
                    if (onSuccess) onSuccess();
                }
            });
        }
    }

    const isPending = isCreating || isUpdating;



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }


    return (
        <Container>
            <TextField
                name="title"
                label="Task Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={form.title}
                onChange={handleChange}
                required
            />
            <TextField
                name="description"
                label="Task Description"
                variant="outlined"
                fullWidth
                margin="normal"
                value={form.description}
                onChange={handleChange}
            />

            <Button variant="contained" disabled={isPending} fullWidth onClick={handleSubmit}>{ButtonTitle[mode]}</Button>

        </Container>
    )
}

export default TaskForm