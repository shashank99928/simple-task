import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import TaskForm from "../../components/tasks/TaskForm"
import LoadingSpinner from "../../components/common/LoadingSpinner"
import TaskList from "../../components/tasks/TaskList"
import Button from "@mui/material/Button"
import { useTask } from "../../hooks/useTask"


const TaskListPage = () => {
    const { data: taskList, isFetching, isError, refetch } = useTask();


    if (isError) {
        return <>
            <Typography variant="h4">Error fetching tasks</Typography>
            <Button variant="contained" color="primary" onClick={() => refetch()}>Retry</Button>
        </>
    }

    return (
        <Container>
            <Typography variant="h4">Task List</Typography>
            <TaskForm mode="ADD_NEW_TASK" />
            {(isFetching) && < LoadingSpinner />}
            {(taskList && !isFetching) && <TaskList tasks={taskList} />}
        </Container>
    )
}


export default TaskListPage
