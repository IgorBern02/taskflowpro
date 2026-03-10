import { useState } from "react";
import { EditTaskModal } from "./EditTaskModal";
import { FaArrowLeft, FaArrowRight, FaPen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";

import { DeleteTaskModal } from "./DeleteTaskModal";
import { IconButton } from "./IconButton";
import { StatusBadge } from "./StatusBagde";

// Tipagem melhor (evita any)
import type { Task, TaskCardProps } from "../../../types/Task";

export const TaskCard = ({
  tasks,
  onDelete,
  onMoveForward,
  onMoveBackward,
  onEdit,
}: TaskCardProps) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

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

                <IconButton onClick={() => setDeleteTaskId(task.id)} danger>
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

      {deleteTaskId && (
        <DeleteTaskModal
          taskId={deleteTaskId}
          onClose={() => setDeleteTaskId(null)}
          onDelete={(id) => {
            onDelete(id);
            setDeleteTaskId(null);
          }}
        />
      )}
    </>
  );
};
