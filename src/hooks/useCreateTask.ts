import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskApi } from "../api/taskApi";
import type { CreateTaskPayload } from "../types";
import { useNotification } from "./useNotification";


const useCreateTask = () => {
    const queryClient = useQueryClient();
    const notfiy = useNotification()



    return useMutation({
        mutationFn: (payload: CreateTaskPayload) => taskApi.createTask(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            notfiy.notifySuccess("Created Succesfully")
        }
    })

}

export default useCreateTask;