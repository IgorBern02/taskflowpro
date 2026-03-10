import { useState } from "react";
import { Input } from "../../Input";
import { Button } from "../../Button";

type Props = {
  task: any;
  onClose: () => void;
  onSave: (id: string, title: string) => void;
};

export function EditTaskModal({ task, onClose, onSave }: Props) {
  const [title, setTitle] = useState(task.title);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96 space-y-4">
        <h2 className="text-lg font-semibold">Editar tarefa</h2>

        <Input
          className="w-full"
          value={title}
          onChange={setTitle}
          placeholder="Título da tarefa"
        />

        <div className="flex justify-end gap-2">
          <Button className="px-4 py-2 border rounded" onClick={onClose}>
            Cancelar
          </Button>

          <Button
            className="px-4 py-2 bg-black text-white rounded"
            onClick={() => onSave(task.id, title)}
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
