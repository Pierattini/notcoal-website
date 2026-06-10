import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';
import { existsSync } from 'fs';
//import { writeFile, mkdir } from 'fs/promises';
//import { join } from 'path';
//import { existsSync } from 'fs';

// Configurar el transporte de email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const serviceLabels: Record<string, string> = {
  service01: '01 EPC Project Management',
  service02: '02 EPC Strategy and Partner Facilitation',
  service03: '03 Technical Advisory',
  service04: '04 Contract Strategy and Negotiation Support',
  service05: '05 Supplier and Specialist Network Coordination',
  service06: '06 Strategic Business Development & EPC Partnership Facilitation',
  service07: '07 Applied Innovation & Technology Integration',
  service08: '08 Not sure which service applies to your situation?'
};

const companyInfo = {
  name: 'TheNotCoalCompany OÜ',
  registryCode: '17503248',
  vatNumber: 'EE102984561',
  address: 'Tööstuse 75-71, Tallinn, Estonia 10416',
  phone: '+34 611 354 698',
  founder: 'Marisol Masella'
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function fieldRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 10px 0; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; width: 38%;">${label}</td>
      <td style="padding: 10px 0; color: #1f2933; font-size: 15px; font-weight: 700;">${value || 'Not provided'}</td>
    </tr>
  `;
}

function sectionTitle(title: string) {
  return `
    <h2 style="margin: 0 0 18px; color: #1d5248; font-size: 14px; letter-spacing: 0.16em; text-transform: uppercase;">
      ${title}
    </h2>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;
    const telefono = formData.get('telefono') as string;
    const empresa = formData.get('empresa') as string;
    const service = formData.get('service') as string;
    const mensaje = formData.get('mensaje') as string;
    const countryName = formData.get('country_name') as string;
    const countryCode = formData.get('country_code') as string;
    const wantsMeeting = formData.get('wants_meeting') === 'Yes';
    const meetingDate = formData.get('meeting_date') as string;
    const meetingTime = formData.get('meeting_time') as string;
    const serviceRequested = serviceLabels[service] || service || 'Not provided';
    const safeNombre = escapeHtml(nombre || '');
    const safeEmail = escapeHtml(email || '');
    const safeTelefono = escapeHtml(telefono || '');
    const safeEmpresa = escapeHtml(empresa || '');
    const safeCountryName = escapeHtml(countryName || '');
    const safeServiceRequested = escapeHtml(serviceRequested);
    const safeMensaje = escapeHtml(mensaje || '');
    const safeMeetingDate = escapeHtml(meetingDate || '');
    const safeMeetingTime = escapeHtml(meetingTime || '');
    const meetingRequestedLabel = wantsMeeting ? 'Yes' : 'No';
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || '').replace(/\/$/, '');
    const horizontalLogoUrl = siteUrl ? `${siteUrl}/logos/logofullt.png` : '';
    const fullLogoPath = path.join(process.cwd(), 'public', 'logos', 'logofullt.png');
    const inlineLogoAttachments = existsSync(fullLogoPath)
      ? [{
          filename: 'logofullt.png',
          path: fullLogoPath,
          cid: 'tncc-logo-full',
        }]
      : [];
    const emailLogoSrc =
      inlineLogoAttachments.length > 0
        ? 'cid:tncc-logo-full'
        : horizontalLogoUrl;

    // Validar datos requeridos
    if (!nombre || !email || !telefono || !empresa || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    /*

// Guardar archivos si existen
const uploadsDir = join(process.cwd(), 'public', 'uploads', 'consultas');
const archivosGuardados = [];

if (!existsSync(uploadsDir)) {
  await mkdir(uploadsDir, { recursive: true });
}

// Procesar archivos
for (const [key, value] of formData.entries()) {
  if (key.startsWith('archivo_')) {
    const file = value as File;

    if (file instanceof File) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const nombreArchivo = `${Date.now()}_${file.name}`;
      const rutaArchivo = join(uploadsDir, nombreArchivo);

      await writeFile(rutaArchivo, buffer);

      archivosGuardados.push({
        nombre: file.name,
        ruta: `/uploads/consultas/${nombreArchivo}`
      });
    }
  }
}

*/
const attachments = [];
const attachmentNames: string[] = [];

for (const [key, value] of formData.entries()) {
  if (key.startsWith('archivo_')) {
    const file = value as File;

    if (file instanceof File) {
      const bytes = await file.arrayBuffer();

      attachments.push({
        filename: file.name,
        content: Buffer.from(bytes),
      });
      attachmentNames.push(file.name);
    }
  }
}
    // Email al usuario (confirmación)
    const legacyEmailUsuario = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Confirmación de tu Consulta - The Not Coal Company',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: var(--color-green); padding: 40px 20px; text-align: center; color: white;">
            <h1 style="margin: 0;">The Not Coal Company</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Energía Renovable Sostenible</p>
          </div>
          
          <div style="padding: 40px 20px; background: var(--color-cream);">
            <h2 style="color: var(--color-graphite); margin-top: 0;">¡Hola ${nombre}!</h2>
            
            <p style="color: var(--text-secondary); line-height: 1.6;">
              Gracias por tu interés en The Not Coal Company. Hemos recibido tu consulta y nos pondremos en contacto contigo en las próximas 24-48 horas.
            </p>
            
            <div style="background: var(--color-cream); padding: 20px; border-radius: 8px; border-left: 4px solid var(--color-green); margin: 20px 0;">
              <h3 style="color: var(--color-graphite); margin-top: 0;">Datos de tu Consulta:</h3>
              <p style="margin: 8px 0;"><strong>Nombre:</strong> ${nombre}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 8px 0;"><strong>Teléfono:</strong> ${telefono}</p>
              <p style="margin: 8px 0;"><strong>Empresa:</strong> ${empresa}</p>
              <p style="margin: 8px 0;"><strong>Mensaje:</strong></p>
              <p style="margin: 8px 0; color: var(--text-secondary); white-space: pre-wrap;">${mensaje}</p>
              ${attachments.length > 0 ? `
  <p style="margin: 8px 0;">
    <strong>Archivos adjuntos:</strong> ${attachments.length}
  </p>
` : ''}
            </div>
            
            <p style="color: var(--text-secondary); line-height: 1.6;">
              Si tienes más preguntas o necesitas ayuda inmediata, no dudes en contactarnos:
            </p>
            
            <div style="background: var(--color-cream); padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 8px 0; color: var(--color-graphite);"><strong>📧 Email:</strong> hi@notcoal.eu</p>
              <p style="margin: 8px 0; color: var(--color-graphite);"><strong>📱 Teléfono:</strong> +34 900 123 456</p>
            </div>
            
            <p style="color: var(--text-secondary); font-size: 12px; margin-top: 30px;">
              Este es un email automático de confirmación. Por favor, no respondas a este correo.
            </p>
          </div>
        </div>
      `
    };

    // Email a la empresa
    const legacyEmailEmpresa = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `Nueva Consulta de ${nombre} - The Not Coal Company`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: var(--color-green); padding: 40px 20px; text-align: center; color: white;">
            <h1 style="margin: 0;">Nueva Consulta Recibida</h1>
          </div>
          
          <div style="padding: 40px 20px; background: var(--color-cream);">
            <h2 style="color: var(--color-graphite); margin-top: 0;">Datos del Contacto:</h2>
            
            <div style="background: var(--color-cream); padding: 20px; border-radius: 8px; border-left: 4px solid var(--color-green);">
              <p style="margin: 8px 0;"><strong>Nombre:</strong> ${nombre}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 8px 0;"><strong>Teléfono:</strong> ${telefono}</p>
              <p style="margin: 8px 0;"><strong>Empresa:</strong> ${empresa}</p>
              <p style="margin: 8px 0;"><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
            </div>
            
            <div style="background: var(--color-cream); padding: 20px; border-radius: 8px; margin-top: 20px;">
              <h3 style="color: var(--color-graphite); margin-top: 0;">Mensaje:</h3>
              <p style="color: var(--text-secondary); white-space: pre-wrap; line-height: 1.6;">${mensaje}</p>
            </div>
            
           ${attachments.length > 0 ? `
  <div style="background: var(--color-cream); padding: 20px; border-radius: 8px; margin-top: 20px;">
    <h3 style="color: var(--color-graphite); margin-top: 0;">
      Archivos Adjuntos (${attachments.length})
    </h3>

    <p style="color: var(--text-secondary);">
      Los archivos fueron enviados adjuntos en este correo.
    </p>
  </div>
` : ''}
          </div>
        </div>
     `,
attachments
};

    void legacyEmailUsuario;
    void legacyEmailEmpresa;

    const meetingSection = wantsMeeting ? `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 24px; background: #ffffff; border: 1px solid #e7e1d6; border-radius: 18px;">
        <tr>
          <td style="padding: 28px;">
            ${sectionTitle('Meeting Section')}
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              ${fieldRow('Meeting Requested', meetingRequestedLabel)}
              ${fieldRow('Preferred Date', safeMeetingDate)}
              ${fieldRow('Preferred Time', safeMeetingTime)}
              ${fieldRow('Duration', '1 hour')}
            </table>
            <p style="margin: 18px 0 0; padding: 16px; border-radius: 12px; background: #f5f3ef; color: #45524d; font-size: 14px; line-height: 1.7;">
              Prior to the meeting, a video conference link will be sent to the provided email address.
            </p>
          </td>
        </tr>
      </table>
    ` : '';

    const premiumEmailHtml = `
      <div style="margin: 0; padding: 0; background: #f5f3ef; font-family: Arial, Helvetica, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f5f3ef;">
          <tr>
            <td align="center" style="padding: 34px 18px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 760px; overflow: hidden; border-radius: 28px; background: #10251f; box-shadow: 0 28px 80px rgba(16,37,31,0.2);">
                <tr>
                  <td style="padding: 42px 38px 36px; text-align: center; background: #10251f;">
                    ${emailLogoSrc ? `<img src="${emailLogoSrc}" width="260" alt="The Not Coal Company" style="display: block; margin: 0 auto 22px; max-width: 260px; height: auto;">` : ''}
                    <h1 style="margin: 14px 0 0; color: #f5f3ef; font-size: 34px; line-height: 1.08; letter-spacing: 0.08em;">NEW CONTACT REQUEST</h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 34px; background: #f5f3ef;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #ffffff; border: 1px solid #e7e1d6; border-radius: 18px;">
                      <tr>
                        <td style="padding: 28px;">
                          ${sectionTitle('Contact Information')}
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            ${fieldRow('Name', safeNombre)}
                            ${fieldRow('Email', safeEmail)}
                            ${fieldRow('Phone', safeTelefono)}
                            ${fieldRow('Company', safeEmpresa)}
                            ${fieldRow('Country', safeCountryName)}
                          </table>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 24px; background: #ffffff; border: 1px solid #e7e1d6; border-radius: 18px;">
                      <tr>
                        <td style="padding: 28px;">
                          ${sectionTitle('Project Details')}
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            ${fieldRow('Service Requested', safeServiceRequested)}
                            ${fieldRow('Request Meeting', meetingRequestedLabel)}
                            ${!wantsMeeting ? `${fieldRow('Meeting Date', 'Not requested')}${fieldRow('Meeting Time', 'Not requested')}` : ''}
                          </table>
                          <div style="margin-top: 20px;">
                            <div style="margin-bottom: 10px; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em;">Client Message</div>
                            <div style="padding: 22px; border-left: 4px solid #1d5248; border-radius: 14px; background: #f5f3ef; color: #1f2933; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${safeMensaje}</div>
                          </div>
                          ${attachments.length > 0 ? `
                            <p style="margin: 18px 0 0; color: #45524d; font-size: 14px;">
                              Attached files: <strong>${attachments.length}</strong>
                            </p>
                          ` : ''}
                        </td>
                      </tr>
                    </table>

                    ${meetingSection}

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 24px; background: #10251f; border-radius: 18px;">
                      <tr>
                        <td style="padding: 30px;">
                          <div style="color: #d7c6a1; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;">Founder & Director</div>
                          <h2 style="margin: 10px 0 8px; color: #f5f3ef; font-size: 28px; line-height: 1.15;">Marisol Masella</h2>
                          <p style="margin: 0 0 18px; color: rgba(245,243,239,0.78); font-size: 14px; line-height: 1.7;">
                            10+ years &middot; 550+ MW delivered &middot; Solar PV &amp; BESS &middot; European markets
                          </p>
                          <div style="padding: 20px; border: 1px solid rgba(215,198,161,0.24); border-radius: 14px; background: rgba(245,243,239,0.06); color: #f5f3ef; font-size: 17px; line-height: 1.65; font-style: italic;">
                            "Today's energy transition needs people who understand both the megawatts and the contracts — and are willing to own the outcome."
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 32px 34px; background: #10251f; text-align: center;">
                    <p style="margin: 0 0 8px; color: #f5f3ef; font-size: 16px; font-weight: 700;">${companyInfo.name}</p>
                    <p style="margin: 0; color: rgba(245,243,239,0.72); font-size: 13px; line-height: 1.8;">
                      Registry code: ${companyInfo.registryCode}<br>
                      VAT: ${companyInfo.vatNumber}<br>
                      ${companyInfo.address}<br>
                      ${companyInfo.phone}
                    </p>
                    ${emailLogoSrc ? `<img src="${emailLogoSrc}" width="210" alt="The Not Coal Company" style="display: block; margin: 24px auto 0; max-width: 210px; height: auto;">` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `;

    const confirmationEmailHtml = `
      <div style="margin: 0; padding: 0; background: #f5f3ef; font-family: Arial, Helvetica, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f5f3ef;">
          <tr>
            <td align="center" style="padding: 34px 18px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; border-radius: 24px; overflow: hidden; background: #ffffff;">
                <tr>
                  <td style="padding: 36px 30px; text-align: center; background: #10251f;">
                    ${emailLogoSrc ? `<img src="${emailLogoSrc}" width="230" alt="The Not Coal Company" style="display: block; margin: 0 auto 18px; max-width: 230px; height: auto;">` : ''}
                    <h1 style="margin: 0; color: #f5f3ef; font-size: 28px;">Consulta enviada correctamente</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 34px 30px;">
                    <p style="margin: 0 0 18px; color: #1f2933; font-size: 17px; line-height: 1.7;">
                      Hola ${safeNombre},
                    </p>
                    <p style="margin: 0 0 22px; color: #45524d; font-size: 15px; line-height: 1.8;">
                      Gracias por contactarnos. Hemos recibido tu consulta y nos pondremos en contacto contigo lo antes posible.
                    </p>
                    <div style="padding: 20px; border-left: 4px solid #1d5248; border-radius: 14px; background: #f5f3ef;">
                      <p style="margin: 0 0 8px; color: #1f2933;"><strong>Service Requested:</strong> ${safeServiceRequested}</p>
                      <p style="margin: 0; color: #1f2933;"><strong>Request Meeting:</strong> ${meetingRequestedLabel}</p>
                    </div>
                    <p style="margin: 24px 0 0; color: #6b7280; font-size: 12px; line-height: 1.7;">
                      ${companyInfo.name} · ${companyInfo.address} · ${companyInfo.phone}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `;

    const emailUsuario = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Confirmation of your request - The Not Coal Company',
      html: confirmationEmailHtml,
      attachments: inlineLogoAttachments
    };

    const emailEmpresa = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `New Contact Request from ${safeNombre} - The Not Coal Company`,
      html: premiumEmailHtml,
      attachments: [
        ...inlineLogoAttachments,
        ...attachments
      ]
    };

    // Enviar emails
    await Promise.all([
      transporter.sendMail(emailUsuario),
      transporter.sendMail(emailEmpresa)
    ]);

    try {
      const apiBaseUrl =
        process.env.BACKEND_API_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:4000";

      await fetch(`${apiBaseUrl}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nombre,
          email,
          phone: telefono,
          company: empresa,
          message: mensaje,
          service: serviceRequested,
          wants_meeting: wantsMeeting,
          country_code: countryCode,
          country_name: countryName,
          meetingDate: meetingDate || null,
          meetingSlot: meetingTime || null,
          attachments: JSON.stringify(attachmentNames),
          status: "Nuevo",
        }),
      });
    } catch (leadError) {
      console.error("Error saving lead in admin backend:", leadError);
    }

    return NextResponse.json(
  {
    success: true,
    message: 'Consulta enviada correctamente'
  },
  { status: 200 }
);

  } catch (error) {
    console.error('Error en contacto:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
