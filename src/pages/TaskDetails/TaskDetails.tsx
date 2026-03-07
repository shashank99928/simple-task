import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";

import useTaskDetails from "../../hooks/useTaskDetails";
import useDeleteTask from "../../hooks/useDeleteTask";

import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import TaskForm from "../../components/tasks/TaskForm";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Layout from "../../components/layout/layout";
import TaskDetail from "../../components/tasks/TaskDetail";

const TaskDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const { mutate: deleteTask } = useDeleteTask();
    const { data: taskDetails, isLoading, isError } = useTaskDetails(id!);

    const handleDelete = () => {
        if (id) {
            deleteTask(id, {
                onSuccess: () => navigate('/')
            });
        }
        setOpenDeleteDialog(false);
    }

    if (isLoading) return <LoadingSpinner />;

    if (isError || !taskDetails) {
        return (
            <Layout title="Task Details" showBackButton={true}>
                <Typography sx={{ mt: 4 }} color={isError ? "error" : "textPrimary"}>
                    {isError ? "Error loading task details" : "Task not found"}
                </Typography>
            </Layout>
        );
    }

    const { title, description, completed } = taskDetails;

    const actions = !openEditDialog && (
        <Box>
            <IconButton color="primary" onClick={() => setOpenEditDialog(true)}>
                <EditOutlinedIcon />
            </IconButton>
            <IconButton color="error" onClick={() => setOpenDeleteDialog(true)}>
                <DeleteOutlineOutlined />
            </IconButton>
        </Box>
    );

    return (
        <Layout title="Task Details" showBackButton={true} actions={actions}>
            {openEditDialog ? (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5">Edit Task</Typography>
                    <Divider sx={{ my: 2 }} />
                    <TaskForm
                        mode="EDIT_TASK"
                        taskId={id!}
                        initialData={{ title, description: description || '', completed }}
                        onSuccess={() => setOpenEditDialog(false)}
                    />
                </Box>
            ) : (
                <TaskDetail task={taskDetails} />
            )}

            <ConfirmationDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onSuccess={handleDelete}
            />
        </Layout>
    );
}

export default TaskDetails;