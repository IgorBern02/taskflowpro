export type TaskStatus = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  project_id: string;
  user_id: string;
  position: number;
  created_at: string;
}
