import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskApi } from "../api/taskApi";
import { useNotification } from "./useNotification";
import { applyOptimisticUpdate, rollbackOptimisticUpdate } from "../utils";
import type { Task } from "../types";

const useDeleteTask = () => {
    const queryClient = useQueryClient();
    const notify = useNotification()

    return useMutation({
        mutationFn: (id: string) => taskApi.deleteTask(id),
        onMutate: async (id) => {
            const previousTasks = await applyOptimisticUpdate<Task[]>(
                queryClient,
                ['tasks'],
                old => old?.filter(task => task.id !== id)
            );

            return { previousTasks };
        },
        onError: (_err, _id, context) => {
            rollbackOptimisticUpdate(queryClient, ['tasks'], context?.previousTasks);
            notify.notifyError("Failed to delete task");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
        onSuccess: (_, id) => {
            queryClient.removeQueries({ queryKey: ['task-details', id] });
            notify.notifySuccess("Deleted Successfully");
        }
    })
}

export default useDeleteTask;
