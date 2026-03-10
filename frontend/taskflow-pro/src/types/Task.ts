export interface Task {
  id: string;
  title: string;
  status: "todo" | "doing" | "done";
  projectId: string;
}

export type TaskCardProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onMoveForward?: (id: string) => void;
  onMoveBackward?: (id: string) => void;
  onComplete?: (id: string) => void;
  onEdit?: (id: string, title: string) => void;
};
