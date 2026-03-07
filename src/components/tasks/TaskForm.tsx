import Container from "@mui/material/Container"

import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import type { CreateTaskPayload } from "../../types"
import { useState } from "react"
import useCreateTask from "../../hooks/useCreateTask"
import { useTask } from "../../hooks/useTask"


const ButtonTitle = {
    EDIT_TASK: "Edit",
    ADD_NEW_TASK: "Add"
}

const initialState = {
    title: "",
    description: "",
    completed: false,

}



const TaskForm = ({ mode = "ADD_NEW_TASK" }: { mode: "ADD_NEW_TASK" | "EDIT_TASK" }) => {

    const { mutate: createTask, isPending } = useCreateTask()
    const { refetch } = useTask();
    const [form, setForm] = useState<CreateTaskPayload>(initialState);


    const handleSubmit = () => {
        createTask(form, {
            onSuccess: () => {
                setForm({ ...initialState, })
                refetch()
            }
        })
    }



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