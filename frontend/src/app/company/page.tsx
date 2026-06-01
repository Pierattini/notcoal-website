"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function CompanyPage() {
  const { t } = useLanguage();

  return (
    <main className="companyPage">

      {/* HERO */}

      <section className="companyHero">

  <div className="companyHeroOverlay"></div>

  <span className="sectionBadge">
    {t.company.hero.badge}
  </span>

  <h1>
    {t.company.hero.title}
  </h1>

  <p>
    {t.company.hero.description}
  </p>

</section>
<section className="companyIntro">

  <div className="companyIntroImage">

    <Image
      src="/company/company.jpg"
      alt="Founder"
      fill
      className="coverImage"
    />

  </div>

  <div className="companyIntroContent">

    <span>{t.company.intro.badge}</span>

    <h2>
      {t.company.intro.title}
    </h2>

    <p>
      {t.company.intro.text1}
    </p>

    <p>
      {t.company.intro.text2}
    </p>

  </div>

</section>

      {/* FRASE GRANDE */}

      <section className="companyStatement waveSection">

  <div className="companyStatementContent">

    <h2>
      {t.company.statement}
    </h2>

  </div>

</section>

      {/* VALORES */}

      <section className="valuesSection">

        <div className="valueCard">


          <h3>Ejecución antes que discurso</h3>

          <p>
            Los proyectos se entregan mediante
            decisiones, coordinación y responsabilidad.
          </p>
        </div>

        <div className="valueCard">


          <h3>Ingeniería primero</h3>

          <p>
            Una buena ingeniería reduce retrasos,
            riesgos y costos innecesarios.
          </p>
        </div>

        <div className="valueCard">
  

          <h3>Claridad en la complejidad</h3>

          <p>
            Simplificamos contratos, interfaces
            y decisiones técnicas que otros complican.
          </p>
        </div>

        <div className="valueCard">
    

          <h3>Escala con disciplina</h3>

          <p>
            Los proyectos utility-scale requieren
            ambición, estructura y control.
          </p>
        </div>

      </section>
<section className="missionVision">

  <div className="missionBox">

    <small>{t.company.mission.title}</small>

    <h3>
      {t.company.mission.text}
    </h3>

  </div>

  <div className="missionBox">

    <small>{t.company.vision.title}</small>

    <h3>
      {t.company.vision.text}
    </h3>

  </div>

</section>
      {/* PREMIUM GRID */}

<section className="premiumGrid">

  <div className="premiumLeft">
<Image
  src="/company/fundadora.jpg"
  alt="Solar"
  fill
  className="coverImage"
/>

</div>

  <div className="premiumRight">

    <small>{t.company.founder.badge}</small>

  <h2>
  {t.company.founder.title}
  </h2>

  <p>
  {t.company.founder.description}
  </p>

<div className="premiumNumbers">

  <div>
    <strong>RTB → COD</strong>
    <span>Experiencia en desarrollo y ejecución</span>
  </div>

</div>

  </div>

</section>

    </main>
  );
}