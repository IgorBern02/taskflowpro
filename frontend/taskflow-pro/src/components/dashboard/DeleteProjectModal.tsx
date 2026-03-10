import { Button } from "../Button";

type Props = {
  project: any;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteProjectModal({ project, onClose, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-80">
        <h2 className="text-lg font-bold mb-4">Excluir Projeto</h2>
        <p className="mb-6">
          Tem certeza que deseja excluir <b>{project.name}</b>?
        </p>

        <div className="flex justify-end gap-3">
          <Button className="px-4 py-2 border rounded" onClick={onClose}>
            Cancelar
          </Button>

          <Button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={onConfirm}
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}
