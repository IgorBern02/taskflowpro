import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useQueryClient } from "@tanstack/react-query";

export function Dashboard() {
  const { projectsQuery, createProject, deleteProject, isCreating } =
    useProjects();

  const [name, setName] = useState("");

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

            <button
              className="text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                deleteProject(project.id);
              }}
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
      <Button onClick={handleSignOut}>Sair</Button>
    </div>
  );
}
