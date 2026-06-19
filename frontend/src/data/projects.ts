const currentProjects = [
  {
    id: "sweden-solar-project",
    category: "Solar PV",
    title: "Sweden Solar Project",
    description:
      "Utility-scale Solar PV project delivered under a Light EPC contract model.",
    power: "93 MW",
    area: "115 ha",
    country: "Sweden",
    company: "BWP & Sunhelp",
    projectPhase: "EPC",
    clientType: "x",
    deliveryModel: "Light EPC",
    scopeOfSupport: "Project management",
    status: "Project Completed",
    image: "/projects/sweden-solar-project.jpg",
    featured: true,
    displayorder: 1,
  },
  {
    id: "austria-solar-project",
    category: "Solar PV",
    title: "Austria Solar Project",
    description:
      "Utility-scale Solar PV project completed under a construction contract model.",
    power: "71 MW",
    area: "80 ha",
    country: "Austria",
    company: "BWP & Sunhelp",
    projectPhase: "EPC",
    clientType: "x",
    deliveryModel: "Construction",
    scopeOfSupport: "Project management",
    status: "Project Completed",
    image: "/projects/austria-solar-project.jpg",
    featured: true,
    displayorder: 2,
  },
  {
    id: "germany-solar-project",
    category: "Solar PV",
    title: "Germany Solar Project",
    description:
      "Utility-scale Solar PV project completed under a construction contract model.",
    power: "26 MW",
    area: "45 ha",
    country: "Germany",
    company: "BWP & Sunhelp",
    projectPhase: "EPC",
    clientType: "x",
    deliveryModel: "Construction",
    scopeOfSupport: "Project management",
    status: "Project Completed",
    image: "/projects/germany-solar-project.jpg",
    featured: true,
    displayorder: 3,
  },
];

export const projects = {
  Todos: currentProjects,
  "Solar PV": currentProjects,
  BESS: [],
  EPC: [],
  Consultoria: [],
};

export type Project =
  (typeof projects)["Todos"][number];
