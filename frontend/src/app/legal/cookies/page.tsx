export default function CookiesPage() {
  return (
    <main className="legalPage">
      <section className="legalHero">
        <div className="legalContainer">
          <span className="sectionBadge">Cookies</span>
          <h1>Política de Cookies</h1>
          <p>Consulta cómo utilizamos cookies y cómo puedes configurar tus preferencias de forma segura y conforme al RGPD.</p>
        </div>
      </section>

      <section className="legalSection">
        <div className="legalContainer">
          <h2>¿Qué son las cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que se almacenan en tu navegador para mejorar la navegación y ofrecerte una experiencia personalizada.</p>

          <h3>Categorías de cookies</h3>
          <ul>
            <li><strong>Necesarias:</strong> imprescindibles para el funcionamiento del sitio.</li>
            <li><strong>Analíticas:</strong> recogen datos anónimos para medir el rendimiento y mejorar el servicio.</li>
            <li><strong>Marketing:</strong> permiten personalizar la publicidad y promociones según tus intereses.</li>
          </ul>

          <h3>Gestión de consentimiento</h3>
          <p>Nuestro banner de cookies te permite aceptar todas las cookies, rechazar las no esenciales o configurar tus preferencias en cualquier momento.</p>
        </div>
      </section>
    </main>
  );
}
