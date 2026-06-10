"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import {
  createProject,
  deleteProject,
  getProjects,
  setFeaturedProjectPosition,
  updateProject,
} from "@/services/project.service";
import {
  LEAD_STATUSES,
  PAGE_SIZE,
  emptyProjectForm,
} from "../_lib/constants";
import {
  getCurrentUser,
  getLeads,
  updateLeadStatus as patchLeadStatus,
} from "../_lib/api";
import { fileToDataUrl, formatDate, formatMeeting, parseJsonList, sortValue } from "../_lib/utils";
import {
  AdminSection,
  Lead,
  Project,
  FeaturedProjectPositions,
  ProjectForm,
  SortConfig,
  Toast,
} from "../_lib/types";

export function useAdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<AdminSection>("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<Toast>(null);

  const [leadSearch, setLeadSearch] = useState("");
  const [leadStatusFilter, setLeadStatusFilter] = useState("All");
  const [leadMeetingFilter, setLeadMeetingFilter] = useState("All");
  const [leadPage, setLeadPage] = useState(1);
  const [leadSort, setLeadSort] = useState<SortConfig<Lead>>({
    key: "createdAt",
    direction: "desc",
  });
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [messageLead, setMessageLead] = useState<Lead | null>(null);

  const [projectSearch, setProjectSearch] = useState("");
  const [projectCategoryFilter, setProjectCategoryFilter] = useState("All");
  const [projectStatusFilter, setProjectStatusFilter] = useState("All");
  const [projectPage, setProjectPage] = useState(1);
  const [projectSort, setProjectSort] = useState<SortConfig<Project>>({
    key: "createdAt",
    direction: "desc",
  });
  const [projectForm, setProjectForm] = useState<ProjectForm>(emptyProjectForm);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [savingProject, setSavingProject] = useState(false);
  const [featuredPositions, setFeaturedPositions] =
    useState<FeaturedProjectPositions>({
      1: "",
      2: "",
      3: "",
    });

  const showToast = (nextToast: Toast) => {
    setToast(nextToast);
    window.setTimeout(() => setToast(null), 3500);
  };

  const loadDashboard = async () => {
    setLoading(true);

    try {
      const session = await getCurrentUser();

      if (session.user?.role !== "ADMIN") {
        router.replace("/login");
        return;
      }

      const [leadData, projectData] = await Promise.all([
        getLeads(),
        getProjects(),
      ]);

      setLeads(leadData);
      const normalizedProjects = Array.isArray(projectData) ? projectData : [];
      setProjects(normalizedProjects);
      setFeaturedPositions({
        1:
          normalizedProjects.find(
            (project) => project.featured && project.displayorder === 1,
          )?.id || "",
        2:
          normalizedProjects.find(
            (project) => project.featured && project.displayorder === 2,
          )?.id || "",
        3:
          normalizedProjects.find(
            (project) => project.featured && project.displayorder === 3,
          )?.id || "",
      });
    } catch (error) {
      console.error(error);
      showToast({
        type: "error",
        message: "No se pudo cargar el panel admin.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const stats = useMemo(() => {
    const now = new Date();

    return {
      totalLeads: leads.length,
      meetingRequests: leads.filter((lead) => lead.wants_meeting).length,
      publishedProjects: projects.length,
      currentMonthLeads: leads.filter((lead) => {
        if (!lead.createdAt) return false;
        const created = new Date(lead.createdAt);

        return (
          created.getMonth() === now.getMonth() &&
          created.getFullYear() === now.getFullYear()
        );
      }).length,
    };
  }, [leads, projects]);

  const filteredLeads = useMemo(() => {
    const term = leadSearch.trim().toLowerCase();

    return leads
      .filter((lead) => {
        const haystack = [
          lead.id,
          lead.name,
          lead.email,
          lead.phone,
          lead.company,
          lead.country_name,
          lead.country_code,
          lead.service,
          lead.message,
          lead.status,
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch = !term || haystack.includes(term);
        const matchesStatus =
          leadStatusFilter === "All" || lead.status === leadStatusFilter;
        const matchesMeeting =
          leadMeetingFilter === "All" ||
          (leadMeetingFilter === "Yes" && lead.wants_meeting) ||
          (leadMeetingFilter === "No" && !lead.wants_meeting);

        return matchesSearch && matchesStatus && matchesMeeting;
      })
      .sort((a, b) => {
        const first = sortValue(a[leadSort.key]);
        const second = sortValue(b[leadSort.key]);

        if (first > second) return leadSort.direction === "asc" ? 1 : -1;
        if (first < second) return leadSort.direction === "asc" ? -1 : 1;
        return 0;
      });
  }, [leads, leadMeetingFilter, leadSearch, leadSort, leadStatusFilter]);

  const filteredProjects = useMemo(() => {
    const term = projectSearch.trim().toLowerCase();

    return projects
      .filter((project) => {
        const haystack = [
          project.title,
          project.category,
          project.country,
          project.power,
          project.area,
          project.company,
          project.description,
          project.metaDescription,
          project.status,
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch = !term || haystack.includes(term);
        const matchesCategory =
          projectCategoryFilter === "All" ||
          project.category === projectCategoryFilter;
        const matchesStatus =
          projectStatusFilter === "All" ||
          project.status === projectStatusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        const first = sortValue(a[projectSort.key]);
        const second = sortValue(b[projectSort.key]);

        if (first > second) return projectSort.direction === "asc" ? 1 : -1;
        if (first < second) return projectSort.direction === "asc" ? -1 : 1;
        return 0;
      });
  }, [
    projectCategoryFilter,
    projectSearch,
    projectSort,
    projectStatusFilter,
    projects,
  ]);

  const leadPages = Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE));
  const projectPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));

  const paginatedLeads = filteredLeads.slice(
    (leadPage - 1) * PAGE_SIZE,
    leadPage * PAGE_SIZE,
  );
  const paginatedProjects = filteredProjects.slice(
    (projectPage - 1) * PAGE_SIZE,
    projectPage * PAGE_SIZE,
  );

  const toggleLeadSort = (key: keyof Lead) => {
    setLeadSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const toggleProjectSort = (key: keyof Project) => {
    setProjectSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const updateLeadStatus = async (leadId: string, status: string) => {
    try {
      await patchLeadStatus(leadId, status);
      setLeads((current) =>
        current.map((lead) => (lead.id === leadId ? { ...lead, status } : lead)),
      );
      showToast({ type: "success", message: "Estado actualizado." });
    } catch (error) {
      console.error(error);
      showToast({ type: "error", message: "No se pudo actualizar el estado." });
    }
  };

  const exportLeads = () => {
    const rows = leads.map((lead) => ({
      Fecha: formatDate(lead.createdAt),
      Nombre: lead.name || "",
      Email: lead.email || "",
      Telefono: lead.phone || "",
      Empresa: lead.company || "",
      Pais: lead.country_name || "",
      Servicio: lead.service || "",
      "Solicita reunion": formatMeeting(lead.wants_meeting),
      "Fecha reunion": lead.meetingDate || "",
      "Horario reunion": lead.meetingSlot || "",
      Mensaje: lead.message || "",
      Estado: lead.status || LEAD_STATUSES[0],
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    worksheet["!cols"] = [
      { wch: 22 },
      { wch: 24 },
      { wch: 28 },
      { wch: 18 },
      { wch: 24 },
      { wch: 18 },
      { wch: 24 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
      { wch: 48 },
      { wch: 22 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    XLSX.writeFile(workbook, "TheNotCoalCompany-Leads.xlsx");
  };

  const openProjectModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({
        title: project.title || "",
        category: project.category || "Solar PV",
        country: project.country || "",
        power: project.power || "",
        area: project.area || "",
        company: project.company || "",
        description: project.description || "",
        metaDescription: project.metaDescription || "",
        imageUrl: project.imageUrl || "",
        gallery: parseJsonList(project.gallery),
        status: project.status === "Published" ? "Published" : "Draft",
      });
    } else {
      setEditingProject(null);
      setProjectForm(emptyProjectForm);
    }

    setProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setProjectModalOpen(false);
    setEditingProject(null);
    setProjectForm(emptyProjectForm);
  };

  const handleProjectField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setProjectForm((current) => ({ ...current, [name]: value }));
  };

  const handleMainImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = await fileToDataUrl(file);
    setProjectForm((current) => ({ ...current, imageUrl }));
  };

  const handleGalleryImages = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const images = await Promise.all(files.map(fileToDataUrl));
    setProjectForm((current) => ({
      ...current,
      gallery: [...current.gallery, ...images],
    }));
  };

  const moveGalleryImage = (index: number, direction: -1 | 1) => {
    setProjectForm((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.gallery.length) return current;

      const gallery = [...current.gallery];
      const [image] = gallery.splice(index, 1);
      gallery.splice(nextIndex, 0, image);

      return { ...current, gallery };
    });
  };

  const removeGalleryImage = (index: number) => {
    setProjectForm((current) => ({
      ...current,
      gallery: current.gallery.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const projectPayload = () => ({
    ...projectForm,
    gallery: JSON.stringify(projectForm.gallery),
  });

  const saveProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingProject(true);

    try {
      const payload = projectPayload();

      if (editingProject) {
        const updated = await updateProject(editingProject.id, payload);
        setProjects((current) =>
          current.map((project) =>
            project.id === editingProject.id ? updated : project,
          ),
        );
        showToast({ type: "success", message: "Proyecto actualizado." });
      } else {
        const created = await createProject(payload);
        setProjects((current) => [created, ...current]);
        showToast({ type: "success", message: "Proyecto creado." });
      }

      closeProjectModal();
    } catch (error) {
      console.error(error);
      showToast({ type: "error", message: "No se pudo guardar el proyecto." });
    } finally {
      setSavingProject(false);
    }
  };

  const duplicateProject = async (project: Project) => {
    try {
      const duplicated = await createProject({
        title: `${project.title || "Project"} Copy`,
        category: project.category || "Solar PV",
        country: project.country || "",
        power: project.power || "",
        area: project.area || "",
        company: project.company || "",
        description: project.description || "",
        metaDescription: project.metaDescription || "",
        imageUrl: project.imageUrl || "",
        gallery:
          typeof project.gallery === "string"
            ? project.gallery
            : JSON.stringify(project.gallery || []),
        status: "Draft",
        featured: false,
      });

      setProjects((current) => [duplicated, ...current]);
      showToast({ type: "success", message: "Proyecto duplicado." });
    } catch (error) {
      console.error(error);
      showToast({ type: "error", message: "No se pudo duplicar el proyecto." });
    }
  };

  const toggleProjectStatus = async (project: Project) => {
    const nextStatus = project.status === "Published" ? "Draft" : "Published";

    try {
      const updated = await updateProject(project.id, {
        status: nextStatus,
      });

      setProjects((current) =>
        current.map((item) => (item.id === project.id ? updated : item)),
      );
      showToast({
        type: "success",
        message:
          nextStatus === "Published"
            ? "Proyecto publicado."
            : "Proyecto despublicado.",
      });
    } catch (error) {
      console.error(error);
      showToast({
        type: "error",
        message: "No se pudo cambiar el estado del proyecto.",
      });
    }
  };

  const removeProject = async (project: Project) => {
    const confirmed = window.confirm(
      `Eliminar "${project.title || "este proyecto"}"? Esta acción no se puede deshacer.`,
    );
    if (!confirmed) return;

    try {
      await deleteProject(project.id);
      setProjects((current) => current.filter((item) => item.id !== project.id));
      setFeaturedPositions((current) => ({
        1: current[1] === project.id ? "" : current[1],
        2: current[2] === project.id ? "" : current[2],
        3: current[3] === project.id ? "" : current[3],
      }));
      showToast({ type: "success", message: "Proyecto eliminado." });
    } catch (error) {
      console.error(error);
      showToast({ type: "error", message: "No se pudo eliminar el proyecto." });
    }
  };

  const updateFeaturedPosition = async (
    position: keyof FeaturedProjectPositions,
    projectId: string
  ) => {
    try {
      await setFeaturedProjectPosition(Number(position), projectId);

      setProjects((current) =>
        current.map((project) => {
          const isPreviousPosition =
            project.featured && project.displayorder === Number(position);
          const isSelectedProject = project.id === projectId;

          if (isPreviousPosition || isSelectedProject) {
            return {
              ...project,
              featured: isSelectedProject && Boolean(projectId),
              displayorder: isSelectedProject && projectId ? Number(position) : 0,
            };
          }

          return project;
        }),
      );

      setFeaturedPositions((current) => ({
        1: current[1] === projectId ? "" : current[1],
        2: current[2] === projectId ? "" : current[2],
        3: current[3] === projectId ? "" : current[3],
        [position]: projectId,
      }));

      showToast({
        type: "success",
        message: "Featured Project actualizado.",
      });
    } catch (error) {
      console.error(error);
      showToast({
        type: "error",
        message: "No se pudo actualizar Featured Projects.",
      });
    }
  };

  return {
    activeSection,
    closeProjectModal,
    duplicateProject,
    editingProject,
    exportLeads,
    featuredPositions,
    handleGalleryImages,
    handleMainImage,
    handleProjectField,
    leadMeetingFilter,
    leadPage,
    leadPages,
    leadSearch,
    leadStatusFilter,
    loading,
    loadDashboard,
    messageLead,
    moveGalleryImage,
    openProjectModal,
    paginatedLeads,
    paginatedProjects,
    previewProject,
    projectCategoryFilter,
    projectForm,
    projectModalOpen,
    projectPage,
    projectPages,
    projectSearch,
    projectStatusFilter,
    removeGalleryImage,
    removeProject,
    saveProject,
    savingProject,
    selectedLead,
    setActiveSection,
    setLeadMeetingFilter,
    setLeadPage,
    setLeadSearch,
    setLeadStatusFilter,
    setMessageLead,
    setPreviewProject,
    setProjectCategoryFilter,
    setProjectPage,
    setProjectSearch,
    setProjectStatusFilter,
    setSelectedLead,
    stats,
    toast,
    toggleLeadSort,
    toggleProjectSort,
    toggleProjectStatus,
    updateLeadStatus,
    updateFeaturedPosition,
    leadsCount: leads.length,
    projects,
  };
}
