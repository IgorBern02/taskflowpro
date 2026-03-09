import { useState } from "react";

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

        <input
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 border rounded" onClick={onClose}>
            Cancelar
          </button>

          <button
            className="px-4 py-2 bg-black text-white rounded"
            onClick={() => onSave(task.id, title)}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
