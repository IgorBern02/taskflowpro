type ColumnProps = {
  title: string;
  tasks: any[];
  onDelete: (id: string) => void;
  onMove?: (id: string) => void;
};

export function Column({ title, tasks, onDelete, onMove }: ColumnProps) {
  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="font-semibold mb-4">{title}</h2>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-3 rounded shadow flex justify-between items-center"
          >
            <span>{task.title}</span>

            <div className="flex gap-2">
              {onMove && (
                <button
                  className="text-blue-500"
                  onClick={() => onMove(task.id)}
                >
                  →
                </button>
              )}

              <button
                className="text-red-500"
                onClick={() => onDelete(task.id)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
