import { Router } from "express";
import {
  getAllProjects,
  getFeatured,
  createNewProject,
  updateExistingProject,
  deleteExistingProject
} from "../controllers/project.controller";

const router = Router();

router.get("/", getAllProjects);

router.get(
  "/featured",
  getFeatured
);

router.post(
  "/",
  createNewProject
);

router.put(
  "/:id",
  updateExistingProject
);

router.delete(
  "/:id",
  deleteExistingProject
);

export default router;