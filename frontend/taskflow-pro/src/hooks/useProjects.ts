import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProjects,
  createProject,
  deleteProject,
} from "../services/projects.service";
import { useAuthStore } from "../store/auth.store";

export function useProjects() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const projectsQuery = useQuery({
    queryKey: ["projects", user?.id],
    queryFn: getProjects,
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: (name: string) => {
      return createProject(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"], exact: false });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"], exact: false });
    },
  });

  return {
    projectsQuery,
    createProject: createMutation.mutate,
    deleteProject: deleteMutation.mutate,
    isCreating: createMutation.isPending,
  };
}
