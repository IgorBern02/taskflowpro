import { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";

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

        <Input value={name} onChange={setName} placeholder="Nome do projeto" />

        <div className="flex justify-end gap-3 rounded mt-8">
          <Button className="px-4 py-2 border rounded" onClick={onClose}>
            Cancelar
          </Button>

          <Button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSave}
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
