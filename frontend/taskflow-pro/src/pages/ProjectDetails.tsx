import { useParams } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { Column } from "../components/project-details/Column";
import { useProjects, type Project } from "../hooks/useProjects";
import { CreateTaskForm } from "../components/project-details/CreateTaskForm";

export function ProjectDetails() {
  const { id } = useParams();
  if (!id) {
    return <div>Projeto inválido</div>;
  }

  const projectId = id!;
  const { tasksQuery, updateTask, deleteTask } = useTasks(projectId);
  const { projectsQuery } = useProjects();
  const project = projectsQuery.data?.find((p: Project) => p.id === projectId);

  if (tasksQuery.isLoading) {
    return <div className="p-10">Carregando tasks...</div>;
  }

  if (tasksQuery.error) {
    return <div className="p-10 text-red-500">Erro ao carregar tasks</div>;
  }

  const tasks = tasksQuery.data ?? [];

  const todo = tasks.filter((t) => t.status === "todo");
  const doing = tasks.filter((t) => t.status === "doing");
  const done = tasks.filter((t) => t.status === "done");

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        Projeto {project?.name ?? "Carregando..."}
      </h1>

      <CreateTaskForm text="criar" />

      <div className="grid grid-cols-3 gap-6 text-black">
        <Column
          title="TODO"
          tasks={todo}
          onDelete={deleteTask}
          onEdit={(id, title) => updateTask({ id, updates: { title } })}
          onMoveForward={(id) =>
            updateTask({ id, updates: { status: "doing" } })
          }
        />

        <Column
          title="DOING"
          tasks={doing}
          onDelete={deleteTask}
          onEdit={(id, title) => updateTask({ id, updates: { title } })}
          onMoveBackward={(id) =>
            updateTask({ id, updates: { status: "todo" } })
          }
          onMoveForward={(id) =>
            updateTask({ id, updates: { status: "done" } })
          }
        />

        <Column
          title="DONE"
          tasks={done}
          onDelete={deleteTask}
          onEdit={(id, title) => updateTask({ id, updates: { title } })}
          onMoveBackward={(id) =>
            updateTask({ id, updates: { status: "doing" } })
          }
        />
      </div>
    </div>
  );
}
