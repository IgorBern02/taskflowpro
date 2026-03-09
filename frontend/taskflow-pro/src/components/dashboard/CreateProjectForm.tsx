import { useState } from "react";

type Props = {
  onCreate: (name: string) => void;
  isCreating: boolean;
};

export function CreateProjectForm({ onCreate, isCreating }: Props) {
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name);
    setName("");
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        className="border border-black text-black p-2 flex-1"
        placeholder="Nome do projeto"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-black text-white px-4 cursor-pointer"
        disabled={isCreating}
        onClick={handleCreate}
      >
        Criar
      </button>
    </div>
  );
}
