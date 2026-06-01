"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function FeaturedProjects() {
  const { t } = useLanguage();

  return (
    <section id="proyectos" className="projectsSection">
      <div className="statementBand">
        <p>{t.company.statement}</p>
      </div>

      <div className="companySingleSection">
        <div className="companySingleImage">
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1600"
            alt=""
          />
        </div>

        <div className="companySingleContent">
          <span>{t.company.intro.badge}</span>

          <h2>{t.company.intro.title}</h2>

          <p>{t.company.intro.text1}</p>

          <p>{t.company.intro.text2}</p>

        </div>

      </div>

    </section>
  );
}