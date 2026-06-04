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
    <h3>{t.company.values.value1.title}</h3>
    <p>{t.company.values.value1.text}</p>
  </div>

  <div className="valueCard">
    <h3>{t.company.values.value2.title}</h3>
    <p>{t.company.values.value2.text}</p>
  </div>

  <div className="valueCard">
    <h3>{t.company.values.value3.title}</h3>
    <p>{t.company.values.value3.text}</p>
  </div>

  <div className="valueCard">
    <h3>{t.company.values.value4.title}</h3>
    <p>{t.company.values.value4.text}</p>
  </div>

  <div className="valueCard">
    <h3>{t.company.values.value5.title}</h3>
    <p>{t.company.values.value5.text}</p>
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
      alt="Founder"
      fill
      className="coverImage"
    />

  </div>

  <div className="premiumRight">

    <small>
      {t.company.operatingModel.badge}
    </small>

    <h2>
      {t.company.operatingModel.title}
    </h2>

    <p>
      {t.company.operatingModel.description}
    </p>

    <div className="premiumNumbers">

      <div>
        <strong>
          {t.company.operatingModel.metric1}
        </strong>
      </div>

      <div>
        <strong>
          {t.company.operatingModel.metric2}
        </strong>
      </div>

      <div>
        <strong>
          {t.company.operatingModel.metric3}
        </strong>
      </div>

      <div>
        <strong>
          {t.company.operatingModel.metric4}
        </strong>
      </div>

    </div>

  </div>

</section>

    </main>
  );
}