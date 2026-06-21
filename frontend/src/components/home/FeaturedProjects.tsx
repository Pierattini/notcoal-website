"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
export default function FeaturedProjects() {
  const { t } = useLanguage();

  return (
    <section id="proyectos" className="projectsSection">
      <div className="statementBand">
        <p>{t.company.statement}</p>
      </div>

      <div className="companySingleSection">
        <div className="companySingleImage">
          <Image
  src="/home/cambio.png"
  alt="The Not Coal Company"
  fill
  className="companyImage"
/>
        </div>
<div className="companySingleContent">

  <span>{t.home.whoWeAre.badge}</span>

  <h2>{t.home.whoWeAre.title}</h2>

  <p>{t.home.whoWeAre.text1}</p>

  <p>{t.home.whoWeAre.text2}</p>

</div>
      </div>

    </section>
  );
}
