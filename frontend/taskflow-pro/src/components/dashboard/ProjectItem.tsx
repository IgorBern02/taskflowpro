type Props = {
  project: any;
  onOpen: (id: string) => void;
  onEdit: (project: any) => void;
  onDelete: (project: any) => void;
};

export function ProjectItem({ project, onOpen, onEdit, onDelete }: Props) {
  return (
    <li
      className="border border-black text-black p-3 flex justify-between items-center"
      onClick={() => onOpen(project.id)}
    >
      <span className="cursor-pointer">{project.name}</span>

      <div className="flex gap-3">
        <button
          className="text-blue-500 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(project);
          }}
        >
          Editar
        </button>

        <button
          className="text-red-500 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project);
          }}
        >
          Deletar
        </button>
      </div>
    </li>
  );
}
