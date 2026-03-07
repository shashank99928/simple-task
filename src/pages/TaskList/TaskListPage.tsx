import Layout from "../../components/layout/layout"
import TaskForm from "../../components/tasks/TaskForm"
import LoadingSpinner from "../../components/common/LoadingSpinner"
import TaskList from "../../components/tasks/TaskList"

import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Divider from "@mui/material/Divider"

import { useState, useMemo } from "react"
import { useTask } from "../../hooks/useTask"
import type { Task, FilterType } from "../../types"


const TaskListPage = () => {
    const { data: taskList, isFetching, isError, refetch } = useTask();
    const [filter, setFilter] = useState<FilterType>("all");

    const filteredTasks = useMemo((): Task[] => {
        if (!taskList) return [];
        const tasks = [...taskList].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        if (filter === "completed") return tasks.filter(t => t.completed);
        if (filter === "incomplete") return tasks.filter(t => !t.completed);
        return tasks;
    }, [taskList, filter]);

    if (isError) {
        return (
            <Layout title="Task List">
                <Box textAlign="center" mt={4}>
                    <Box component="p" color="error.main" mb={2}>Error fetching tasks</Box>
                    <button onClick={() => refetch()}>Retry</button>
                </Box>
            </Layout>
        )
    }

    return (
        <Layout title="Task List">

            <Divider sx={{ my: 2 }} />

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
                    <TaskList tasks={filteredTasks} />
                </Box>
            )}
        </Layout>
    )
}

export default TaskListPage
