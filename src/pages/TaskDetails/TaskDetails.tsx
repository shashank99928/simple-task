import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { Link, useParams } from "react-router-dom"
import useTaskDetails from "../../hooks/useTaskDetails";
import { formatDate } from "../../utils/formatDate";
import { Box, Divider, IconButton } from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import useDeleteTask from "../../hooks/useDeleteTask";
import TaskForm from "../../components/tasks/TaskForm";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const TaskDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const { mutate: deleteTask } = useDeleteTask();

    const { data: taskDetails, isLoading, isError } = useTaskDetails(id!);

    const { title, description, completed, createdAt } = taskDetails || {};


    const handleDelete = () => {
        if (id) {
            deleteTask(id, {
                onSuccess: () => {
                    navigate('/');
                }
            });
        }
        setOpenDeleteDialog(false);
    }

    if (isLoading) {
        return <LoadingSpinner />
    }


    return (
        <Container >
            <Link to="/"> <IconButton size="small"><ArrowBackIos /> </IconButton > Back to Task List</Link>
            {isError ? (
                <Typography>Error loading task details</Typography>
            ) : openEditDialog ? (
                <Container disableGutters sx={{ mt: 4 }}>
                    <Typography variant="h5" >Edit Task</Typography>
                    <Divider sx={{ my: 2 }} />
                    <TaskForm
                        mode="EDIT_TASK"
                        taskId={id}
                        initialData={{ title: title || '', description: description || '', completed: completed || false }}
                        onSuccess={() => setOpenEditDialog(false)}
                    />

                </Container>
            ) : (
                <Container disableGutters>
                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                        <Typography variant="h5">Task Details</Typography>
                        <Box>
                            <IconButton color="primary" onClick={() => setOpenEditDialog(true)}>
                                <EditOutlinedIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => setOpenDeleteDialog(true)}>
                                <DeleteOutlineOutlined />
                            </IconButton>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />
                    <Box role="list" aria-label="Item Details">
                        <Box role="listitem" aria-label={`Name: ${title}`}>
                            <Typography variant="overline" color="text.secondary" aria-hidden="true">
                                Name
                            </Typography>
                            <Typography variant="body1">{title}</Typography>
                        </Box>

                        <Box role="listitem" aria-label={`Description: ${description}`}>
                            <Typography variant="overline" color="text.secondary" aria-hidden="true">
                                Description
                            </Typography>
                            <Typography variant="body1">{description}</Typography>
                        </Box>

                        <Box role="listitem" aria-label={`Status: ${completed ? 'Completed' : 'Not Completed'}`}>
                            <Typography variant="overline" color="text.secondary" aria-hidden="true">
                                Status
                            </Typography>
                            <Typography variant="body1">
                                {completed ? 'Completed' : 'Not Completed'}
                            </Typography>
                        </Box>

                        <Box role="listitem" aria-label={`Created At: ${formatDate(createdAt)}`}>
                            <Typography variant="overline" color="text.secondary" aria-hidden="true">
                                Created At
                            </Typography>
                            <Typography variant="body1">{formatDate(createdAt)}</Typography>
                        </Box>
                    </Box>
                </Container>
            )}
            <ConfirmationDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onSuccess={handleDelete}
            />
        </Container >
    )
}


export default TaskDetails