import dotenv from "dotenv";

dotenv.config();

import cors from "cors";
import express from "express";
import tasksRoutes from "./routes/tasks.routes";
import projectsRoutes from "./routes/projects.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/projects", projectsRoutes);
app.use("/tasks", tasksRoutes);
app.use("/auth", authRoutes);

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
