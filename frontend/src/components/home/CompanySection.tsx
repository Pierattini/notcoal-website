"use client";

import {
  Award,
  Users,
  Target,
  Zap,
  Briefcase
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
            {t.home.differentiators.badge}
          </span>

          <h2>
            {t.home.differentiators.title}
          </h2>

          <p>
            {t.home.differentiators.description}
          </p>

          <p className="closingMessage">
            {t.home.differentiators.closingMessage}
          </p>

        </div>

        <div className="companyRight">

          <div className="miniCard">
            <Award size={24} />
            <h4>{t.home.differentiators.items[0].title}</h4>
            <p>{t.home.differentiators.items[0].text}</p>
          </div>

          <div className="miniCard">
            <Users size={24} />
            <h4>{t.home.differentiators.items[1].title}</h4>
            <p>{t.home.differentiators.items[1].text}</p>
          </div>

          <div className="miniCard">
            <Target size={24} />
            <h4>{t.home.differentiators.items[2].title}</h4>
            <p>{t.home.differentiators.items[2].text}</p>
          </div>

          <div className="miniCard">
            <Zap size={24} />
            <h4>{t.home.differentiators.items[3].title}</h4>
            <p>{t.home.differentiators.items[3].text}</p>
          </div>

          <div className="miniCard">
            <Briefcase size={24} />
            <h4>{t.home.differentiators.items[4].title}</h4>
            <p>{t.home.differentiators.items[4].text}</p>
          </div>

        </div>

      </div>
    </section>
  );
}