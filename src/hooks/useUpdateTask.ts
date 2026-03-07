import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskApi } from "../api/taskApi";
import type { UpdateTaskInput, Task } from "../types";
import { useNotification } from "./useNotification";
import { applyOptimisticUpdate, rollbackOptimisticUpdate } from "../utils";

const useUpdateTask = () => {
    const queryClient = useQueryClient();
    const notify = useNotification();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string, payload: UpdateTaskInput }) => taskApi.updateTask(id, payload),
        onMutate: async ({ id, payload }) => {
            const previousTasks = await applyOptimisticUpdate<Task[]>(
                queryClient,
                ['tasks'],
                old => old?.map(task => task.id === id ? { ...task, ...payload } : task)
            );

            const previousTaskDetails = await applyOptimisticUpdate<Task>(
                queryClient,
                ['task-details', id],
                old => old ? { ...old, ...payload } as Task : undefined
            );

            return { previousTasks, previousTaskDetails };
        },
        onError: (_err, { id }, context) => {
            rollbackOptimisticUpdate(queryClient, ['tasks'], context?.previousTasks);
            rollbackOptimisticUpdate(queryClient, ['task-details', id], context?.previousTaskDetails);
            notify.notifyError("Failed to update task");
        },
        onSettled: (_, __, variables) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['task-details', variables.id] });
        },
        onSuccess: () => {
            notify.notifySuccess("Updated Successfully");
        }
    });
}

export default useUpdateTask;
