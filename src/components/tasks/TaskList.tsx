import { useState } from "react";
import { Link } from "react-router-dom"
import { useTask } from "../../hooks/useTask"
import type { Task } from "../../types"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import IconButton from "@mui/material/IconButton"
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import ConfirmationDialog from "../common/ConfirmationDialog";
import Checkbox from '@mui/material/Checkbox';

import useDeleteTask from "../../hooks/useDeleteTask";
import useUpdateTask from "../../hooks/useUpdateTask"
import useTaskKeyboardNavigation from "../../hooks/useTaskKeyboardNavigation"



const TaskList = ({ tasks }: { tasks: Task[] }) => {
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const { mutate: deleteTask } = useDeleteTask();
    const { refetch } = useTask();
    const { mutate: updateTask, isPending } = useUpdateTask();

    const handleToggle = (formData: Task) => {
        const payload = { ...formData, completed: !formData.completed };
        updateTask({ id: formData.id as string, payload }, {
            onSuccess: () => refetch(),
        });
    };

    const { listRef, focusedIndex, setFocusedIndex, handleListKeyDown } =
        useTaskKeyboardNavigation({
            tasks,
            isPending,
            onToggle: handleToggle,
            onDelete: (id) => setDeleteId(id),
        });

    if (!tasks || tasks.length === 0) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>No tasks found</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block", px: 2 }}>
                💡 Keyboard: ↑↓ navigate · Enter/Space toggle · Delete remove
            </Typography>
            <List
                ref={listRef}
                aria-label="task list"
                onKeyDown={handleListKeyDown}
            >
                {tasks.map((task, index) => (
                    <ListItem
                        key={task.id}
                        data-task-item
                        tabIndex={index === 0 ? 0 : -1}
                        onFocus={() => setFocusedIndex(index)}
                        sx={{
                            borderRadius: 1,
                            mb: 0.5,
                            outline: focusedIndex === index ? "2px solid" : "none",
                            outlineColor: "primary.main",
                            outlineOffset: "2px",
                            "&:focus": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: "2px" },
                        }}
                        secondaryAction={
                            <IconButton
                                edge="end"
                                aria-label={`delete task ${task.title}`}
                                onClick={() => setDeleteId(task.id as string)}
                                tabIndex={-1}
                            >
                                <DeleteOutlined color="error" />
                            </IconButton>
                        }
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <Checkbox
                                disabled={isPending}
                                checked={task.completed}
                                tabIndex={-1}
                                onChange={() => handleToggle(task)}
                                inputProps={{ "aria-label": `mark ${task.title} as ${task.completed ? "incomplete" : "complete"}` }}
                                sx={{ p: 0.5 }}
                            />
                        </ListItemIcon>
                        <ListItemText primary={
                            <Link to={`/task/${task.id}`} tabIndex={-1} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography
                                    component="span"
                                    sx={task.completed ? { textDecoration: "line-through", color: "gray" } : {}}
                                >
                                    {index + 1}. {task.title}
                                </Typography>
                            </Link>
                        }
                        />
                    </ListItem>
                ))}
            </List>
            <ConfirmationDialog
                open={!!deleteId}
                onClose={() => setDeleteId(null)}
                onSuccess={() => {
                    if (deleteId) {
                        deleteTask(deleteId, { onSuccess: () => refetch() });
                    }
                    setDeleteId(null);
                }}
            />
        </Box>
    )
}

export default TaskList