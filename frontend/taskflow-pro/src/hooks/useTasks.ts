import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/tasks.service";
import type { Task } from "../types/Task";

export function useTasks(projectId: string) {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery<Task[]>({
    queryKey: ["tasks", projectId],
    queryFn: () => getTasks(projectId),
    enabled: !!projectId,
  });

  const createMutation = useMutation({
    mutationFn: (title: string) =>
      createTask(projectId, {
        title,
        status: "todo",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", projectId],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Task> }) =>
      updateTask(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", projectId],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", projectId],
      });
    },
  });

  return {
    tasksQuery,
    createTask: createMutation.mutate,
    updateTask: updateMutation.mutate,
    deleteTask: deleteMutation.mutate,
    isCreating: createMutation.isPending,
  };
}
