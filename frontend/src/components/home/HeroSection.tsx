export default function HeroSection() {
  return (
    <section className="hero">
      <div className="heroContent">
        <span className="badge">Energía del Futuro</span>

        <h1>
          Potenciamos el <br />
          Futuro con <br />
          <span>Energía Sostenible</span>
        </h1>

        <p>
          Soluciones integrales de energía renovable para empresas y hogares.
          Lideramos la transición energética hacia un futuro más limpio,
          eficiente y sostenible.
        </p>

        <div className="heroActions">
          <a href="#contacto" className="primaryBtn">Solicitar Consulta</a>
          <a href="/projects" className="secondaryBtn">Ver Proyectos</a>
        </div>

        <div className="heroStats">

  <div className="statCard">
    <strong>500+</strong>
    <span>Proyectos Completados</span>
  </div>

  <div className="statCard">
    <strong>15+</strong>
    <span>Años de Experiencia</span>
  </div>

  <div className="statCard">
    <strong>98%</strong>
    <span>Satisfacción Cliente</span>
  </div>

</div>
      </div>

      <div className="heroShape" />
    </section>
  );
}