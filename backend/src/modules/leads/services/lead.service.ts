import {
  createLeadRepository,
  getLeadsRepository,
  updateLeadRepository,
} from "../repositories/lead.repository";

export const createLeadService = async (
  data: any
) => {
  return createLeadRepository(data);
};

export const getLeadsService = async () => {
  return getLeadsRepository();
};

export const updateLeadService = async (
  id: string,
  data: any
) => {
  return updateLeadRepository(id, data);
};
