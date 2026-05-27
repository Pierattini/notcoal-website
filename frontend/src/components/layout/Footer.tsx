export default function Footer() {
  return (
    <footer className="footer">

      <div className="footerIntro">
        <div className="footerBrand">
          <div className="footerLogoBox">N</div>
          <div className="footerBrandText">
            <strong>The Not Coal Company</strong>
            <p>Energía sostenible para un futuro mejor</p>
          </div>
        </div>

        <div className="footerContactMini">
          <div>
            <span>Email</span>
            <a href="mailto:hi@notcoal.eu">hi@notcoal.eu</a>
          </div>
          <div>
            <span>Teléfono</span>
            <a href="tel:+34900123456">+34 900 123 456</a>
          </div>
        </div>
      </div>

      <div className="footerSections">

        <div className="footerColumn">
          <h4>Servicios</h4>
          <a href="/services#solar">Energía Solar</a>
          <a href="/services#consultoria">Consultoría</a>
          <a href="/services#mantenimiento">Mantenimiento</a>
          <a href="/services">Todos los servicios</a>
        </div>

        <div className="footerColumn">
          <h4>Proyectos</h4>
          <a href="/projects">Todos los proyectos</a>
          <a href="/projects#proyectos">Casos de éxito</a>
          <a href="/projects#solar">Solar PV</a>
          <a href="/projects#bess">BESS</a>
        </div>

        <div className="footerColumn">
          <h4>Empresa</h4>
          <a href="/company#empresa">Sobre Nosotros</a>
          <a href="/company">Visión</a>
          <a href="/company">Equipo</a>
          <a href="/company">Cultura</a>
        </div>

        <div className="footerColumn contactColumn">
          <h4>Contacto</h4>
          <a href="mailto:hi@notcoal.eu">hi@notcoal.eu</a>
          <a href="tel:+34900123456">+34 900 123 456</a>
          <a href="/#contacto">Solicitar consulta</a>
          <div className="socialIcons">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="X">𝕏</a>
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="Email">✉</a>
          </div>
          <p className="contactHint">Redes sociales y teléfono listos para activar cuando tengas los enlaces definitivos.</p>
        </div>

      </div>

      <div className="footerBottom">

        <span>
          © 2026 EnergyTech. Todos los derechos reservados.
        </span>

        <div className="footerLinks">

          <a href="#">
            Privacidad
          </a>

          <a href="#">
            Términos
          </a>

        </div>

      </div>

    </footer>
  );
}