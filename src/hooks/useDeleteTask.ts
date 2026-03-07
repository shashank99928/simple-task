import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskApi } from "../api/taskApi";
import { useNotification } from "./useNotification";

const useDeleteTask = () => {
    const queryClient = useQueryClient();
    const notify = useNotification()

    return useMutation({
        mutationFn: (id: string) => taskApi.deleteTask(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['tasks'] });
            notify.notifySuccess("Deleted Successfully")
        }
    })
}

export default useDeleteTask;
