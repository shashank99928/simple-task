import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskApi } from "../api/taskApi";
import { useNotification } from "../components/common/Notification";

const useDeleteTask = () => {
    const queryClient = useQueryClient();
    const notify = useNotification()

    return useMutation({
        mutationFn: (id: string) => taskApi.deleteTask(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            notify.notifySuccess("Deleted Successfully")
        }
    })
}

export default useDeleteTask;
