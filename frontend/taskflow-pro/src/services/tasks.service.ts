import type { Task } from "../types/Task";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

const API_URL = "http://localhost:3001/projects";

export async function getTasks(projectId: string) {
  const response = await fetch(`${API_URL}/${projectId}/tasks`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar tasks");
  }

  return response.json();
}

export async function createTask(projectId: string, data: any) {
  const response = await fetch(`${API_URL}/${projectId}/tasks`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar task");
  }

  return response.json();
}

export async function updateTask(
  project_id: string,
  taskId: string,
  updatedTask: Partial<Task>,
): Promise<Task> {
  const response = await fetch(`${API_URL}/${project_id}/tasks/${taskId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedTask),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar tarefa");
  }

  return response.json();
}

export async function deleteTask(
  project_id: string,
  taskId: string,
): Promise<void> {
  const response = await fetch(`${API_URL}/${project_id}/tasks/${taskId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar tarefa");
  }
}
