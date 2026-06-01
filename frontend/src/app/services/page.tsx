"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

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

const solarItems = [
  {
    number: "01",
    title: "Evaluación Inicial",
    shortDesc: "Analizamos consumo energético, infraestructura y viabilidad solar.",
    longDesc:
      "Analizamos consumo energético, infraestructura, restricciones técnicas, interconexión y viabilidad financiera. Preparamos un plan con recomendaciones para maximizar producción y reducir costos."
  },
  {
    number: "02",
    title: "Diseño Estratégico",
    shortDesc: "Diseñamos una solución solar optimizada para máximo rendimiento energético.",
    longDesc:
      "Definimos layout, selección de módulos e inversores, estructura de soporte y cadenas eléctricas. Incluye modelado de rendimiento y una hoja de ruta para la implementación."
  },
  {
    number: "03",
    title: "Implementación",
    shortDesc: "Instalación profesional y monitoreo avanzado del sistema fotovoltaico.",
    longDesc:
      "Coordinamos ejecución, pruebas, comisionado y puesta en marcha. Entregamos supervisión remota y validación de performance para asegurar que el sistema opere según diseño."
  }
];

const consultoriaItems = [
  {
    number: "01",
    title: "Análisis Energético",
    shortDesc: "Evaluamos consumo, costos y eficiencia operativa de la empresa.",
    longDesc:
      "Realizamos auditorías técnicas, mediciones de energía y diagnósticos de rendimiento. Identificamos desviaciones, oportunidades de ahorro y riesgos de costos ocultos."
  },
  {
    number: "02",
    title: "Estrategia Corporativa",
    shortDesc: "Creamos planes de optimización y reducción de costos energéticos.",
    longDesc:
      "Diseñamos una hoja de ruta estratégica para integrar renovables, mejorar eficiencia y soportar metas ESG. Incluye análisis de viabilidad financiera y recomendaciones para emisiones."
  },
  {
    number: "03",
    title: "Optimización Continua",
    shortDesc: "Monitoreamos resultados y aplicamos mejoras constantes de rendimiento.",
    longDesc:
      "Implementamos KPIs y seguimiento de operaciones en tiempo real. Proponemos mejoras continuas, ajustes técnicos y acciones correctivas para sostener ahorros."
  }
];

const mantenimientoItems = [
  {
    number: "01",
    title: "Inspección Técnica",
    shortDesc: "Revisamos paneles, conexiones y rendimiento general de la instalación.",
    longDesc:
      "Ejecutamos inspecciones visuales y termográficas, pruebas eléctricas y chequeos de integridad. Detectamos fallas tempranas y riesgos de performance."
  },
  {
    number: "02",
    title: "Mantenimiento Preventivo",
    shortDesc: "Ejecutamos limpieza, calibración y optimización del sistema.",
    longDesc:
      "Programamos mantenimientos de alta precisión: limpieza, ajustes mecánicos y verificaciones eléctricas. Diseñamos intervenciones que prolongan la vida útil del activo."
  },
  {
    number: "03",
    title: "Monitoreo Avanzado",
    shortDesc: "Supervisión continua y soporte técnico especializado 24/7.",
    longDesc:
      "Activamos sistemas de telemetría y alertas con análisis de datos. Respondemos rápidamente a incidencias y optimizamos el rendimiento operativo."
  }
];

export default function ServicesPage() {
  return (
    <main className="servicesPage">

      {/* HERO */}
      <section className="servicesHero">

        <span className="sectionBadge">
          Soluciones Premium
        </span>

        <h1>
          Nuestros Servicios
        </h1>

        <p>
          Soluciones energéticas inteligentes para empresas,
          industrias y proyectos corporativos modernos.
        </p>

      </section>

      {/* STATS */}
      <section className="servicesStats">

        <div>
          <strong>500+</strong>
          <span>BW</span>
        </div>

        <div>
          <strong>98%</strong>
          <span>Eficiencia</span>
        </div>

        <div>
          <strong>100%</strong>
          <span>Soporte</span>
        </div>

      </section>

     {/* SERVICES */}
<section className="servicesShowcase">

{/* BLOQUE 1 */}
<div id="solar" className="serviceRow">

  <div className="serviceText">

    <span className="miniTag">
      Energía Solar
    </span>

    <h2>
      Instalación Solar
    </h2>

    <p>
      Diseñamos e implementamos sistemas solares
      de alto rendimiento para empresas modernas,
      industrias y proyectos corporativos.
    </p>

    <div className="serviceExpand">
      {solarItems.map((item, idx) => (
        <AccordionItem
          key={idx}
          index={idx}
          title={item.title}
          shortDesc={item.shortDesc}
          longDesc={item.longDesc}
        />
      ))}
    </div>

  </div>

  <div className="serviceVisual">
    <Image
    src="/services/hola.jpg"
    alt="hola"
    fill
    className="serviceImg"
  />
  </div>

</div>

  {/* BLOQUE 2 */}
<div id="consultoria" className="serviceRow reverse consultoriaSection">

  <div className="serviceText">

    <span className="miniTag">
      Consultoría
    </span>

    <h2>
      Consultoría Energética
    </h2>

    <p>
      Analizamos consumo, eficiencia y
      oportunidades de optimización energética
      para reducir costos operativos.
    </p>

    <div className="serviceExpand">
      {consultoriaItems.map((item, idx) => (
        <AccordionItem
          key={idx}
          index={idx}
          title={item.title}
          shortDesc={item.shortDesc}
          longDesc={item.longDesc}
        />
      ))}
    </div>

  </div>

  <div className="serviceVisual">
    <Image
      src="/services/consulting.jpg"
      alt="consulting"
      fill
      className="serviceImg"
    />
  </div>

</div>

  {/* BLOQUE 3 */}
<div id="mantenimiento" className="serviceRow">

  <div className="serviceText">

    <span className="miniTag">
      Soporte Técnico
    </span>

    <h2>
      Mantenimiento
    </h2>

    <p>
      Supervisión avanzada y mantenimiento
      preventivo para garantizar máxima
      eficiencia energética.
    </p>

    <div className="serviceExpand">
      {mantenimientoItems.map((item, idx) => (
        <AccordionItem
          key={idx}
          index={idx}
          title={item.title}
          shortDesc={item.shortDesc}
          longDesc={item.longDesc}
        />
      ))}
    </div>

  </div>

  <div className="serviceVisual">
      <Image
    src="/services/maintenance.jpg"
    alt="Maintenance"
    fill
    className="serviceImg"
  />
  </div>

</div>

</section>

    </main>
  );
}