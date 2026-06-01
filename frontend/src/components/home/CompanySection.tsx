"use client";

import {
  Award,
  Users,
  Target,
  Zap
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

export default function CompanySection() {
  const { t } = useLanguage();

  return (
    <section
      id="empresa"
      className="companySection"
    >

      <div className="companyContent">

        <div className="companyLeft">

          <span className="sectionBadge">
            {t.company.intro.badge}
          </span>

          <h2>
            Líderes en Energía Renovable
          </h2>

          <p>
            Somos una empresa especializada
            en soluciones energéticas modernas,
            sostenibles e inteligentes.
          </p>

          <div className="companyNumbers">

            <div>
              <strong>15+</strong>
              <small>Años de experiencia</small>
            </div>

            <div>
              <strong>50+</strong>
              <small>Profesionales</small>
            </div>

          </div>

        </div>

        <div className="companyRight">

          <div className="miniCard">
            <Award size={24} />
            <h4>Excelencia</h4>
            <p>Compromiso con la calidad</p>
          </div>

          <div className="miniCard">
            <Users size={24} />
            <h4>Innovación</h4>
            <p>Tecnología avanzada</p>
          </div>

          <div className="miniCard">
            <Target size={24} />
            <h4>Sostenibilidad</h4>
            <p>Respeto por el medio ambiente</p>
          </div>

          <div className="miniCard">
            <Zap size={24} />
            <h4>Eficiencia</h4>
            <p>Máximo rendimiento energético</p>
          </div>

        </div>

      </div>

    </section>
  );
}