import { useCallback, useRef, useState } from "react";
import type { Task } from "../types";

interface UseTaskKeyboardNavigationOptions {
    tasks: Task[];
    isPending: boolean;
    onToggle: (task: Task) => void;
    onDelete: (taskId: string) => void;
}

interface UseTaskKeyboardNavigationReturn {
    listRef: React.RefObject<HTMLUListElement | null>;
    focusedIndex: number;
    setFocusedIndex: React.Dispatch<React.SetStateAction<number>>;
    handleListKeyDown: (e: React.KeyboardEvent<HTMLUListElement>) => void;
}

const useTaskKeyboardNavigation = ({
    tasks,
    isPending,
    onToggle,
    onDelete,
}: UseTaskKeyboardNavigationOptions): UseTaskKeyboardNavigationReturn => {
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const listRef = useRef<HTMLUListElement>(null);

    const focusItem = useCallback((index: number) => {
        const items = listRef.current?.querySelectorAll<HTMLLIElement>("[data-task-item]");
        if (items && items[index]) {
            items[index].focus();
            setFocusedIndex(index);
        }
    }, []);

    const handleListKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLUListElement>) => {
            if (!tasks.length) return;

            const current = focusedIndex < 0 ? 0 : focusedIndex;

            switch (e.key) {
                case "ArrowDown": {
                    e.preventDefault();
                    focusItem(Math.min(current + 1, tasks.length - 1));
                    break;
                }
                case "ArrowUp": {
                    e.preventDefault();
                    focusItem(Math.max(current - 1, 0));
                    break;
                }
                case "Home": {
                    e.preventDefault();
                    focusItem(0);
                    break;
                }
                case "End": {
                    e.preventDefault();
                    focusItem(tasks.length - 1);
                    break;
                }
                case "Enter":
                case " ": {
                    e.preventDefault();
                    if (focusedIndex >= 0 && !isPending) {
                        onToggle(tasks[focusedIndex]);
                    }
                    break;
                }
                case "Delete":
                case "Backspace": {
                    e.preventDefault();
                    if (focusedIndex >= 0) {
                        onDelete(tasks[focusedIndex].id as string);
                    }
                    break;
                }
                default:
                    break;
            }
        },
        [focusedIndex, tasks, isPending, focusItem, onToggle, onDelete]
    );

    return { listRef, focusedIndex, setFocusedIndex, handleListKeyDown };
};

export default useTaskKeyboardNavigation;
