"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();
  const privacy = t.legalPages.privacy;
  const document = privacy.document;

  return (
    <main className="legalPage">
      <section className="legalHero">
        <div className="legalContainer">
          <span className="sectionBadge">{privacy.badge}</span>
          <h1>{privacy.title}</h1>
          <p>{privacy.description}</p>
        </div>
      </section>

      <section className="legalSection">
        <div className="legalContainer legalDocument">
          {document.intro.map((text) => (
            <p key={text}>{text}</p>
          ))}

          <h2>{document.controller.title}</h2>
          <p>{document.controller.text}</p>

          <div className="legalInfoCard">
            <p>
              <strong>{document.controller.entityLabel}</strong> TheNotCoalCompany OÜ
            </p>
            <p>
              <strong>{document.controller.registryLabel}</strong> 17503248
            </p>
            <p>
              <strong>{document.controller.vatLabel}</strong> EE 102984561
            </p>
            <p>
              <strong>{document.controller.addressLabel}</strong> Tööstuse 75-71, Tallinn, Estonia, 10416
            </p>
            <p>
              <strong>{document.controller.phoneLabel}</strong>{" "}
              <a href="tel:+49611354698">+49 611 354 698</a>
            </p>
            <p>
              <strong>{document.controller.emailLabel}</strong>{" "}
              <a href="mailto:hi@notcoal.eu">hi@notcoal.eu</a>
            </p>
          </div>

          <p>{document.controller.after}</p>

          {document.sections.map((section) => (
            <Fragment key={section.title}>
              <h2>{section.title}</h2>

              {section.paragraphs?.map((text) => (
                <p key={text}>{text}</p>
              ))}

              {section.items.length > 0 && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item.text}>
                      {item.label ? (
                        <>
                          <strong>{item.label}</strong> {item.text}
                        </>
                      ) : (
                        item.text
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </Fragment>
          ))}

          <h2>{document.rights.title}</h2>
          {document.rights.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}

          <h2>{document.userObligations.title}</h2>
          <p>{document.userObligations.text}</p>

          <h2>{document.commercial.title}</h2>
          <p>
            {document.commercial.textBeforeEmail}{" "}
            <a href="mailto:hi@notcoal.eu">hi@notcoal.eu</a>{" "}
            {document.commercial.textAfterEmail}
          </p>

          <h2>{document.cookies.title}</h2>
          <p>
            {document.cookies.textBeforeLink}{" "}
            <Link href="/cookies-policy">{t.legalLinks.cookiesPolicy}</Link>.
          </p>

          {document.finalSections.map((section) => (
            <Fragment key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </Fragment>
          ))}
        </div>
      </section>
    </main>
  );
}
