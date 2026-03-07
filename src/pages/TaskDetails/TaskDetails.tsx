import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { Link, useParams } from "react-router-dom"
import useTaskDetails from "../../hooks/useTaskDetails";
import { formatDate } from "../../utils/formatDate";
import { Box, IconButton } from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import useDeleteTask from "../../hooks/useDeleteTask";

const TaskDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const { mutate: deleteTask } = useDeleteTask();

    const { data: taskDetails, isLoading, isError } = useTaskDetails(id!);

    const { title, description, completed, createdAt } = taskDetails || {};

    if (isLoading) {
        return <Container>Loading...</Container>
    }

    console.log(isError)


    return (
        <Container>
            <Link to="/"> <IconButton size="small"><ArrowBackIos /> </IconButton > Back to Task List</Link>
            {
                isError ? <Typography>
                    Error loading task details
                </Typography> : <Container>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h5"  >Task Details</Typography>
                        <Box>
                            <IconButton color="primary"><EditOutlinedIcon /></IconButton>
                            <IconButton color="error" onClick={() => setOpenDeleteDialog(true)}>
                                <DeleteOutlineOutlined />
                            </IconButton>
                        </Box>
                    </Box>

                    <Typography variant="h6">Task Name: {title}</Typography>
                    <Typography variant="h6">Task Description: {description}</Typography>
                    <Typography variant="h6">Task Status: {completed ? 'Completed' : 'Not Completed'}</Typography>
                    <Typography variant="h6">Task Created At: {formatDate(createdAt)}</Typography></Container>
            }
            <ConfirmationDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onSucces={() => {
                    if (id) {
                        deleteTask(id, {
                            onSuccess: () => {
                                navigate('/');
                            }
                        });
                    }
                    setOpenDeleteDialog(false);
                }}
            />
        </Container >
    )
}


export default TaskDetails