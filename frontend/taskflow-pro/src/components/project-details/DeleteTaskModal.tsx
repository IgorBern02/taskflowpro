interface DeleteTaskModalProps {
  taskId: string;
  onClose: () => void;
  onDelete: (id: string) => void;
}
export const DeleteTaskModal = ({
  taskId,
  onClose,
  onDelete,
}: DeleteTaskModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96 space-y-4">
        <h2 className="text-lg font-semibold">Excluir tarefa</h2>
        <p>Tem certeza que deseja excluir esta tarefa?</p>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 border rounded" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => onDelete(taskId)}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};
