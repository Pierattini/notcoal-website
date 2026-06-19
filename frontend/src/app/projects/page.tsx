"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import HeroBadge from "@/components/ui/HeroBadge";
import { projects as fallbackProjects } from "@/data/projects";
import {
  FaBolt,
  FaMapMarkedAlt,
  FaGlobeEurope,
  FaHandshake,
  FaClipboardList,
  FaTruck,
  FaTasks,
  FaCheckCircle
} from "react-icons/fa";

type Project = {
  id?: string;
  title?: string;
  description?: string;
  metaDescription?: string;
  category?: string;
  power?: string;
  area?: string;
  country?: string;
  company?: string;
  clienttype?: string;
  projectphase?: string;
  deliverymodel?: string;
  scopeofsupport?: string;
  status?: string;
  imageUrl?: string;
  image?: string;
  featured?: boolean;
  displayorder?: number | null;
  projectPhase?: string;
  deliveryModel?: string;
  scopeOfSupport?: string;
  clientType?: string;
};

function getCountryName(country?: string) {
  return (country || "-")
    .replace(/^[^\p{L}\p{N}]+/u, "")
    .replace(/^[A-Z]{2}\s+/, "");
}

function getProjectImage(project?: Project) {
  return project?.imageUrl || project?.image || "/banner.jpg";
}

function getProjectDescription(project?: Project) {
  return project?.description || project?.metaDescription || "";
}

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [allProjects] = useState<Project[]>(fallbackProjects.Todos);
  const [featuredProjects] = useState<Project[]>(fallbackProjects.Todos);
  const [loadingProjects] = useState(false);
  const categories = [
  { key: "Todos", label: t.projects.filters.all },
  { key: "Solar PV", label: t.projects.filters.solar },
  { key: "BESS", label: t.projects.filters.bess }
];
  const [activeCategory, setActiveCategory] =
    useState("Todos");
  const [activeProjectIndex, setActiveProjectIndex] =
  useState<number | null>(0);

  const activeProjects = useMemo(() => {
    if (allProjects.length === 0) {
      const fallbackKey =
        activeCategory === "Consulting"
          ? "ConsultorÃ­a"
          : activeCategory;

      return (
        (fallbackProjects as Record<string, Project[]>)[fallbackKey] ??
        fallbackProjects.Todos
      );
    }

    if (activeCategory === "Todos") {
      return allProjects;
    }

    return allProjects.filter(
      (project) => project.category === activeCategory,
    );
  }, [activeCategory, allProjects]);

  const featuredPositions = [1, 2, 3].map((position) =>
    featuredProjects?.find(
      (project) => project.featured && project.displayorder === position,
    ),
  );
  const featuredListProjects =
    featuredProjects?.length > 0
      ? featuredPositions.filter(
          (project): project is Project => Boolean(project),
        )
      : activeProjects;

  const activeProject =
    activeProjectIndex === null
      ? undefined
      : activeProjects?.[activeProjectIndex];
  const activeCategoryLabel =
    categories.find((category) => category.key === activeCategory)?.label ?? activeCategory;
  return (

    <main className="projectsPage">

      {/* HERO */}

      <section className="projectsHero">

  <div className="projectsHeroContent">

    <HeroBadge text={t.projects.hero.badge} />

    <h1>
      {t.projects.hero.title}
    </h1>


  </div>

</section>
<section className="projectsOverview">

  <div className="projectsOverviewContent">

    <p>
      {t.projects.overview.description}
    </p>

  </div>

</section>
      {/* METRICS */}

     <section className="projectsMetrics">

  <div>
    <strong>
      500+
    </strong>

    <span>
      {t.projects.metrics.mw}
    </span>
  </div>

  <div>
    <strong>
      5
    </strong>

    <span>
      {t.projects.metrics.markets}
    </span>
  </div>

  <div>
    <strong>
      PV + BESS
    </strong>

    <span>
      {t.projects.metrics.specialization}
    </span>
  </div>

  <div>
    <strong>
      RTB → COD
    </strong>

    <span>
      {t.projects.metrics.epc}
    </span>
  </div>

</section>

      {/* FILTERS */}

      <section className="projectsFilters">

        {categories.map((category) => (

          <button
            key={category.key}
            className={
              activeCategory === category.key
                ? "active"
                : ""
            }
            onClick={() => {
              setActiveCategory(category.key);
              setActiveProjectIndex(0);
            }}
          >
            {category.label}
          </button>

        ))}

      </section>

      {/* SHOWCASE */}

{activeProjects?.length > 0 ? (

<section className="projectsShowcase">

  {/* NOMBRES PROYECTOS */}

  <div className="projectTabs">

    {activeProjects.map((project, index) => (

      <button
  key={index}
  className={
    activeProjectIndex === index
      ? "projectTab active"
      : "projectTab"
  }
  onClick={() =>
    setActiveProjectIndex(
      activeProjectIndex === index ? null : index
    )
  }
>
  {project.title}
</button>

    ))}

  </div>

  {/* CONTENIDO */}

  {activeProject && (
  <div className="projectShowcaseContent">

    <button
      type="button"
      className="projectShowcaseClose"
      onClick={() => setActiveProjectIndex(null)}
      aria-label="Close project details"
    >
      ×
    </button>

    {/* IMAGEN */}

    <div className="projectShowcaseImage">

      <Image
        src={getProjectImage(activeProject)}
        alt={activeProject?.title || "Project"}
        fill
        className="projectImage"
        unoptimized
      />

    </div>

    {/* TEXTO */}

   <div className="projectShowcaseInfo">

  <span>
    {activeProject?.category || "-"}
  </span>

  <h2>
    {activeProject?.title || "Untitled project"}
  </h2>

  <p>
    {getProjectDescription(activeProject)}
  </p>

  <div className="projectDetails">

  <div className="projectDetailItem">
    <FaBolt className="detailIcon" />
    <div className="detailLabel">
      {activeProject?.power || "-"}
    </div>
  </div>

  <div className="projectDetailItem">
    <FaMapMarkedAlt className="detailIcon" />
    <div className="detailLabel">
      {activeProject?.area || "-"}
    </div>
  </div>

  <div className="projectDetailItem">
    <FaGlobeEurope className="detailIcon" />
    <div className="detailLabel">
      {getCountryName(activeProject?.country)}
    </div>
  </div>

  <div className="projectDetailItem">
    <FaHandshake className="detailIcon" />
    <div className="detailLabel">
      {activeProject?.company || "-"}
    </div>
  </div>

  <div className="projectDetailItem">
    <FaClipboardList className="detailIcon" />
    <div className="detailLabel">
      {activeProject?.projectphase || activeProject?.projectPhase || "-"}
    </div>
  </div>

  <div className="projectDetailItem">
    <FaTruck className="detailIcon" />
    <div className="detailLabel">
      {activeProject?.deliverymodel || activeProject?.deliveryModel || "-"}
    </div>
  </div>

  <div className="projectDetailItem">
    <FaTasks className="detailIcon" />
    <div className="detailLabel">
      {activeProject?.scopeofsupport || activeProject?.scopeOfSupport || "-"}
    </div>
  </div>

  <div className="projectDetailItem">
    <FaCheckCircle className="detailIcon" />
    <div className="detailLabel">
      {activeProject?.status || "-"}
    </div>
  </div>

</div>
</div>
  </div>
  )}

</section>

) : (

<section className="projectsEmptyState">
  <div className="projectsEmptyStateCard">
    <span>{activeCategoryLabel}</span>

    <h2>
      {activeCategoryLabel} Projects
    </h2>

    <p>
      New consulting projects will be published soon.
    </p>

    <button
      type="button"
      onClick={() => {
        setActiveCategory("Todos");
        setActiveProjectIndex(0);
      }}
    >
      View All Projects
    </button>
  </div>
</section>

)}

      {/* STATEMENT */}

      <section className="projectsStatement">

  <div className="projectsStatementContent">

   <small>
  {t.projects.collaboration.badge}
</small>

<h2>
  {t.projects.collaboration.title}
</h2>

<p>
  {t.projects.collaboration.description1}
</p>

<p>
  {t.projects.collaboration.description2}
</p>

<p>
  {t.projects.collaboration.description3}
</p>

<p>
  {t.projects.collaboration.description4}
</p>

  </div>

  <div className="projectsStatementImage">

    <Image
          src="/company/mapa.png"
          alt="European Markets"
          fill
          className="coverImage"
        />

  </div>

</section>

     <section className="principlesSection">

  <div className="principleCard">

    <h3>
      {t.projects.principles.execution.title}
    </h3>

    <p>
      {t.projects.principles.execution.description}
    </p>

  </div>

  <div className="principleCard">

    <h3>
      {t.projects.principles.engineering.title}
    </h3>

    <p>
      {t.projects.principles.engineering.description}
    </p>

  </div>

  <div className="principleCard">

    <h3>
      {t.projects.principles.clarity.title}
    </h3>

    <p>
      {t.projects.principles.clarity.description}
    </p>

  </div>

</section>
      {/* PROJECTS LIST */}

      <section id="proyectos" className="projectsListSection">

        <div className="projectsListHeader">

<h2>
  {t.projects.featured.title}
</h2>

        </div>

        <div className="projectsListGrid">

          {loadingProjects ? (
            <article className="projectListCard">
              <div className="projectListContent">
                <span>Loading</span>
                <h3>Loading featured projects...</h3>
                <p>Please wait while projects are loaded.</p>
              </div>
            </article>
          ) : (
            featuredListProjects.map((project, index) => (

            <article
              className="projectListCard"
              key={index}
            >

              <div className="projectListImage">

                <Image
                  src={getProjectImage(project)}
                  alt={project.title || "Featured project"}
                  fill
                  className="projectImage"
                  unoptimized
                />

              </div>

              <div className="projectListContent">

                <span>
                  {project.category || "-"}
                </span>

                <h3>
                  {project.title || "Untitled project"}
                </h3>

                <p>
                  {getProjectDescription(project)}
                </p>
<div className="featuredProjectStats">

  <div className="featuredProjectItem">
    <FaBolt className="featuredIcon" />
    <strong>{project.power || "-"}</strong>
  </div>

  <div className="featuredProjectItem">
    <FaMapMarkedAlt className="featuredIcon" />
    <strong>{project.area || "-"}</strong>
  </div>

  <div className="featuredProjectItem">
    <FaGlobeEurope className="featuredIcon" />
    <strong>{getCountryName(project.country)}</strong>
  </div>

  <div className="featuredProjectItem">
    <FaHandshake className="featuredIcon" />
    <strong>{project.company || "-"}</strong>
  </div>

</div>
    </div>
            </article>

         ) ))}

        </div>

      </section>

    </main>
  );
}
