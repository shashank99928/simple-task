
import { useQuery } from "@tanstack/react-query"
import { taskApi } from "../api/taskApi"

export const useTask = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: () => taskApi.getTasks(),
    })

}