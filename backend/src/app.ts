import express, {
  Request,
  Response,
} from "express";

import cors from "cors";

import projectRoutes from "./modules/projects/routes/project.routes";
import leadRoutes from "./modules/leads/routes/lead.routes";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

const allowedOrigins = [
  "https://www.notcoal.eu",
  "https://notcoal.eu",
  "http://localhost:3000",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(
      new Error(
        `CORS blocked origin: ${origin}`
      )
    );
  },
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
