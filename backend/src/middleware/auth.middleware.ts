import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Token não fornecido" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Token mal formatado" });
    return;
  }

  const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_ANON_KEY as string,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  );

  console.log("TOKEN RECEBIDO:", token);
  console.log("PARTES:", token?.split(".").length);

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    console.log("AUTH ERROR:", error?.message);
    res.status(401).json({ error: "Token inválido" });
    return;
  }

  req.user = data.user;
  next();
}
