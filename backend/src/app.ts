import express, { Request, Response } from "express";
import cors from "cors";
import projectRoutes from "./modules/projects/routes/project.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/projects", projectRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("The Not Coal Company API funcionando");
});

export default app;