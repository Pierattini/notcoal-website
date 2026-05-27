import Image from "next/image";
export default function CompanyPage() {
  return (
    <main className="companyPage">

      {/* HERO */}

      <section className="companyHero">

  <div className="companyHeroOverlay"></div>

  <span className="sectionBadge">
    Sobre Nosotros
  </span>

  <h1>
    Ingeniería y ejecución
    para proyectos
    utility-scale PV y BESS
  </h1>

  <p>
    Diseñamos, desarrollamos y ejecutamos
    infraestructura energética renovable
    de alto rendimiento en toda Europa.
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

    <span>QUIÉNES SOMOS</span>

    <h2>
      No comenzamos desde cero.
    </h2>

    <p>
      Antes de The Not Coal Company, ya participábamos
      en algunos de los proyectos utility-scale más
      importantes de Europa, gestionando cientos de MW
      en mercados como Alemania, Países Bajos, Polonia,
      Grecia y los países nórdicos.
    </p>

    <p>
      Hemos trabajado donde los proyectos son complejos,
      los tiempos son ajustados y la ejecución realmente
      importa.
    </p>

  </div>

</section>

      {/* FRASE GRANDE */}

      <section className="companyStatement waveSection">

  <div className="companyStatementContent">

    <h2>
      Transformamos desafíos complejos
      de energía renovable en activos
      financiables, construibles y operativos.
    </h2>

  </div>

</section>

      {/* VALORES */}

      <section className="valuesSection">

        <div className="valueCard">
          <span>01</span>

          <h3>Ejecución antes que discurso</h3>

          <p>
            Los proyectos se entregan mediante
            decisiones, coordinación y responsabilidad.
          </p>
        </div>

        <div className="valueCard">
          <span>02</span>

          <h3>Ingeniería primero</h3>

          <p>
            Una buena ingeniería reduce retrasos,
            riesgos y costos innecesarios.
          </p>
        </div>

        <div className="valueCard">
          <span>03</span>

          <h3>Claridad en la complejidad</h3>

          <p>
            Simplificamos contratos, interfaces
            y decisiones técnicas que otros complican.
          </p>
        </div>

        <div className="valueCard">
          <span>04</span>

          <h3>Escala con disciplina</h3>

          <p>
            Los proyectos utility-scale requieren
            ambición, estructura y control.
          </p>
        </div>

      </section>
<section className="missionVision">

  <div className="missionBox">

    <small>MISIÓN</small>

    <h3>
      Ejecutar infraestructura energética
      renovable con precisión técnica,
      velocidad y visión comercial.
    </h3>

  </div>

  <div className="missionBox">

    <small>VISIÓN</small>

    <h3>
      Convertirnos en un referente europeo
      en proyectos utility-scale PV y BESS.
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

    <small>FOUNDER STORY</small>

<h2>
Liderazgo técnico con visión
de ejecución real.
</h2>

<p>
La experiencia detrás de The Not Coal Company
nace de años participando en proyectos
utility-scale en distintos mercados europeos,
combinando ingeniería, coordinación EPC
y desarrollo estratégico.
</p>

<div className="premiumNumbers">

  <div>
    <strong>500+ MW</strong>
    <span>Participación en proyectos energéticos</span>
  </div>

  <div>
    <strong>5+</strong>
    <span>Mercados europeos</span>
  </div>

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