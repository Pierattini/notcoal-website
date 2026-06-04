"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { projects } from "@/data/projects";
import { featuredProjects } from "@/data/featuredProjects";
import {
  FaBolt,
  FaMapMarkedAlt,
  FaGlobeEurope,
  FaHandshake,
  FaClipboardList,
  FaBuilding,
  FaTruck,
  FaTasks,
  FaCheckCircle
} from "react-icons/fa";
export default function ProjectsPage() {
  const { t } = useLanguage();
  const categories = [
  t.projects.filters.all,
  t.projects.filters.solar,
  t.projects.filters.bess,
  t.projects.filters.epc,
  t.projects.filters.consulting
];
  const [activeCategory, setActiveCategory] =
    useState("Todos");
  const [activeProjectIndex, setActiveProjectIndex] =
  useState(0);
  const activeProjects =
    projects[
      activeCategory as keyof typeof projects
    ];
  const featured =
  projects.Todos.filter(project =>
    featuredProjects.includes(project.title)
  );
  return (

    <main className="projectsPage">

      {/* HERO */}

      <section className="projectsHero">

  <div className="projectsHeroContent">

    <span className="heroBadge">
      {t.projects.hero.badge}
    </span>

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
            key={category}
            className={
              activeCategory === category
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveCategory(category)
            }
          >
            {category}
          </button>

        ))}

      </section>

      {/* SHOWCASE */}

{activeProjects.length > 0 && (

<section className="projectsShowcase">

  {/* NOMBRES PROYECTOS */}

  <div className="projectTabs">

    {featured.map((project, index) => (

      <button
  key={index}
  className={
    activeProjectIndex === index
      ? "projectTab active"
      : "projectTab"
  }
  onClick={() =>
    setActiveProjectIndex(index)
  }
>
  {project.title}
</button>

    ))}

  </div>

  {/* CONTENIDO */}

  <div className="projectShowcaseContent">

    {/* IMAGEN */}

    <div className="projectShowcaseImage">

      <Image
        src={activeProjects[activeProjectIndex].image}
        alt={activeProjects[activeProjectIndex].title}
        fill
        className="projectImage"
      />

    </div>

    {/* TEXTO */}

   <div className="projectShowcaseInfo">

  <span>
    {activeProjects[activeProjectIndex].category}
  </span>

  <h2>
    {activeProjects[activeProjectIndex].title}
  </h2>

  <p>
    {activeProjects[activeProjectIndex].description}
  </p>

  <div className="projectDetails">

  <div className="projectDetailItem">
    <FaBolt className="detailIcon" />
    <div className="detailLabel">
      {activeProjects[activeProjectIndex].power}
    </div>
  </div>

  <div className="projectDetailItem">
    <FaMapMarkedAlt className="detailIcon" />
    <div className="detailLabel">
      {activeProjects[activeProjectIndex].area}
    </div>
  </div>

  <div className="projectDetailItem">
    <FaGlobeEurope className="detailIcon" />
    <div className="detailLabel">
      {activeProjects[activeProjectIndex].country}
    </div>
  </div>

  <div className="projectDetailItem">
    <FaHandshake className="detailIcon" />
    <div className="detailLabel">
      {activeProjects[activeProjectIndex].company}
    </div>
  </div>

  <div className="projectDetailItem">
    <FaClipboardList className="detailIcon" />
    <div className="detailLabel">
      {activeProjects[activeProjectIndex].projectPhase}
    </div>
  </div>

  <div className="projectDetailItem">
    <FaTruck className="detailIcon" />
    <div className="detailLabel">
      {activeProjects[activeProjectIndex].deliveryModel}
    </div>
  </div>

  <div className="projectDetailItem">
    <FaTasks className="detailIcon" />
    <div className="detailLabel">
      {activeProjects[activeProjectIndex].scopeOfSupport}
    </div>
  </div>

  <div className="projectDetailItem">
    <FaCheckCircle className="detailIcon" />
    <div className="detailLabel">
      {activeProjects[activeProjectIndex].status}
    </div>
  </div>

</div>
</div>
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

          <span className="sectionBadge">
  {t.projects.featured.badge}
</span>

<h2>
  {t.projects.featured.title}
</h2>

        </div>

        <div className="projectsListGrid">

          {activeProjects.map((project, index) => (

            <article
              className="projectListCard"
              key={index}
            >

              <div className="projectListImage">

                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="projectImage"
                />

              </div>

              <div className="projectListContent">

                <span>
                  {project.category}
                </span>

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.description}
                </p>
<div className="featuredProjectStats">

  <div className="featuredProjectItem">
    <FaBolt className="featuredIcon" />
    <strong>{project.power}</strong>
  </div>

  <div className="featuredProjectItem">
    <FaMapMarkedAlt className="featuredIcon" />
    <strong>{project.area}</strong>
  </div>

  <div className="featuredProjectItem">
    <FaGlobeEurope className="featuredIcon" />
    <strong>{project.country}</strong>
  </div>

  <div className="featuredProjectItem">
    <FaHandshake className="featuredIcon" />
    <strong>{project.company}</strong>
  </div>

</div>
    </div>
            </article>

         ) )}

        </div>

      </section>

    </main>
  );
}