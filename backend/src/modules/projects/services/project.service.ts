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
      displayorder: {
        in: [1, 2, 3],
      },
    },
    orderBy: {
      displayorder: "asc",
    },
  });
};

export const setFeaturedProjectPosition = async (
  position: number,
  projectId?: string | null
) => {
  return prisma.$transaction(async (tx) => {
    await tx.project.updateMany({
      where: {
        displayorder: position,
      },
      data: {
        featured: false,
        displayorder: 0,
      },
    });

    if (!projectId) {
      return null;
    }

    await tx.project.updateMany({
      where: {
        id: projectId,
      },
      data: {
        featured: false,
        displayorder: 0,
      },
    });

    return tx.project.update({
      where: {
        id: projectId,
      },
      data: {
        featured: true,
        displayorder: position,
      },
    });
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
