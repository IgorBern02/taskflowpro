import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import { Button } from "../components/Button";
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

  const [name, setName] = useState("");
  const [projectToDelete, setProjectToDelete] = useState<any | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<any | null>(null);
  const [editName, setEditName] = useState("");

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSignOut = () => {
    try {
      logout();
      queryClient.clear();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (projectsQuery.isLoading) {
    return <div className="p-10">Carregando...</div>;
  }

  if (projectsQuery.error) {
    return <div className="p-10 text-red-500">Erro ao carregar projetos</div>;
  }

  return (
    <div className="p-10 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Seus Projetos</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 flex-1"
          placeholder="Nome do projeto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-black text-white px-4"
          disabled={isCreating}
          onClick={() => {
            if (!name.trim()) return;
            createProject(name);
            setName("");
          }}
        >
          Criar
        </button>
      </div>

      <ul className="space-y-3">
        {projectsQuery.data?.map((project: any) => (
          <li
            key={project.id}
            className="border p-3 flex justify-between items-center"
          >
            <span
              className="cursor-pointer"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              {project.name}
            </span>

            <div className="flex gap-3">
              <button
                className="text-blue-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setProjectToEdit(project);
                  setEditName(project.name);
                }}
              >
                Editar
              </button>

              <button
                className="text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setProjectToDelete(project);
                }}
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Button onClick={handleSignOut}>Sair</Button>

      {projectToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80">
            <h2 className="text-lg font-bold mb-4">Excluir Projeto</h2>
            <p className="mb-6">
              Tem certeza que deseja excluir <b>{projectToDelete.name}</b>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border"
                onClick={() => setProjectToDelete(null)}
              >
                Cancelar
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white"
                onClick={() => {
                  deleteProject(projectToDelete.id);
                  setProjectToDelete(null);
                }}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {projectToEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80">
            <h2 className="text-lg font-bold mb-4">Editar Projeto</h2>

            <input
              className="border p-2 w-full mb-6"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border"
                onClick={() => setProjectToEdit(null)}
              >
                Cancelar
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white"
                onClick={() => {
                  if (!editName.trim()) return;

                  updateProject({
                    id: projectToEdit.id,
                    name: editName,
                  });

                  setProjectToEdit(null);
                }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
