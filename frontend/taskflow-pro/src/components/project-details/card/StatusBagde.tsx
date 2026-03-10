import type { Task } from "../../../types/Task";

export const StatusBadge = ({ status }: { status: Task["status"] }) => {
  const map = {
    todo: "bg-slate-200 text-slate-700",
    doing: "bg-blue-100 text-blue-700",
    done: "bg-green-100 text-green-700",
  };

  const label = {
    todo: "A Fazer",
    doing: "Em Progresso",
    done: "Concluída",
  };

  return (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full ${map[status]}`}
    >
      {label[status]}
    </span>
  );
};
