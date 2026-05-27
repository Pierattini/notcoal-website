"use client";

import { useState } from "react";

import Image from "next/image";

const categories = [
  "Todos",
  "Solar PV",
  "BESS",
  "EPC",
  "Consultoría"
];

const projects = {
  Todos: [
    {
      category: "Solar PV",
      title: "Parque Solar Valencia",
      description:
        "Proyecto utility-scale orientado a generación fotovoltaica de alto rendimiento y optimización operacional.",
      power: "2.5 MW",
      image: "/banner.jpg"
    },

    {
      category: "EPC Delivery",
      title: "Madrid Energy Hub",
      description:
        "Infraestructura energética desarrollada bajo enfoque EPC y coordinación integral.",
      power: "850 kW",
      image: "/banner.jpg"
    },

    {
      category: "BESS Infrastructure",
      title: "Barcelona Storage System",
      description:
        "Sistema avanzado de almacenamiento energético utility-scale.",
      power: "1.2 MW",
      image: "/banner.jpg"
    }
  ],

  "Solar PV": [
    {
      category: "Solar PV",
      title: "Nordic Solar One",
      description:
        "Desarrollo utility-scale orientado a generación fotovoltaica.",
      power: "2.5 MW",
      image: "/banner.jpg"
    },

    {
      category: "Solar PV",
      title: "Industrial Solar Platform",
      description:
        "Infraestructura PV diseñada para eficiencia energética de largo plazo.",
      power: "4.8 MW",
      image: "/banner.jpg"
    }
  ],

  BESS: [
    {
      category: "BESS",
      title: "Smart Storage Grid",
      description:
        "Solución avanzada de almacenamiento energético utility-scale.",
      power: "120 MWh",
      image: "/banner.jpg"
    },

    {
      category: "BESS",
      title: "Barcelona Storage System",
      description:
        "Integración técnica y estabilización energética para infraestructura crítica.",
      power: "1.2 MW",
      image: "/banner.jpg"
    }
  ],

  EPC: [
    {
      category: "EPC",
      title: "Industrial Energy Hub",
      description:
        "Infraestructura energética desarrollada bajo enfoque EPC.",
      power: "850 kW",
      image: "/banner.jpg"
    }
  ],

  Consultoría: [
    {
      category: "Consultoría",
      title: "Technical Risk Strategy",
      description:
        "Consultoría enfocada en mitigación de riesgos técnicos y contractuales.",
      power: "Advisory",
      image: "/banner.jpg"
    }
  ]
};

export default function ProjectsPage() {

  const [activeCategory, setActiveCategory] =
    useState("Todos");
  const [activeProjectIndex, setActiveProjectIndex] =
  useState(0);
  const activeProjects =
    projects[
      activeCategory as keyof typeof projects
    ];

  return (

    <main className="projectsPage">

      {/* HERO */}

      <section className="projectsHero">

        <div className="projectsHeroContent">

          <span className="heroBadge">
            Nuestro portafolio
          </span>

          <h1>
            Infraestructura energética preparada para ejecución real.
          </h1>

          <p>
            Diseñamos, desarrollamos y ejecutamos proyectos utility-scale
            de energía solar fotovoltaica y sistemas BESS en Europa,
            transformando desafíos complejos en activos operacionales,
            financiables y preparados para escalar.
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
            MW desarrollados en Europa
          </span>

        </div>

        <div>

          <strong>
            5
          </strong>

          <span>
            Mercados energéticos activos
          </span>

        </div>

        <div>

          <strong>
            PV + BESS
          </strong>

          <span>
            Especialización técnica utility-scale
          </span>

        </div>

        <div>

          <strong>
            RTB → COD
          </strong>

          <span>
            Ejecución integral EPC
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

    {activeProjects.map((project, index) => (

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

      <strong>
        {activeProjects[activeProjectIndex].power}
      </strong>

    </div>

  </div>

</section>

)}

      {/* STATEMENT */}

      <section className="projectsStatement">

        <div className="projectsStatementContent">

          <small>
            Ejecución primero
          </small>

          <h2>
            Transformamos complejidad técnica en infraestructura operacional.
          </h2>

          <p>
            Ayudamos a desarrollar y ejecutar proyectos renovables con foco
            en ingeniería, control técnico, gestión EPC y viabilidad real
            desde RTB hasta COD.
          </p>

        </div>

        <div className="projectsStatementImage">

          <Image
            src="/banner.jpg"
            alt="Infraestructura energética"
            fill
            className="projectImage"
          />

        </div>

      </section>

      {/* PRINCIPLES */}

      <section className="principlesSection">

        <div className="principleCard">

          <span>
            01
          </span>

          <h3>
            Execution Over Talk
          </h3>

          <p>
            Los proyectos no avanzan con presentaciones. Avanzan con
            decisiones, coordinación y accountability.
          </p>

        </div>

        <div className="principleCard">

          <span>
            02
          </span>

          <h3>
            Engineering First
          </h3>

          <p>
            La ingeniería correcta reduce riesgos, retrasos y costos.
            Es la base del proyecto, no un agregado.
          </p>

        </div>

        <div className="principleCard">

          <span>
            03
          </span>

          <h3>
            Clarity in Complexity
          </h3>

          <p>
            Simplificamos decisiones técnicas, interfaces y estructuras
            contractuales complejas.
          </p>

        </div>

      </section>

      {/* PROJECTS LIST */}

      <section id="proyectos" className="projectsListSection">

        <div className="projectsListHeader">

          <span className="sectionBadge">
            Casos de éxito
          </span>

          <h2>
            Proyectos destacados
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

              </div>

            </article>

          ))}

        </div>

      </section>

    </main>
  );
}