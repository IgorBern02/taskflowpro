import { useState } from "react";

type Props = {
  project: any;
  onClose: () => void;
  onSave: (name: string) => void;
};

export function EditProjectModal({ project, onClose, onSave }: Props) {
  const [name, setName] = useState(project.name);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-80">
        <h2 className="text-lg font-bold mb-4">Editar Projeto</h2>

        <input
          className="border p-2 w-full mb-6"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 border" onClick={onClose}>
            Cancelar
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white"
            onClick={handleSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
