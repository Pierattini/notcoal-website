export type AdminSection = "leads" | "projects";
export type SortDirection = "asc" | "desc";

export type SortConfig<T> = {
  key: keyof T;
  direction: SortDirection;
};

export type Toast = {
  type: "success" | "error";
  message: string;
} | null;

export type Lead = {
  id: string;
  createdAt?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  country_name?: string;
  country_code?: string;
  service?: string;
  wants_meeting?: boolean;
  meetingDate?: string | null;
  meetingSlot?: string | null;
  message?: string;
  attachments?: string | null;
  status?: string | null;
};

export type Project = {
  id: string;
  title?: string;
  category?: string;
  country?: string;
  power?: string;
  area?: string;
  company?: string;
  description?: string;
  metaDescription?: string;
  imageUrl?: string;
  gallery?: string | string[] | null;
  status?: string;
  featured?: boolean;
  createdAt?: string;
};

export type ProjectForm = {
  title: string;
  category: string;
  country: string;
  power: string;
  area: string;
  company: string;
  description: string;
  metaDescription: string;
  imageUrl: string;
  gallery: string[];
  status: string;
};
