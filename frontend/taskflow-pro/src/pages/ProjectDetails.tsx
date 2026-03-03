import { useParams } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { useState } from "react";
import { Column } from "../components/Column";

export function ProjectDetails() {
  const { id } = useParams();
  if (!id) {
    return <div>Projeto inválido</div>;
  }

  const projectId = id;

  const { tasksQuery, createTask, updateTask, deleteTask } =
    useTasks(projectId);

  const [title, setTitle] = useState("");

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

  console.log("PARAM ID:", id);
  ~console.log("PROJECT ID:", projectId);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Projeto {id}</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 flex-1"
          placeholder="Nova tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-black text-white px-4"
          onClick={() => {
            if (!title.trim()) return;
            createTask(title);
            setTitle("");
          }}
        >
          Criar
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 text-black">
        <Column
          title="TODO"
          tasks={todo}
          onDelete={deleteTask}
          onMove={(id) => updateTask({ id, updates: { status: "doing" } })}
        />

        <Column
          title="DOING"
          tasks={doing}
          onDelete={deleteTask}
          onMove={(id) => updateTask({ id, updates: { status: "done" } })}
        />

        <Column title="DONE" tasks={done} onDelete={deleteTask} />
      </div>
    </div>
  );
}
