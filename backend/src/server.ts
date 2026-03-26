import dotenv from "dotenv";

dotenv.config();

import cors from "cors";
import express from "express";
import tasksRoutes from "./routes/tasks.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://taskflowpro-nine.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/projects", projectsRoutes);
app.use("/projects", tasksRoutes);
app.use("/auth", authRoutes);

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
