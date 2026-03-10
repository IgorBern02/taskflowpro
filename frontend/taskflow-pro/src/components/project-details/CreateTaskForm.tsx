import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { useParams } from "react-router-dom";
import { Input } from "../Input";
import { Button } from "../Button";

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
      <Input
        className="flex-1"
        value={title}
        onChange={setTitle}
        placeholder="Digite sua nova tarefa"
      />

      <Button
        className="bg-black text-white px-4 rounded"
        onClick={() => {
          if (!title.trim()) return;
          createTask(title);
          setTitle("");
        }}
      >
        {text}
      </Button>
    </div>
  );
};
