import { Router } from "express";
import { supabase } from "../services/supabase";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// LISTAR
router.get("/", authMiddleware, async (req: any, res) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json(error);

  res.json(data);
});

// CRIAR
router.post("/", authMiddleware, async (req: any, res) => {
  const { title } = req.body;

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title,
      user_id: req.user.id,
    })
    .select();

  if (error) return res.status(400).json(error);

  res.json(data);
});

// DELETAR
router.delete("/:id", authMiddleware, async (req: any, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json(error);

  res.json({ message: "Deletado com sucesso" });
});

export default router;
