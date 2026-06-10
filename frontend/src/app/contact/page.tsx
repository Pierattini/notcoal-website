"use client";

import { useState } from 'react';
export default function ContactPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [telefono, setTelefono] = useState("");
const [empresa, setEmpresa] = useState("");
const [servicio, setServicio] = useState("");

const [quiereReunion, setQuiereReunion] =
  useState(false);

const [fechaReunion, setFechaReunion] =
  useState("");

const [horarioReunion, setHorarioReunion] =
  useState("");
  const [countryCode, setCountryCode] =
  useState("");

const [countryName, setCountryName] =
  useState("");
  
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

        <form
  className="contactPageForm"
  onSubmit={async (e) => {
    e.preventDefault();

    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL;

    if (!apiBaseUrl) {
      throw new Error(
        "NEXT_PUBLIC_API_URL is not configured"
      );
    }

    await fetch(
      `${apiBaseUrl}/leads`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
  name: nombre,
  email: email,
  phone: telefono,
  company: empresa,
  message: mensaje,

  service: servicio,

  wants_meeting: quiereReunion,
  country_code: countryCode,
  country_name: countryName,
  meetingDate: fechaReunion,
  meetingSlot: horarioReunion,
}),
      }
    );

    alert("Consulta enviada");

    setNombre("");
    setEmail("");
    setMensaje("");
  }}
>

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

<input
  type="text"
  placeholder="Teléfono"
  value={telefono}
  onChange={(e) => setTelefono(e.target.value)}
/>

<input
  type="text"
  placeholder="Empresa"
  value={empresa}
  onChange={(e) => setEmpresa(e.target.value)}
/>

<input
  type="text"
  placeholder="Servicio"
  value={servicio}
  onChange={(e) => setServicio(e.target.value)}
/>

<input
  type="text"
  placeholder="Código País"
  value={countryCode}
  onChange={(e) => setCountryCode(e.target.value)}
/>

<input
  type="text"
  placeholder="País"
  value={countryName}
  onChange={(e) => setCountryName(e.target.value)}
/>
<input
  type="date"
  value={fechaReunion}
  onChange={(e) =>
    setFechaReunion(e.target.value)
  }
/>

<input
  type="text"
  placeholder="Horario reunión"
  value={horarioReunion}
  onChange={(e) =>
    setHorarioReunion(e.target.value)
  }
/>

<label>
  <input
    type="checkbox"
    checked={quiereReunion}
    onChange={(e) =>
      setQuiereReunion(e.target.checked)
    }
  />
  Solicitar reunión
</label>
<textarea
  placeholder="Mensaje"
  value={mensaje}
  onChange={(e) => setMensaje(e.target.value)}
/>

<button
  type="submit"
  className="contactSubmitButton"
>
  Enviar Consulta
</button>

        </form>

      </section>

    </main>
  );
}
