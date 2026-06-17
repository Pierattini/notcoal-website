'use client';

import { useState } from 'react';
import PhoneInput, {
  type Country,
  getCountryCallingCode,
  isValidPhoneNumber
} from 'react-phone-number-input';
import { useLanguage } from "@/context/LanguageContext";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import HeroBadge from "@/components/ui/HeroBadge";

const meetingSlots = ["17:00", "18:00", "19:00", "20:00"];

function getCountryDisplayName(country?: Country) {
  if (!country) {
    return "";
  }

  return new Intl.DisplayNames(["en"], { type: "region" }).of(country) || country;
}

function getCountryDialCode(country?: Country) {
  return country ? `+${getCountryCallingCode(country)}` : "";
}

function isAllowedMeetingDate(dateValue: string) {
  if (!dateValue) {
    return true;
  }

  const day = new Date(`${dateValue}T12:00:00`).getDay();
  return day >= 1 && day <= 4;
}

function ContactSectionContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  const selectedService =
  searchParams.get("service") || "service01";
  const [formData, setFormData] = useState<{
    nombre: string;
    email: string;
    telefono: string;
    empresa: string;
    service: string;
    mensaje: string;
    archivos: File[];
    aceptaPrivacidad: boolean;
    wantsMeeting: boolean;
    meetingDate: string;
    meetingTime: string;
    country_name: string;
    country_code: string;
    
  }>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    service: selectedService,
    mensaje: '',
    archivos: [],
    aceptaPrivacidad: false,
    wantsMeeting: false,
    meetingDate: '',
    meetingTime: '',
    country_name: '',
    country_code: ''
  });

  const [enviando, setEnviando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [phoneCountry, setPhoneCountry] = useState<Country>("ES");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (value?: string) => {
    setFormData(prev => ({
      ...prev,
      telefono: value || "",
      country_name: getCountryDisplayName(phoneCountry),
      country_code: getCountryDialCode(phoneCountry)
    }));
  };

  const handlePhoneCountryChange = (country?: Country) => {
    setPhoneCountry(country || "ES");
    setFormData(prev => ({
      ...prev,
      country_name: getCountryDisplayName(country),
      country_code: getCountryDialCode(country)
    }));
  };
  
  const handleCheckboxChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  setFormData(prev => ({
    ...prev,
    aceptaPrivacidad: e.target.checked
  }));
};

  const handleMeetingCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = e.target.checked;

    setFormData(prev => ({
      ...prev,
      wantsMeeting: isChecked,
      meetingDate: isChecked ? prev.meetingDate : '',
      meetingTime: isChecked ? prev.meetingTime : ''
    }));
  };

  const handleMeetingDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    if (!isAllowedMeetingDate(value)) {
      e.target.setCustomValidity("Please select Monday, Tuesday, Wednesday or Thursday.");
      e.target.reportValidity();
      return;
    }

    e.target.setCustomValidity("");
    setFormData(prev => ({
      ...prev,
      meetingDate: value
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    setFormData(prev => ({
      ...prev,
      archivos: files
    }));
  };

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setEnviando(true);

  try {
    const formDataObj = new FormData();

    formDataObj.append('nombre', formData.nombre);
    formDataObj.append('email', formData.email);
    formDataObj.append('telefono', formData.telefono);
    formDataObj.append('empresa', formData.empresa);
    formDataObj.append('service', formData.service);
    formDataObj.append('mensaje', formData.mensaje);
    formDataObj.append('country_name', formData.country_name);
    formDataObj.append('country_code', formData.country_code);
    formDataObj.append('wants_meeting', formData.wantsMeeting ? 'Yes' : 'No');
    formDataObj.append('meeting_date', formData.wantsMeeting ? formData.meetingDate : '');
    formDataObj.append('meeting_time', formData.wantsMeeting ? formData.meetingTime : '');

    formData.archivos.forEach((file, index) => {
      formDataObj.append(`archivo_${index}`, file);
    });

      const response = await fetch('/api/contacto', {
        method: 'POST',
        body: formDataObj
      });

      if (response.ok) {
        setShowSuccessModal(true);
        setMensajeExito('✓ ¡Consulta enviada exitosamente! Recibirás confirmación en tu email en los próximos minutos.');
        setMensajeError('');
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          empresa: '',
          service: selectedService,
          mensaje: '',
          archivos: [],
          aceptaPrivacidad: false,
          wantsMeeting: false,
          meetingDate: '',
          meetingTime: '',
          country_name: '',
          country_code: ''
        });
        setPhoneCountry("ES");

        setTimeout(() => setMensajeExito(''), 6000);
      } else {
        const errorData = await response.json();
        setMensajeError(`❌ ${errorData.error || 'Error al enviar la consulta. Por favor intenta de nuevo.'}`);
        setTimeout(() => setMensajeError(''), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setMensajeError('❌ Error de conexión. Verifica tu conexión a internet e intenta de nuevo.');
      setTimeout(() => setMensajeError(''), 5000);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section
      id="contacto"
      className="contactSection"
    >

      <div className="contactHeader">

        <HeroBadge text={t.contact.badge} />

        <h2>
          {t.contact.title}
        </h2>

        <p>
          {t.contact.description}
        </p>

      </div>

      <div className="contactLayout">

        <div className="contactCards">

  <div className="contactInfoPanel">

    <span className="contactMiniBadge">
      {t.contact.whyChooseUsTitle}
    </span>

    <ul className="whyChooseList">
      {t.contact.whyChooseUsItems.map(
        (item: string, index: number) => (
          <li key={index}>
            {item}
          </li>
        )
      )}
    </ul>

    <div className="contactDivider"></div>

    <span className="contactMiniBadge">
      {t.contact.contactInfoTitle}
    </span>

    <div className="contactItem">
      <small>{t.contact.emailLabel}</small>
      <strong>{t.contact.email}</strong>
    </div>

    <div className="contactItem">
      <small>{t.contact.phoneLabel}</small>
      <strong>{t.contact.phone}</strong>
    </div>

    <div className="contactItem">
      <small>{t.contact.locationLabel}</small>
      <strong>{t.contact.location}</strong>
    </div>

    <div className="contactItem">
      <small>{t.contact.responseLabel}</small>
      <strong>{t.contact.response}</strong>
    </div>

    <a
      href="#"
      className="linkedinButton"
    >
      {t.contact.linkedinText}
    </a>

  </div>

</div>

        <form className="premiumForm" onSubmit={handleSubmit}>

          {mensajeExito && (
            <div style={{
              background: 'var(--color-green)',
              color: 'white',
              padding: '16px 20px',
              borderRadius: '12px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 500,
              border: '1px solid rgba(29,82,72,0.3)',
              boxShadow: '0 4px 12px rgba(29,82,72,0.15)'
            }}>
              {mensajeExito}
            </div>
          )}

          {mensajeError && (
            <div style={{
              background: 'rgba(255, 99, 99, 0.98)',
              color: 'white',
              padding: '16px 20px',
              borderRadius: '12px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 500,
              border: '1px solid rgba(255, 99, 99, 0.3)',
              boxShadow: '0 4px 12px rgba(255, 99, 99, 0.15)'
            }}>
              {mensajeError}
            </div>
          )}

          <div style={{
            background: 'rgba(29,82,72,0.1)',
            border: '1px solid rgba(14, 165, 233, 0.3)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            fontSize: '13px',
            color: 'var(--text-secondary)'
          }}>
            <span style={{ color: 'var(--color-green)', fontWeight: 600 }}>*</span> Campos obligatorios
          </div>

          <div className="formGrid">

            <div className="inputGroup">
              <label><span style={{ color: 'rgba(255, 99, 99, 1)', marginRight: '4px' }}>*</span>Nombre completo</label>
              <input
                type="text"
                name="nombre"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="inputGroup">
              <label><span style={{ color: 'rgba(255, 99, 99, 1)', marginRight: '4px' }}>*</span>Email</label>
              <input
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="inputGroup">
              <label><span style={{ color: 'rgba(255, 99, 99, 1)', marginRight: '4px' }}>*</span>Teléfono</label>
              <PhoneInput
                className="phoneInputControl"
                name="telefono"
                defaultCountry="ES"
                international
                countryCallingCodeEditable={false}
                placeholder="+34 600 000 000"
                value={formData.telefono}
                onChange={handlePhoneChange}
                onCountryChange={handlePhoneCountryChange}
                aria-invalid={formData.telefono ? !isValidPhoneNumber(formData.telefono) : undefined}
                required
              />
              <input
                type="hidden"
                name="country_name"
                value={formData.country_name}
              />
              <input
                type="hidden"
                name="country_code"
                value={formData.country_code}
              />
            </div>

            <div className="inputGroup">
              <label><span style={{ color: 'rgba(255, 99, 99, 1)', marginRight: '4px' }}>*</span>Empresa</label>
              <input
                type="text"
                name="empresa"
                placeholder="Nombre de tu empresa"
                value={formData.empresa}
                onChange={handleInputChange}
                required
              />
            </div>

          </div>
<div className="inputGroup">
  <label>
    <span style={{
      color: 'rgba(255, 99, 99, 1)',
      marginRight: '4px'
    }}>
      *
    </span>
    Service Required
  </label>

  <select
  name="service"
  className="serviceSelect"
  value={formData.service}
  onChange={handleInputChange}
>
  <option value="service01">{t.contact.services.service01}</option>
  <option value="service02">{t.contact.services.service02}</option>
  <option value="service03">{t.contact.services.service03}</option>
  <option value="service04">{t.contact.services.service04}</option>
  <option value="service05">{t.contact.services.service05}</option>
  <option value="service06">{t.contact.services.service06}</option>
  <option value="service07">{t.contact.services.service07}</option>
  <option value="service08">{t.contact.services.service08}</option>
</select>
</div>
          <div className="meetingRequestBlock">
            <label className="meetingRequestToggle">
              <input
                type="checkbox"
                checked={formData.wantsMeeting}
                onChange={handleMeetingCheckboxChange}
              />
              <span>Request a Meeting</span>
            </label>

            {formData.wantsMeeting && (
              <div className="meetingFields">
                <div className="inputGroup">
                  <label>Preferred Meeting Date</label>
                  <input
                    type="date"
                    name="meetingDate"
                    value={formData.meetingDate}
                    onChange={handleMeetingDateChange}
                    required={formData.wantsMeeting}
                  />
                </div>

                <div className="inputGroup">
                  <label>Preferred Meeting Time</label>
                  <select
                    name="meetingTime"
                    className="serviceSelect"
                    value={formData.meetingTime}
                    onChange={handleInputChange}
                    required={formData.wantsMeeting}
                  >
                    <option value="">Select a time slot</option>
                    {meetingSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="inputGroup">
            <label><span style={{ color: 'rgba(255, 99, 99, 1)', marginRight: '4px' }}>*</span>Mensaje</label>
            <textarea
              name="mensaje"
              placeholder="Cuéntanos sobre tu proyecto..."
              value={formData.mensaje}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label>Archivos e Imágenes (Opcional)</label>
            <div
              style={{
                border: '2px dashed rgba(29,82,72,0.5)',
                borderRadius: '12px',
                padding: '8px 12px',
                textAlign: 'center',
                background: 'rgba(29,82,72,0.03)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                height: formData.archivos.length === 0 ? '84px' : 'auto',
                minHeight: formData.archivos.length === 0 ? 'auto' : '84px'
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.style.background = 'rgba(14, 165, 233, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.8)';
              }}
              onDragLeave={(e) => {
                e.currentTarget.style.background = 'rgba(14, 165, 233, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.5)';
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.style.background = 'rgba(14, 165, 233, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.5)';
                const files = Array.from(e.dataTransfer.files || []);
                setFormData(prev => ({
                  ...prev,
                  archivos: files
                }));
              }}
            >
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                style={{
                  position: 'absolute',
                  opacity: 0,
                  width: '100%',
                  height: '84px',
                  cursor: 'pointer',
                  left: 0,
                  top: 0
                }}
              />
              <div style={{
                pointerEvents: formData.archivos.length === 0 ? 'none' : 'auto',
                height: formData.archivos.length === 0 ? '100%' : 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {formData.archivos.length === 0 ? (
                  <>
                    <p style={{ color: 'var(--color-green)', fontWeight: 600, margin: '0 0 6px 0', fontSize: '13px' }}>
                      Arrastra archivos aquí o haz clic
                    </p>
                    <small style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                      Imágenes, PDF, Word, Excel
                    </small>
                  </>
                ) : (
                  <>
                    <p style={{ color: 'var(--color-green)', fontWeight: 600, margin: '0 0 8px 0', fontSize: '13px' }}>
                      ✓ {formData.archivos.length} archivo(s)
                    </p>
                    <div style={{ marginTop: '8px', width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {Array.from(formData.archivos).map((file, idx) => (
                        <div
                          key={idx}
                          className="uploadedFileCard"
                          style={{
                            fontSize: '12px',
                            color: 'rgba(245,243,239,0.94)',
                            padding: '10px 12px',
                            background: 'rgba(245,243,239,0.10)',
                            border: '1px solid rgba(245,243,239,0.14)',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '12px',
                            minWidth: 0
                          }}
                        >
                          <span className="uploadedFileInfo">
                            <span className="uploadedFileIcon" aria-hidden="true">📄</span>
                            <span className="uploadedFileMeta">
                              <strong>{file.name}</strong>
                              <small>
                                {(file.size / 1024).toFixed(1)} KB
                              </small>
                            </span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              const newFiles = Array.from(formData.archivos).filter((_, i) => i !== idx);
                              setFormData(prev => ({
                                ...prev,
                                archivos: newFiles
                              }));
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'rgba(255, 99, 99, 1)',
                              cursor: 'pointer',
                              fontSize: '12px',
                              padding: '0 4px',
                              flexShrink: 0
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
<div
  style={{
    marginTop: '28px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    color: '#cbd5e1',
    fontSize: '13px'
  }}
>
  <input
    type="checkbox"
    checked={formData.aceptaPrivacidad}
    onChange={handleCheckboxChange}
    required
    style={{
      marginTop: '3px'
    }}
  />

  <span>
    He leído y acepto la{" "}
    <a
      href="/politica-privacidad"
      target="_blank"
      style={{
        color: 'var(--color-green)',
        textDecoration: 'underline'
      }}
    >
      Política de Privacidad
    </a>{" "}
    y el tratamiento de mis datos personales.
  </span>
</div>
          <button 
            type="submit"
            disabled={enviando}
            style={{
              marginTop: '24px',
              opacity: enviando ? 0.6 : 1,
              cursor: enviando ? 'not-allowed' : 'pointer'
            }}
          >
            {enviando ? 'Enviando...' : 'Enviar Consulta →'}
          </button>

        </form>

      </div>

      {showSuccessModal && (
        <div
          className="successModalOverlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="successModalTitle"
        >
          <div className="successModal">
            <button
              type="button"
              className="successModalClose"
              onClick={() => setShowSuccessModal(false)}
              aria-label={t.contact.successModal.closeLabel}
            >
              ×
            </button>

            <h3 id="successModalTitle">
              {t.contact.successModal.title}
            </h3>

            <p>
              {t.contact.successModal.description}
            </p>

            <div className="successModalActions">
              <a href="/projects">
                {t.contact.successModal.projectsLink}
              </a>

              <a href="/services">
                {t.contact.successModal.servicesLink}
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
export default function ContactSection() {
  return (
    <Suspense fallback={null}>
      <ContactSectionContent />
    </Suspense>
  );
}
