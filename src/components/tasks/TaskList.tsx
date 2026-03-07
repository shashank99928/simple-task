import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import type { Task } from "../../types"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { Link } from "react-router-dom"
import { IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import ConfirmationDialog from "../common/ConfirmationDialog";
import Checkbox from '@mui/material/Checkbox';
import useDeleteTask from "../../hooks/useDeleteTask";
import { useTask } from "../../hooks/useTask"
import useUpdateTask from "../../hooks/useUpdateTask"


const TaskList = ({ tasks }: { tasks: Task[] }) => {
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const { mutate: deleteTask } = useDeleteTask();
    const { refetch } = useTask();

    const { mutate: updateTask, isPending } = useUpdateTask();

    const handleToggleCheckbox = (formData: Task) => {
        const payload = {
            ...formData,
            completed: !formData.completed
        }
        updateTask({ id: formData.id as string, payload }, {
            onSuccess: () => {
                refetch()
            }
        })
    }

    if (!tasks || tasks.length === 0) {
        return (
            <Container>
                <Typography variant="h4">Task List</Typography>
                <Typography variant="body1">No tasks found</Typography>
            </Container>
        )
    }


    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mx: 2 }} textAlign={"start"} fontWeight={"bold"} >Task List</Typography>
            <List>
                {tasks.map((task, index) => (
                    <ListItem key={task.id} secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => setDeleteId(task.id as string)}>
                            <DeleteIcon color="error" />
                        </IconButton>
                    }>
                        <ListItemText primary={
                            <>
                                <Checkbox disabled={isPending} checked={task.completed} onChange={() => {
                                    handleToggleCheckbox(task)
                                }} />

                                <Link to={`/task/${task.id}`}>
                                    <Typography component="span" sx={task.completed ? { textDecoration: 'line-through', color: 'gray' } : {}}>{index + 1}. {task.title}</Typography>
                                </Link>
                            </>
                        }
                        />

                    </ListItem>
                ))}
            </List>
            <ConfirmationDialog
                open={!!deleteId}
                onClose={() => setDeleteId(null)}
                onSucces={() => {
                    if (deleteId) {
                        deleteTask(deleteId, {
                            onSuccess: () => {
                                refetch()
                            }
                        });
                    }
                    setDeleteId(null);
                }}
            />
        </Container>
    )
}

export default TaskList