import { useState } from "react";
import { Button } from "../components/Button";
import { CreateProjectForm } from "../components/dashboard/CreateProjectForm";
import { DeleteProjectModal } from "../components/dashboard/DeleteProjectModal";
import { EditProjectModal } from "../components/dashboard/EditProjectModal";
import { ProjectList } from "../components/dashboard/ProjectList";
import { useProjects } from "../hooks/useProjects";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useQueryClient } from "@tanstack/react-query";

export function Dashboard() {
  const {
    projectsQuery,
    createProject,
    updateProject,
    deleteProject,
    isCreating,
  } = useProjects();

  const [projectToDelete, setProjectToDelete] = useState<any | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<any | null>(null);

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSignOut = () => {
    logout();
    queryClient.clear();
    navigate("/");
  };

  if (projectsQuery.isLoading) return <div className="p-10">Carregando...</div>;
  if (projectsQuery.error) return <div className="p-10 text-red-500">Erro</div>;

  return (
    <div className="p-10 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Seus Projetos</h1>

      <CreateProjectForm onCreate={createProject} isCreating={isCreating} />

      <ProjectList
        projects={projectsQuery.data ?? []}
        onOpen={(id) => navigate(`/projects/${id}`)}
        onEdit={(project) => setProjectToEdit(project)}
        onDelete={(project) => setProjectToDelete(project)}
      />

      <Button onClick={handleSignOut}>Sair</Button>

      {projectToDelete && (
        <DeleteProjectModal
          project={projectToDelete}
          onClose={() => setProjectToDelete(null)}
          onConfirm={() => {
            deleteProject(projectToDelete.id);
            setProjectToDelete(null);
          }}
        />
      )}

      {projectToEdit && (
        <EditProjectModal
          project={projectToEdit}
          onClose={() => setProjectToEdit(null)}
          onSave={(name) => {
            updateProject({ id: projectToEdit.id, name });
            setProjectToEdit(null);
          }}
        />
      )}
    </div>
  );
}
