export default function ContactPage() {
  return (
    <main className="contactPage">

      <section className="contactHero">

        <span className="sectionBadge">
          Contacto
        </span>

        <h1>
          Hablemos de tu proyecto
        </h1>

        <p>
          Nuestro equipo responderá rápidamente.
        </p>

      </section>

      <section className="contactPageLayout">

        <div className="contactInfo">

          <div className="contactInfoCard">
            <strong>Email</strong>
            <span>contact@solar.com</span>
          </div>

          <div className="contactInfoCard">
            <strong>Teléfono</strong>
            <span>+34 600 000 000</span>
          </div>

          <div className="contactInfoCard">
            <strong>Ubicación</strong>
            <span>Valencia, España</span>
          </div>

        </div>

        <form className="contactPageForm">

          <input
            type="text"
            placeholder="Nombre"
          />

          <input
            type="email"
            placeholder="Correo"
          />

          <textarea
            placeholder="Mensaje"
          />

          <button>
            Enviar Consulta
          </button>

        </form>

      </section>

    </main>
  );
}