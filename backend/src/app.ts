import express, {
  Request,
  Response,
} from "express";

import cors from "cors";

import projectRoutes from "./modules/projects/routes/project.routes";
import leadRoutes from "./modules/leads/routes/lead.routes";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

app.use("/projects", projectRoutes);

app.use("/leads", leadRoutes);

app.use("/auth", authRoutes);

app.get(
  "/",
  (req: Request, res: Response) => {
    res.send(
      "The Not Coal Company API funcionando"
    );
  }
);

export default app;
