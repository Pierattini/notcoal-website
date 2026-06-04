"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="heroContent">

        <span className="badge">
          {t.home.hero.badge}
        </span>

        <h1>
          {t.home.hero.title}
        </h1>

        <p>
          {t.home.hero.subtitle}
        </p>

        <div className="heroActions">
          <a href="#contacto" className="primaryBtn">
            {t.home.hero.primaryButton}
          </a>

          <a href="/projects" className="secondaryBtn">
            {t.home.hero.secondaryButton}
          </a>
        </div>

      </div>

      <div className="heroShape" />
    </section>
  );
}