import { useState } from "react";
import { EditTaskModal } from "./EditTaskModal";

type ColumnProps = {
  title: string;
  tasks: any[];
  onDelete: (id: string) => void;
  onMoveForward?: (id: string) => void;
  onMoveBackward?: (id: string) => void;
  onComplete?: (id: string) => void;
  onEdit?: (id: string, title: string) => void;
};

export function Column({
  title,
  tasks,
  onDelete,
  onMoveForward,
  onMoveBackward,
  onComplete,
  onEdit,
}: ColumnProps) {
  const [editingTask, setEditingTask] = useState<any | null>(null);

  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="font-semibold mb-4">{title}</h2>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white p-3 rounded shadow flex justify-between items-center transition
${task.status === "done" ? "opacity-60" : "hover:shadow-md"}`}
          >
            <span
              className={
                task.status === "done" ? "line-through opacity-60" : ""
              }
            >
              {task.title}
            </span>

            <div className="flex gap-2 items-center">
              <button
                className="text-yellow-600 hover:text-yellow-800"
                onClick={() => setEditingTask(task)}
              >
                ✎
              </button>

              {onMoveBackward && (
                <button
                  className="text-gray-500 hover:text-black"
                  onClick={() => onMoveBackward(task.id)}
                >
                  ←
                </button>
              )}

              {onMoveForward && (
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => onMoveForward(task.id)}
                >
                  →
                </button>
              )}

              {onComplete && task.status !== "done" && (
                <button
                  className="text-green-600 hover:text-green-800"
                  onClick={() => onComplete(task.id)}
                >
                  ✓
                </button>
              )}

              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => onDelete(task.id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
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
      </div>
    </div>
  );
}
