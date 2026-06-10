import { Router } from "express";
import {
  getAllProjects,
  getFeatured,
  createNewProject,
  updateExistingProject,
  deleteExistingProject,
  updateFeaturedPosition
} from "../controllers/project.controller";

const router = Router();

router.get("/", getAllProjects);

router.get(
  "/featured",
  getFeatured
);

router.put(
  "/featured/:position",
  updateFeaturedPosition
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
