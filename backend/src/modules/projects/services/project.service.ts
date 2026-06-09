import prisma from "../../../db/prisma";

export const getProjects = async () => {
  return prisma.project.findMany({
    orderBy: {
      displayorder: "asc",
    },
  });
};

export const getFeaturedProjects = async () => {
  return prisma.project.findMany({
    where: {
      featured: true,
    },
    orderBy: {
      displayorder: "asc",
    },
  });
};

export const createProject = async (
  data: any
) => {
  return prisma.project.create({
    data,
  });
};

export const updateProject = async (
  id: string,
  data: any
) => {
  return prisma.project.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteProject = async (
  id: string
) => {
  return prisma.project.delete({
    where: {
      id,
    },
  });
};