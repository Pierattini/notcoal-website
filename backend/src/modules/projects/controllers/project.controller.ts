import { Request, Response } from "express";
import {
  getProjects,
  getFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
  setFeaturedProjectPosition
} from "../services/project.service";

export const getAllProjects = async (
  req: Request,
  res: Response
) => {
  try {
    const projects = await getProjects();

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      error: "Error obteniendo proyectos",
    });
  }
};

export const getFeatured = async (
  req: Request,
  res: Response
) => {
  try {
    const projects =
      await getFeaturedProjects();

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      error: "Error obteniendo destacados",
    });
  }
};

export const createNewProject = async (
  req: Request,
  res: Response
) => {
  try {
    const project =
      await createProject(req.body);

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      error: "Error creando proyecto",
    });
  }
};

export const updateExistingProject = async (
  req: Request,
  res: Response
) => {
  try {
    const project =
      await updateProject(
        req.params.id as string,
        req.body
      );

    res.json(project);
  } catch (error) {
    res.status(500).json({
      error: "Error actualizando proyecto",
    });
  }
};

export const deleteExistingProject = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteProject(
      req.params.id as string
    );

    res.json({
      success: true
    });
  } catch (error) {
    res.status(500).json({
      error: "Error eliminando proyecto",
    });
  }
};

export const updateFeaturedPosition = async (
  req: Request,
  res: Response
) => {
  try {
    const position = Number(req.params.position);

    if (![1, 2, 3].includes(position)) {
      return res.status(400).json({
        error: "Invalid featured position",
      });
    }

    const project = await setFeaturedProjectPosition(
      position,
      req.body.projectId || null
    );

    res.json({
      position,
      project,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error actualizando destacado",
    });
  }
};
