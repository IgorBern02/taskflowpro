import { Router } from "express";
import { supabaseAdmin } from "../services/supabaseAdmin";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

// LISTAR
router.get("/projects/:id/tasks", async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  // Primeiro verifica se o projeto pertence ao usuário
  const { data: project } = await supabaseAdmin
    .from("projects")
    .select("id")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (!project) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { data, error } = await supabaseAdmin
    .from("tasks")
    .select("*")
    .eq("project_id", id)
    .order("created_at", { ascending: true });

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

// CRIAR
router.post("/projects/:id/tasks", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const userId = req.user.id;

  // validar projeto pertence ao user
  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (!project) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { data, error } = await supabaseAdmin
    .from("tasks")
    .insert({
      project_id: id,
      title,
      description,
    })
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data);
});

// ATUALIZAR
router.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user.id;

  const { data: task } = await supabaseAdmin
    .from("tasks")
    .select("project_id")
    .eq("id", id)
    .single();

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { data: project } = await supabaseAdmin
    .from("projects")
    .select("id")
    .eq("id", task.project_id)
    .eq("user_id", userId)
    .single();

  if (!project) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { data, error } = await supabaseAdmin
    .from("tasks")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

// DELETAR
router.delete("/tasks/:id", async (req: any, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const { data: task } = await supabaseAdmin
    .from("tasks")
    .select("project_id")
    .eq("id", id)
    .single();

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { data: project } = await supabaseAdmin
    .from("projects")
    .select("id")
    .eq("id", task.project_id)
    .eq("user_id", userId)
    .single();

  if (!project) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { error } = await supabaseAdmin.from("tasks").delete().eq("id", id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Deleted successfully" });
});

export default router;
