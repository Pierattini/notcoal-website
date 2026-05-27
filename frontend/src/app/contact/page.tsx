"use client";

import { useState } from 'react';
export default function ContactPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
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
  value={nombre}
  onChange={(e) => setNombre(e.target.value)}
/>

          <input
  type="email"
  placeholder="Correo"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

          <textarea
  placeholder="Mensaje"
  value={mensaje}
  onChange={(e) => setMensaje(e.target.value)}
/>

          <button
  type="submit"
  disabled={
    !nombre ||
    !email ||
    !mensaje
  }
  className={`
    contactSubmitButton
    ${
      !nombre ||
      !email ||
      !mensaje
        ? 'disabledButton'
        : ''
    }
  `}
>
  Enviar Consulta
</button>

        </form>

      </section>

    </main>
  );
}