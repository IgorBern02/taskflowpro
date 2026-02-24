import { useAuthStore } from "../store/auth.store";

const API_URL = "http://localhost:3001";

function getHeaders() {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar projetos");
  }

  return response.json();
}

export async function createProject(name: string) {
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar projeto");
  }

  return response.json();
}

export async function deleteProject(id: string) {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar projeto");
  }
}
