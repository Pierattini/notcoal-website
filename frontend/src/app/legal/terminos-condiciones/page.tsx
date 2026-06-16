"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function TerminosCondicionesPage() {
  const { t } = useLanguage();

  return (
    <main className="legalPage">
      <section className="legalHero">
        <div className="legalContainer">
          <span className="sectionBadge">{t.legalPages.terms.badge}</span>
          <h1>{t.legalPages.terms.title}</h1>
          <p>{t.legalPages.terms.description}</p>
        </div>
      </section>

      <section className="legalSection">
        <div className="legalContainer">
          <h2>{t.legalPages.terms.useTitle}</h2>
          <p>{t.legalPages.terms.useText}</p>

          <h3>{t.legalPages.terms.accessTitle}</h3>
          <p>{t.legalPages.terms.accessText}</p>

          <h3>{t.legalPages.terms.changesTitle}</h3>
          <p>{t.legalPages.terms.changesText}</p>
        </div>
      </section>
    </main>
  );
}
