"use client";

import type { TouchEvent } from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import HeroBadge from "@/components/ui/HeroBadge";

const SERVICE_IDS = [
  "service01",
  "service02",
  "service03",
  "service04",
  "service05",
  "service06",
  "service07"
];

function AccordionItem({
  index,
  title,
  shortDesc,
  longDesc
}: {
  index: number;
  title: string;
  shortDesc?: string;
  longDesc: string;
}) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxH, setMaxH] = useState("0px");
  const { t } = useLanguage();
  useEffect(() => {
    // Measure after paint to ensure accurate scrollHeight
    const id = requestAnimationFrame(() => {
      if (contentRef.current) {
        const h = contentRef.current.scrollHeight;
        if (open) {
          setMaxH(h > 0 ? `${h}px` : "500px");
        } else {
          setMaxH("0px");
        }
      }
    });

    return () => cancelAnimationFrame(id);
  }, [open]);

  return (
    <div className={`serviceStep accordion ${open ? "open" : ""}`}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className={`serviceStepHeader ${open ? "open" : ""}`}
      >
        <div className="serviceStepMeta">
          <h4 className="serviceStepTitle">{title}</h4>
          {shortDesc && (
            <p className="serviceStepShort">{shortDesc}</p>
          )}
        </div>
        <div className={`serviceStepToggle ${open ? "rotated" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12h14" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      <div
        ref={contentRef}
        className="serviceStepContent"
        style={{ maxHeight: maxH, opacity: open ? 1 : 0 }}
        aria-hidden={!open}
      >
        <div className="serviceStepContentInner">
          <p>{longDesc}</p>
          <p style={{marginTop:12}}>Contenido adicional de prueba: descripción detallada, pasos, ejemplos de entregables y notas técnicas. Esto es solo provisoria para verificar la animación y el layout.</p>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {

  const { t } = useLanguage();
  const touchStartX = useRef<number | null>(null);
  const service01Items = t.services.service01.items;
  const service02Items = t.services.service02.items;
  const service03Items = t.services.service03.items;
  const service04Items = t.services.service04.items;
  const service05Items = t.services.service05.items;
  const service06Items = t.services.service06.items;
  const service07Items = t.services.service07.items;
  const handleServicesTouchStart = (
    event: TouchEvent<HTMLElement>
  ) => {
    if (window.innerWidth > 768) {
      return;
    }

    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleServicesTouchEnd = (
    event: TouchEvent<HTMLElement>
  ) => {
    if (window.innerWidth > 768 || touchStartX.current === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX;

    if (touchEndX === undefined) {
      touchStartX.current = null;
      return;
    }

    const deltaX = touchStartX.current - touchEndX;
    touchStartX.current = null;

    if (Math.abs(deltaX) < 50) {
      return;
    }

    const currentIndex = SERVICE_IDS.reduce((closestIndex, serviceId, index) => {
      const currentElement = document.getElementById(serviceId);
      const closestElement = document.getElementById(SERVICE_IDS[closestIndex]);

      if (!currentElement || !closestElement) {
        return closestIndex;
      }

      return Math.abs(currentElement.getBoundingClientRect().top) <
        Math.abs(closestElement.getBoundingClientRect().top)
        ? index
        : closestIndex;
    }, 0);

    const nextIndex =
      deltaX > 0
        ? Math.min(currentIndex + 1, SERVICE_IDS.length - 1)
        : Math.max(currentIndex - 1, 0);

    document
      .getElementById(SERVICE_IDS[nextIndex])
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="servicesPage">

      {/* HERO */}
<section className="servicesHero">

  <HeroBadge text={t.services.hero.badge} />

  <h1>
    {t.services.hero.title}
  </h1>

  <p>
    {t.services.hero.description}
  </p>

</section>

{/* INTRO */}
<section className="servicesIntro">

  <div className="servicesIntroImage">
    <Image
      src="/home/Home y Service_1.2.png"
      alt="European Markets"
      fill
      className="coverImage"
    />
  </div>

  <div className="servicesIntroContent">
    <span>{t.services.intro.badge}</span>

    <h2>{t.services.intro.title}</h2>

    <p>{t.services.intro.text1}</p>

    <p>{t.services.intro.text2}</p>
  </div>

</section>


{/* BLOQUE 1 */}
<section
  className="servicesShowcase"
  onTouchStart={handleServicesTouchStart}
  onTouchEnd={handleServicesTouchEnd}
>

{/* SERVICE 01 */}

<div id="service01" className="serviceRow">

  <div className="serviceText">
<span className="miniTag">01</span>

<h2>{t.services.service01.title}</h2>

<p>{t.services.service01.description}</p>

<div className="serviceExpand">
  {service01Items.map((item, idx) => (
    <AccordionItem
      key={idx}
      index={idx}
      title={item.title}
      shortDesc={item.shortDesc}
      longDesc={item.longDesc}
    />
  ))}
</div>

<Link
  href="/?service=service01#contacto"
  className="primaryBtn"
>
  {t.services.commonButton}
</Link>
  </div>

  <div className="serviceVisual">
    <Image
      src="/services/Services_1.1.png"
      alt="service01"
      fill
      className="serviceImg"
    />
  </div>

</div>

{/* SERVICE 02 */}

<div id="service02" className="serviceRow reverse consultoriaSection">

  <div className="serviceText">

<span className="miniTag">02</span>

<h2>{t.services.service02.title}</h2>

<p>{t.services.service02.description}</p>

<div className="serviceExpand">
  {service02Items.map((item, idx) => (
    <AccordionItem
      key={idx}
      index={idx}
      title={item.title}
      shortDesc={item.shortDesc}
      longDesc={item.longDesc}
    />
  ))}
</div>

<Link
  href="/?service=service02#contacto"
  className="primaryBtn"
>
  {t.services.commonButton}
</Link>
</div>
  <div className="serviceVisual">
    <Image
      src="/services/Imagen_3.2.png"
      alt="service02"
      fill
      className="serviceImg"
    />
  </div>

</div>

{/* SERVICE 03 */}

<div id="service03" className="serviceRow">

  <div className="serviceText">
<span className="miniTag">03</span>

<h2>{t.services.service03.title}</h2>

<p>{t.services.service03.description}</p>

<div className="serviceExpand">
  {service03Items.map((item, idx) => (
    <AccordionItem
      key={idx}
      index={idx}
      title={item.title}
      shortDesc={item.shortDesc}
      longDesc={item.longDesc}
    />
  ))}
</div>

<Link
 href="/?service=service03#contacto"
  className="primaryBtn"
>
  {t.services.commonButton}
</Link>
  </div>

  <div className="serviceVisual">
    <Image
      src="/services/Imagen 3.3.png"
      alt="service03"
      fill
      className="serviceImg"
    />
  </div>

</div>

{/* SERVICE 04 */}

<div id="service04" className="serviceRow reverse consultoriaSection">

  <div className="serviceText">

<span className="miniTag">04</span>

<h2>{t.services.service04.title}</h2>

<p>{t.services.service04.description}</p>

<div className="serviceExpand">
  {service04Items.map((item, idx) => (
    <AccordionItem
      key={idx}
      index={idx}
      title={item.title}
      shortDesc={item.shortDesc}
      longDesc={item.longDesc}
    />
  ))}
</div>

<Link
  href="/?service=service04#contacto"
  className="primaryBtn"
>
  {t.services.commonButton}
</Link>
  </div>

  <div className="serviceVisual">
    <Image
      src="/services/Imagen_3.4.png"
      alt="service04"
      fill
      className="serviceImg"
    />
  </div>

</div>

{/* SERVICE 05 */}

<div id="service05" className="serviceRow">

  <div className="serviceText">
<span className="miniTag">05</span>

<h2>{t.services.service05.title}</h2>

<p>{t.services.service05.description}</p>

<div className="serviceExpand">
  {service05Items.map((item, idx) => (
    <AccordionItem
      key={idx}
      index={idx}
      title={item.title}
      shortDesc={item.shortDesc}
      longDesc={item.longDesc}
    />
  ))}
</div>

<Link
  href="/?service=service05#contacto"
  className="primaryBtn"
>
  {t.services.commonButton}
</Link>
  </div>

  <div className="serviceVisual">
    <Image
      src="/services/Services 3.5.png"
      alt="service05"
      fill
      className="serviceImg"
    />
  </div>

</div>

{/* SERVICE 06 */}

<div id="service06" className="serviceRow reverse consultoriaSection">

  <div className="serviceText">
<span className="miniTag">06</span>

<h2>{t.services.service06.title}</h2>

<p>{t.services.service06.description}</p>

<div className="serviceExpand">
  {service06Items.map((item, idx) => (
    <AccordionItem
      key={idx}
      index={idx}
      title={item.title}
      shortDesc={item.shortDesc}
      longDesc={item.longDesc}
    />
  ))}
</div>

<Link
  href="/?service=service06#contacto"
  className="primaryBtn"
>
  {t.services.commonButton}
</Link>
  </div>

  <div className="serviceVisual">
    <Image
      src="/services/Services 3.6.png"
      alt="service06"
      fill
      className="serviceImg"
    />
  </div>

</div>

{/* SERVICE 07 */}

<div id="service07" className="serviceRow">

  <div className="serviceText">
<span className="miniTag">07</span>

<h2>{t.services.service07.title}</h2>

<p>{t.services.service07.description}</p>

<div className="serviceExpand">
  {service07Items.map((item, idx) => (
    <AccordionItem
      key={idx}
      index={idx}
      title={item.title}
      shortDesc={item.shortDesc}
      longDesc={item.longDesc}
    />
  ))}
</div>

<Link
  href="/?service=service07#contacto"
  className="primaryBtn"
>
  {t.services.commonButton}
</Link>
  </div>

  <div className="serviceVisual">
    <Image
      src="/services/Services 3.7.png"
      alt="service07"
      fill
      className="serviceImg"
    />
  </div>

</div>

{/* SERVICE 08 CTA */}

<section id="service08" className="servicesFinalCta servicesFinalCtaWithImage">

  <div className="servicesFinalCtaVisual">
    <Image
      src="/services/Imagen 3.8.png"
      alt="service08"
      fill
      className="serviceImg"
    />
  </div>

  <div className="servicesFinalCtaContent">

<span className="miniTag">08</span>

  <h2>{t.services.cta.title}</h2>

  <p>{t.services.cta.description}</p>

  <Link
    href="/#contacto"
    className="primaryBtn"
  >
    {t.services.cta.button}
  </Link>
  </div>
</section>
</section>
    </main>
  );
}
