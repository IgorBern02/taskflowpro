import { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";

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
      <Input placeholder="Nome do projeto" value={name} onChange={setName} />

      <Button
        className="bg-black text-white px-4 cursor-pointer rounded"
        disabled={isCreating}
        onClick={handleCreate}
      >
        Criar
      </Button>
    </div>
  );
}
