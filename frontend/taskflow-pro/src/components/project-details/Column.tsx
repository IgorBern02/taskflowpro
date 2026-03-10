import { TaskCard } from "./card/TaskCard";

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
  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="font-semibold mb-4">{title}</h2>

      <div className="space-y-3">
        <TaskCard
          tasks={tasks}
          onDelete={onDelete}
          onMoveForward={onMoveForward}
          onMoveBackward={onMoveBackward}
          onComplete={onComplete}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
}
