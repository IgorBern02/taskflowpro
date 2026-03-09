import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { useParams } from "react-router-dom";

interface CreateTaskFormProps {
  text: string;
}
export const CreateTaskForm = ({ text }: CreateTaskFormProps) => {
  const { id } = useParams();

  const projectId = id!;

  const [title, setTitle] = useState("");
  const { createTask } = useTasks(projectId);

  return (
    <div className="flex gap-2 mb-6">
      <input
        className="border border-black p-2 flex-1"
        placeholder="Digite sua nova tarefa"
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
        {text}
      </button>
    </div>
  );
};
