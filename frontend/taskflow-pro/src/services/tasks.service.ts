import type { Task } from "../types/Task";

const API_URL = "http://localhost:3001/tasks";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getTasks(projectId: string) {
  const response = await fetch(
    `http://localhost:3001/projects/${projectId}/tasks`,
    {
      headers: getAuthHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar tasks");
  }

  return response.json();
}

export async function createTask(projectId: string, data: any) {
  const response = await fetch(
    `http://localhost:3001/projects/${projectId}/tasks`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error("Erro ao criar task");
  }

  return response.json();
}

export async function updateTask(
  id: string,
  updatedTask: Partial<Task>,
): Promise<Task> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedTask),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar tarefa");
  }

  return response.json();
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar tarefa");
  }
}
