import { ProjectForm } from "./types";

export const LEADS_API = "http://localhost:4000/leads";
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
