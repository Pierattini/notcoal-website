import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;
    const telefono = formData.get('telefono') as string;
    const empresa = formData.get('empresa') as string;
    const mensaje = formData.get('mensaje') as string;

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

for (const [key, value] of formData.entries()) {
  if (key.startsWith('archivo_')) {
    const file = value as File;

    if (file instanceof File) {
      const bytes = await file.arrayBuffer();

      attachments.push({
        filename: file.name,
        content: Buffer.from(bytes),
      });
    }
  }
}
    // Email al usuario (confirmación)
    const emailUsuario = {
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
    const emailEmpresa = {
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

    // Enviar emails
    await Promise.all([
      transporter.sendMail(emailUsuario),
      transporter.sendMail(emailEmpresa)
    ]);

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
