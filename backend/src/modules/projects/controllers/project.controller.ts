import { Request, Response } from "express";
import { getProjects } from "../services/project.service";

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