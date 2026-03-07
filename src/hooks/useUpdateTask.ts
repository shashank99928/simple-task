import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskApi } from "../api/taskApi";
import type { UpdateTaskInput } from "../types";
import { useNotification } from "../components/common/Notification";

const useUpdateTask = () => {
    const queryClient = useQueryClient();
    const notify = useNotification();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string, payload: UpdateTaskInput }) => taskApi.updateTask(id, payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['task-details', variables.id] });
            notify.notifySuccess("Updated Successfully");
        },
        onError: () => {
            notify.notifyError("Failed to update task");
        }
    });
}

export default useUpdateTask;
