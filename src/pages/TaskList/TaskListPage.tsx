import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import TaskForm from "../../components/tasks/TaskForm"
import type { Task } from "../../types"
import { taskApi } from "../../api/taskApi"
import { useTask } from "../../hooks/useTask"
import LoadingSpinner from "../../components/common/LoadingSpinner"
import TaskList from "../../components/tasks/TaskList"
import useCreateTask from "../../hooks/useCreateTask"




const TaskListPage = () => {
    const { data: taskList, isFetching, error, refetch } = useTask();
    const { mutate: createTask, isPending } = useCreateTask()


    const handleSubmit = (formData: Task) => {
        createTask(formData, {
            onSuccess: () => {
                refetch()
            }
        })
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
