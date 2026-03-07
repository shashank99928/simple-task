import { useQuery } from "@tanstack/react-query"
import { taskApi } from "../api/taskApi"

const useTaskDetails = (id: string) => {

    return useQuery({
        queryKey: ['task-details', id],
        queryFn: () => {
            if (!id) throw new Error('Task ID is required');
            return taskApi.getTaskById(id)
        },
        enabled: !!id
    })

}

export default useTaskDetails