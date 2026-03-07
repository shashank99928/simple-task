import { QueryClient } from "@tanstack/react-query";

export const applyOptimisticUpdate = async <T,>(
    queryClient: QueryClient,
    queryKey: unknown[],
    updater: (oldData: T | undefined) => T | undefined
) => {
    await queryClient.cancelQueries({ queryKey });
    const previousData = queryClient.getQueryData<T>(queryKey);

    if (previousData !== undefined) {
        queryClient.setQueryData<T>(queryKey, updater);
    }

    return previousData;
};

export const rollbackOptimisticUpdate = <T,>(
    queryClient: QueryClient,
    queryKey: unknown[],
    previousData: T | undefined
) => {
    if (previousData !== undefined) {
        queryClient.setQueryData<T>(queryKey, previousData);
    }
};
