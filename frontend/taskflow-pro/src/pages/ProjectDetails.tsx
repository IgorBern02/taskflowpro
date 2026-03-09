import { useParams } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { Column } from "../components/project-details/Column";
import { useProjects, type Project } from "../hooks/useProjects";
import { CreateTaskForm } from "../components/project-details/CreateTaskForm";
import { motion } from "framer-motion";

export const ProjectDetails = () => {
  const { id } = useParams();
  if (!id) return <div>Projeto inválido</div>;

  const projectId = id;
  const { tasksQuery, updateTask, deleteTask } = useTasks(projectId);
  const { projectsQuery } = useProjects();
  const project = projectsQuery.data?.find((p: Project) => p.id === projectId);

  if (tasksQuery.isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Carregando tarefas...</p>
      </div>
    );

  if (tasksQuery.error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-red-500 font-medium">Erro ao carregar tarefas</p>
      </div>
    );

  const tasks = tasksQuery.data ?? [];

  const todo = tasks.filter((t) => t.status === "todo");
  const doing = tasks.filter((t) => t.status === "doing");
  const done = tasks.filter((t) => t.status === "done");

  return (
    <section className="min-h-screen w-full bg-linear-to-br from-slate-50 to-slate-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">
            Projeto {project?.name ?? "..."}
          </h1>
          <p className="text-slate-500 text-sm">
            Gerencie as tarefas do seu quadro
          </p>
        </div>

        {/* Create Task */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Nova tarefa
          </h2>
          <CreateTaskForm text="Criar tarefa" />
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Column
            title="A Fazer"
            tasks={todo}
            onDelete={deleteTask}
            onEdit={(id, title) => updateTask({ id, updates: { title } })}
            onMoveForward={(id) =>
              updateTask({ id, updates: { status: "doing" } })
            }
          />

          <Column
            title="Em Progresso"
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
            title="Concluído"
            tasks={done}
            onDelete={deleteTask}
            onEdit={(id, title) => updateTask({ id, updates: { title } })}
            onMoveBackward={(id) =>
              updateTask({ id, updates: { status: "doing" } })
            }
          />
        </div>
      </motion.div>
    </section>
  );
};
