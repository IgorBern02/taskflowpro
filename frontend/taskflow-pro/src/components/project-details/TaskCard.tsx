import { useState } from "react";
import { EditTaskModal } from "./EditTaskModal";
import { FaArrowLeft, FaArrowRight, FaCheck, FaPen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";

// Tipagem melhor (evita any)
type Task = {
  id: string;
  title: string;
  status: "todo" | "doing" | "done";
};

type TaskCardProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onMoveForward?: (id: string) => void;
  onMoveBackward?: (id: string) => void;
  onComplete?: (id: string) => void;
  onEdit?: (id: string, title: string) => void;
};

export const TaskCard = ({
  tasks,
  onDelete,
  onMoveForward,
  onMoveBackward,
  onComplete,
  onEdit,
}: TaskCardProps) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <>
      <div className="space-y-4">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition
              hover:shadow-lg hover:-translate-y-0.5
              ${task.status === "done" ? "opacity-60" : ""}`}
          >
            {/* Top */}
            <div className="flex gap-3 p-4">
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm leading-relaxed wrap-break-word
                  ${task.status === "done" ? "line-through text-slate-400" : "text-slate-700"}`}
                >
                  {task.title}
                </p>
              </div>

              <div className="flex items-start gap-2 opacity-0 group-hover:opacity-100 transition">
                <IconButton onClick={() => setEditingTask(task)}>
                  <FaPen />
                </IconButton>

                <IconButton onClick={() => onDelete(task.id)} danger>
                  <MdDelete />
                </IconButton>
              </div>
            </div>

            {/* Bottom actions */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-t border-slate-100">
              <StatusBadge status={task.status} />

              <div className="flex items-center gap-2">
                {onMoveBackward && (
                  <IconButton onClick={() => onMoveBackward(task.id)}>
                    <FaArrowLeft className="text-xs" />
                  </IconButton>
                )}

                {onMoveForward && (
                  <IconButton onClick={() => onMoveForward(task.id)}>
                    <FaArrowRight className="text-xs" />
                  </IconButton>
                )}

                {onComplete && task.status !== "done" && (
                  <button
                    onClick={() => onComplete(task.id)}
                    className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg
                    bg-green-100 text-green-700 hover:bg-green-200 transition"
                  >
                    <FaCheck className="text-xs" />
                    Concluir
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(id, title) => {
            onEdit?.(id, title);
            setEditingTask(null);
          }}
        />
      )}
    </>
  );
};

/* ---------- Subcomponents ---------- */

function IconButton({
  children,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition
        ${
          danger
            ? "bg-red-50 text-red-500 hover:bg-red-100"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }: { status: Task["status"] }) {
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
}
