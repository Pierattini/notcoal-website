export const projects = {
  Todos: [
    {
      category: "Solar PV",
      title: "Germany Solar Hub",
      description: "Utility-scale photovoltaic development supporting renewable energy expansion and long-term grid stability.",
      power: "120 MWp",
      area: "500 ha",
      country: "🇩🇪 Germany",
      company: "BrightWatt Partners",
      projectPhase: "EPC",
      clientType: "Developer",
      deliveryModel: "EPC",
      scopeOfSupport: "Project Management",
      status: "Ongoing",
      image: "/banner.jpg"
    },

    {
      category: "EPC",
      title: "Iberia Energy Park",
      description: "Integrated Solar PV and infrastructure project developed under an EPC execution model.",
      power: "250 MWp",
      area: "900 ha",
      country: "🇪🇸 Spain",
      company: "SunHelp",
      projectPhase: "Construction",
      clientType: "Investor",
      deliveryModel: "EPC",
      scopeOfSupport: "Project management, construction coordination and execution control",
      status: "Ongoing",
      image: "/banner.jpg"
    },

    {
      category: "BESS",
      title: "Poland Storage Platform",
      description: "Large-scale battery energy storage project focused on flexibility services and grid balancing.",
      power: "80 MWh",
      area: "120 ha",
      country: "🇵🇱 Poland",
      company: "BrightWatt Partners",
      projectPhase: "Tender",
      clientType: "IPP",
      deliveryModel: "Light EPC",
      scopeOfSupport: "Technical advisory, supplier coordination and procurement support",
      status: "Under Development",
      image: "/banner.jpg"
    }
  ],

  "Solar PV": [
    {
      category: "Solar PV",
      title: "Germany Solar Hub",
      description: "Utility-scale photovoltaic development supporting renewable energy expansion and long-term grid stability.",
      power: "120 MWp",
      area: "500 ha",
      country: "🇩🇪 Germany",
      company: "BrightWatt Partners",
      projectPhase: "EPC",
      clientType: "Developer",
      deliveryModel: "EPC",
      scopeOfSupport: "Project Management",
      status: "Ongoing",
      image: "/banner.jpg"
    },

    {
      category: "Solar PV",
      title: "Mediterranean Solar Complex",
      description: "Utility-scale solar generation project supporting regional energy transition targets.",
      power: "180 MWp",
      area: "740 ha",
      country: "🇮🇹 Italy",
      company: "BrightWatt Partners",
      projectPhase: "Development",
      clientType: "Developer",
      deliveryModel: "EPC",
      scopeOfSupport: "Technical advisory and EPC partner facilitation",
      status: "Under Development",
      image: "/banner.jpg"
    }
  ],

  BESS: [
    {
      category: "BESS",
      title: "Poland Storage Platform",
      description: "Large-scale battery energy storage project focused on flexibility services and grid balancing.",
      power: "80 MWh",
      area: "120 ha",
      country: "🇵🇱 Poland",
      company: "BrightWatt Partners",
      projectPhase: "Tender",
      clientType: "IPP",
      deliveryModel: "Light EPC",
      scopeOfSupport: "Technical advisory, supplier coordination and procurement support",
      status: "Under Development",
      image: "/banner.jpg"
    },

    {
      category: "BESS",
      title: "Northern Grid Storage",
      description: "Standalone battery storage infrastructure designed to improve network flexibility.",
      power: "150 MWh",
      area: "200 ha",
      country: "🇩🇪 Germany",
      company: "SunHelp",
      projectPhase: "Construction",
      clientType: "Investor",
      deliveryModel: "EPC",
      scopeOfSupport: "Execution advisory and construction coordination",
      status: "Ongoing",
      image: "/banner.jpg"
    }
  ],

  EPC: [
    {
      category: "EPC",
      title: "Iberia Energy Park",
      description: "Integrated Solar PV and infrastructure project developed under an EPC execution model.",
      power: "250 MWp",
      area: "900 ha",
      country: "🇪🇸 Spain",
      company: "SunHelp",
      projectPhase: "Construction",
      clientType: "Investor",
      deliveryModel: "EPC",
      scopeOfSupport: "Project management, construction coordination and execution control",
      status: "Ongoing",
      image: "/banner.jpg"
    }
  ],

  Consultoría: [
    {
      category: "Consulting",
      title: "European Renewable Strategy",
      description: "Strategic advisory assignment supporting market entry, EPC partnerships and project pipeline development.",
      power: "Advisory",
      area: "10ha",
      country: "🇪🇺 Europe",
      company: "BrightWatt Partners",
      projectPhase: "Business Development",
      clientType: "EPC Contractor",
      deliveryModel: "Advisory",
      scopeOfSupport: "Business development, partnership facilitation and commercial strategy",
      status: "Completed",
      image: "/banner.jpg"
    }
  ]
};
export type Project =
  (typeof projects)["Todos"][number];
