import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import TaskForm from "../../components/tasks/TaskForm"
import LoadingSpinner from "../../components/common/LoadingSpinner"
import TaskList from "../../components/tasks/TaskList"
import Button from "@mui/material/Button"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import { useState } from "react"
import { useTask } from "../../hooks/useTask"
import type { Task, FilterType } from "../../types"

const TaskListPage = () => {
    const { data: taskList, isFetching, isError, refetch } = useTask();
    const [filter, setFilter] = useState<FilterType>("all");

    const filteredTasks = (): Task[] => {
        if (!taskList) return [];
        let tasks = [...taskList].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        if (filter === "completed") return tasks.filter(t => t.completed);
        if (filter === "incomplete") return tasks.filter(t => !t.completed);
        return tasks;
    }

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

            {/* Filter Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2, px: 2 }}>
                <Tabs
                    value={filter}
                    onChange={(_e, val: FilterType) => setFilter(val)}
                    aria-label="task filter tabs"
                >
                    <Tab label="All" value="all" id="filter-tab-all" aria-controls="task-list-panel" />
                    <Tab label="Incomplete" value="incomplete" id="filter-tab-incomplete" aria-controls="task-list-panel" />
                    <Tab label="Completed" value="completed" id="filter-tab-completed" aria-controls="task-list-panel" />
                </Tabs>
            </Box>

            {isFetching && <LoadingSpinner />}
            {!isFetching && (
                <Box role="tabpanel" id="task-list-panel">
                    {/* Display Table */}
                    <TaskList tasks={filteredTasks()} />
                </Box>
            )}
        </Container>
    )
}


export default TaskListPage
