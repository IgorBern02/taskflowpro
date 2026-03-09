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
import { motion } from "framer-motion";

export const Dashboard = () => {
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

  if (projectsQuery.isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Carregando projetos...</p>
      </div>
    );

  if (projectsQuery.error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-red-500 font-medium">Erro ao carregar projetos</p>
      </div>
    );

  return (
    <section className="min-h-screen w-full bg-linear-to-br from-slate-50 to-slate-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Seus Projetos</h1>
            <p className="text-slate-500 text-sm">
              Gerencie e organize seu fluxo de trabalho
            </p>
          </div>

          <Button onClick={handleSignOut}>Sair</Button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-8">
          {/* Create */}
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Criar novo projeto
            </h2>
            <CreateProjectForm
              onCreate={createProject}
              isCreating={isCreating}
            />
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* List */}
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Seus quadros
            </h2>
            <ProjectList
              projects={projectsQuery.data ?? []}
              onOpen={(id) => navigate(`/projects/${id}`)}
              onEdit={(project) => setProjectToEdit(project)}
              onDelete={(project) => setProjectToDelete(project)}
            />
          </div>
        </div>
      </motion.div>

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
    </section>
  );
};
