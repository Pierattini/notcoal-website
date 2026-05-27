import prisma from "../../../db/prisma";

export const getProjects = async () => {
  return prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};