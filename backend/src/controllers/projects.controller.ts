import { Request, Response } from "express";
import { supabaseAdmin } from "../services/supabaseAdmin";
import { CreateProjectDTO, UpdateProjectDTO } from "../types/project.types";

// LISTAR
export async function getProjects(req: Request, res: Response) {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("user_id", req.user.id)
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json(error);

  res.json(data);
}

// BUSCAR POR ID
export async function getProjectById(req: Request, res: Response) {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("user_id", req.user.id)
    .single();

  if (error) return res.status(404).json({ error: "Projeto não encontrado" });

  console.log("BUSCANDO PROJETOS PARA USER:", req.user.id);
  res.json(data);
}

// CRIAR
export async function createProject(req: Request, res: Response) {
  const { name }: CreateProjectDTO = req.body;

  if (!name || name.trim().length < 3) {
    return res.status(400).json({ error: "Nome inválido" });
  }

  const { data, error } = await supabaseAdmin
    .from("projects")
    .insert({
      name,
      user_id: req.user.id,
    })
    .select()
    .single();

  if (error) {
    return res.status(400).json(error);
  }
  console.log("CRIANDO PROJETO PARA USER:", req.user.id);

  res.status(201).json(data);
}

// ATUALIZAR
export async function updateProject(req: Request, res: Response) {
  const { id } = req.params;
  const { name }: UpdateProjectDTO = req.body;

  if (!name || name.trim().length < 3) {
    return res.status(400).json({ error: "Nome inválido" });
  }

  const { data, error } = await supabaseAdmin
    .from("projects")
    .update({ name })
    .eq("id", id)
    .eq("user_id", req.user.id)
    .select()
    .single();

  if (error) return res.status(400).json(error);

  res.json(data);
}

// DELETAR
export async function deleteProject(req: Request, res: Response) {
  const { id } = req.params;

  const { error } = await supabaseAdmin
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json(error);

  res.json({ message: "Projeto deletado com sucesso" });
}
