import { ProjectForm } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL;

export const LEADS_API =
  API_BASE_URL ? `${API_BASE_URL}/leads` : "";
export const PAGE_SIZE = 8;

export const LEAD_STATUSES = [
  "Nuevo",
  "Contactado",
  "Reunión Agendada",
  "Propuesta Enviada",
  "Proyecto Cerrado",
] as const;

export const PROJECT_CATEGORIES = [
  "Solar PV",
  "BESS",
  "EPC",
  "Consulting",
] as const;

export const PROJECT_STATUSES = ["Draft", "Published"] as const;

export const emptyProjectForm: ProjectForm = {
  title: "",
  category: "Solar PV",
  country: "",
  power: "",
  area: "",
  company: "",
  description: "",
  metaDescription: "",
  imageUrl: "",
  gallery: [],
  status: "Draft",
};
