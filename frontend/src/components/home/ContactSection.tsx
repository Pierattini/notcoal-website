'use client';

import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState<{
    nombre: string;
    email: string;
    telefono: string;
    empresa: string;
    mensaje: string;
    archivos: File[];
    aceptaPrivacidad: boolean;
  }>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    mensaje: '',
    archivos: [],
    aceptaPrivacidad: false
  });

  const [enviando, setEnviando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
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
    formDataObj.append('mensaje', formData.mensaje);

    formData.archivos.forEach((file, index) => {
      formDataObj.append(`archivo_${index}`, file);
    });

      const response = await fetch('/api/contacto', {
        method: 'POST',
        body: formDataObj
      });

      if (response.ok) {
        setMensajeExito('✓ ¡Consulta enviada exitosamente! Recibirás confirmación en tu email en los próximos minutos.');
        setMensajeError('');
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          empresa: '',
          mensaje: '',
          archivos: [],
          aceptaPrivacidad: false
        });

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

        <span className="sectionBadge">
          Contacto
        </span>

        <h2>
          Hablemos de tu Proyecto
        </h2>

        <p>
          Estamos aquí para ayudarte a dar el paso
          hacia la energía renovable
        </p>

      </div>

      <div className="contactLayout">

        <div className="contactCards">

          <div className="contactCard">

            <div className="contactIcon">
              <Phone size={22} />
            </div>

            <div>
              <small>Teléfono</small>
              <strong>+34 900 123 456</strong>
            </div>

          </div>

          <div className="contactCard">

            <div className="contactIcon">
              <Mail size={22} />
            </div>

            <div>
              <small>Email</small>
              <strong>info@energytech.com</strong>
            </div>

          </div>

          <div className="contactCard">

            <div className="contactIcon">
              <MapPin size={22} />
            </div>

            <div>
              <small>Dirección</small>
              <strong>Barcelona, Spain</strong>
            </div>

          </div>

        </div>

        <form className="premiumForm" onSubmit={handleSubmit}>

          {mensajeExito && (
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '16px 20px',
              borderRadius: '12px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 500,
              border: '1px solid rgba(16, 185, 129, 0.3)',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
            }}>
              {mensajeExito}
            </div>
          )}

          {mensajeError && (
            <div style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              padding: '16px 20px',
              borderRadius: '12px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 500,
              border: '1px solid rgba(239, 68, 68, 0.3)',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)'
            }}>
              {mensajeError}
            </div>
          )}

          <div style={{
            background: 'rgba(14, 165, 233, 0.1)',
            border: '1px solid rgba(14, 165, 233, 0.3)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            fontSize: '13px',
            color: '#a0aec0'
          }}>
            <span style={{ color: '#0ea5e9', fontWeight: 600 }}>*</span> Campos obligatorios
          </div>

          <div className="formGrid">

            <div className="inputGroup">
              <label><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Nombre completo</label>
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
              <label><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Email</label>
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
              <label><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Teléfono</label>
              <input
                type="text"
                name="telefono"
                placeholder="+34 600 000 000"
                value={formData.telefono}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="inputGroup">
              <label><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Empresa</label>
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
            <label><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Mensaje</label>
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
                border: '2px dashed rgba(14, 165, 233, 0.5)',
                borderRadius: '12px',
                padding: '20px 16px',
                textAlign: 'center',
                background: 'rgba(14, 165, 233, 0.03)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                minHeight: 'auto'
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
                  height: '100%',
                  cursor: 'pointer',
                  left: 0,
                  top: 0
                }}
              />
              <div style={{ pointerEvents: 'none' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📎</div>
                {formData.archivos.length === 0 ? (
                  <>
                    <p style={{ color: '#0ea5e9', fontWeight: 600, margin: '0 0 4px 0', fontSize: '13px' }}>
                      Arrastra archivos aquí o haz clic
                    </p>
                    <small style={{ color: '#a0aec0', fontSize: '12px' }}>
                      Imágenes, PDF, Word, Excel
                    </small>
                  </>
                ) : (
                  <>
                    <p style={{ color: '#22c55e', fontWeight: 600, margin: '0 0 8px 0', fontSize: '13px' }}>
                      ✓ {formData.archivos.length} archivo(s)
                    </p>
                    <div style={{ marginTop: '8px' }}>
                      {Array.from(formData.archivos).map((file, idx) => (
                        <div
                          key={idx}
                          style={{
                            fontSize: '11px',
                            color: '#cbd5e1',
                            marginBottom: '4px',
                            padding: '6px 10px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '6px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <span>📄 {file.name}</span>
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
                              color: '#ef4444',
                              cursor: 'pointer',
                              fontSize: '12px',
                              padding: '0 4px'
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
    marginTop: '20px',
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
        color: '#0ea5e9',
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

    </section>
  );
}