"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <main className="legalPage">
      <section className="legalHero">
        <div className="legalContainer">
          <span className="sectionBadge">{t.legalPages.privacy.badge}</span>
          <h1>{t.legalPages.privacy.title}</h1>
          <p>
            {t.legalPages.privacy.description}
          </p>
        </div>
      </section>

      <section className="legalSection">
        <div className="legalContainer legalDocument">
          <p>
            Consideramos que la privacidad de nuestros usuarios debe ser primordial. Por esta razón aplicamos una política de transparencia en todos nuestros procesos, para que los usuarios estén siempre informados y mantengan el control sobre sus datos personales.
          </p>

          <p>
            A través de este sitio web no se recaban datos de carácter personal de los usuarios sin su conocimiento, ni se ceden a terceros fuera de los supuestos necesarios para prestar servicios, cumplir obligaciones legales o gestionar solicitudes realizadas por los propios usuarios.
          </p>

          <h2>¿Quién es el responsable del tratamiento de sus datos?</h2>
          <p>
            En cumplimiento del Reglamento (UE) 2016/679, Reglamento General de Protección de Datos, y de la normativa aplicable en materia de protección de datos personales, se informa de que la presente página web es titularidad de:
          </p>

          <div className="legalInfoCard">
            <p><strong>Entidad:</strong> TheNotCoalCompany OÜ</p>
            <p><strong>Registry code:</strong> 17503248</p>
            <p><strong>VAT number:</strong> EE 102984561</p>
            <p><strong>Domicilio:</strong> Tööstuse 75-71, Tallinn, Estonia, 10416</p>
            <p><strong>Teléfono:</strong> <a href="tel:+34611354698">+34 611 354 698</a></p>
            <p><strong>Email:</strong> <a href="mailto:hi@notcoal.eu">hi@notcoal.eu</a></p>
          </div>

          <p>
            En adelante, el “WEBSITE”.
          </p>

          <h2>Marco normativo</h2>
          <p>
            El WEBSITE garantiza el respeto de las garantías, normas y procedimientos previstos en el ordenamiento jurídico aplicable para proteger los derechos a la intimidad, privacidad y protección de datos personales.
          </p>
          <ul>
            <li>Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos.</li>
            <li>Normativa nacional aplicable en materia de protección de datos y servicios de la sociedad de la información.</li>
            <li>Principios aplicables en el Espacio Económico Europeo (EEA) y, cuando corresponda, en Suiza.</li>
          </ul>

          <h2>Mantenga el control sobre sus datos</h2>
          <p>
            Los datos de carácter personal que se pudieran recabar serán tratados de forma confidencial y quedarán incorporados a la correspondiente actividad de tratamiento titularidad del WEBSITE.
          </p>
          <p>
            La recopilación y el uso de datos es esencial para poder ofrecer nuestros servicios. Sin embargo, solo solicitaremos información adecuada, pertinente y limitada a lo necesario para las finalidades descritas en esta política.
          </p>

          <h2>Datos que podemos solicitar</h2>
          <p>
            En función del uso que realice del WEBSITE, podemos solicitar o recibir los siguientes datos:
          </p>
          <ul>
            <li><strong>Datos de contacto:</strong> nombre, apellidos, email, teléfono, empresa y país.</li>
            <li><strong>Datos profesionales:</strong> empresa, cargo, proyecto, servicio solicitado y contenido de la consulta.</li>
            <li><strong>Datos de reuniones:</strong> preferencia de fecha, hora y disponibilidad cuando el usuario solicite una reunión.</li>
            <li><strong>Archivos aportados voluntariamente:</strong> documentación técnica, imágenes, PDFs u otros archivos enviados a través del formulario.</li>
            <li><strong>Datos tecnológicos:</strong> dirección IP, tipo de dispositivo, navegador, sistema operativo, preferencias de idioma, páginas visitadas y datos derivados de cookies consentidas.</li>
          </ul>

          <h2>Finalidades del tratamiento</h2>
          <p>
            Los datos personales pueden ser tratados con las siguientes finalidades:
          </p>
          <ul>
            <li>Contestar consultas enviadas a través del formulario de contacto.</li>
            <li>Gestionar solicitudes de información sobre servicios de energía renovable, Solar PV, BESS, EPC, consultoría o desarrollo estratégico.</li>
            <li>Organizar reuniones solicitadas por el usuario.</li>
            <li>Gestionar comunicaciones comerciales cuando exista consentimiento o interés legítimo aplicable.</li>
            <li>Mejorar la experiencia de usuario del WEBSITE.</li>
            <li>Mantener la seguridad del WEBSITE, detectar actividad maliciosa y prevenir fraude.</li>
            <li>Cumplir obligaciones legales, administrativas o regulatorias.</li>
          </ul>

          <h2>Legitimación para el tratamiento</h2>
          <p>
            La base jurídica para el tratamiento de datos puede ser:
          </p>
          <ul>
            <li><strong>Consentimiento:</strong> cuando el usuario facilita voluntariamente sus datos o acepta cookies opcionales.</li>
            <li><strong>Ejecución de medidas precontractuales o contractuales:</strong> cuando el tratamiento sea necesario para gestionar una solicitud, propuesta o relación profesional.</li>
            <li><strong>Interés legítimo:</strong> para responder consultas empresariales, proteger la seguridad del sitio y mantener comunicaciones profesionales razonables.</li>
            <li><strong>Obligación legal:</strong> cuando sea necesario conservar o comunicar información por exigencia normativa.</li>
          </ul>

          <h2>Plazo de conservación</h2>
          <p>
            Conservaremos los datos personales durante el tiempo necesario para atender la finalidad para la que fueron recabados. En general, los datos asociados a consultas se conservarán mientras sea necesario para gestionar la solicitud y, posteriormente, durante los plazos legales aplicables o para la defensa de posibles reclamaciones.
          </p>
          <p>
            Los datos tratados con fines comerciales se conservarán mientras el usuario no solicite su supresión u oposición. Los datos vinculados a cookies se conservarán según la duración indicada en la configuración del navegador o en la política de cookies.
          </p>

          <h2>Uso de la web por menores</h2>
          <p>
            La navegación en este WEBSITE por menores de edad exige que estos hayan obtenido previamente autorización de sus padres, tutores o representantes legales, quienes serán responsables del uso que los menores realicen del sitio.
          </p>

          <h2>Destinatarios y proveedores</h2>
          <p>
            Podemos utilizar terceros proveedores para ayudarnos a prestar nuestros servicios, tales como hosting, mantenimiento web, herramientas de email, formularios, almacenamiento, analítica consentida, seguridad o servicios profesionales. Dichos proveedores solo tendrán acceso a la información necesaria para ejecutar sus tareas y deberán tratarla conforme a instrucciones y obligaciones de confidencialidad.
          </p>
          <p>
            TheNotCoalCompany OÜ no alquilará ni venderá información personal, ni compartirá datos con anunciantes o redes publicitarias sin consentimiento explícito, salvo obligación legal, requerimiento administrativo o procedimiento judicial.
          </p>

          <h2>Transferencias internacionales de datos</h2>
          <p>
            No están previstas transferencias internacionales de datos fuera de las garantías legalmente aplicables. Si se utilizaran proveedores ubicados fuera del Espacio Económico Europeo o Suiza, se procurará aplicar mecanismos adecuados conforme al RGPD, como cláusulas contractuales tipo u otras garantías reconocidas.
          </p>

          <h2>Seguridad de los datos</h2>
          <p>
            El WEBSITE aplica medidas técnicas y organizativas apropiadas para proporcionar un nivel de seguridad adecuado al riesgo, procurando garantizar la confidencialidad, integridad y disponibilidad de los datos personales.
          </p>
          <p>
            Se utilizan mecanismos razonables de seguridad, mantenimiento técnico, actualización de software, protección frente a actividad maliciosa y medidas orientadas a preservar la resiliencia de los sistemas.
          </p>

          <h2>Consejos de navegación</h2>
          <ul>
            <li>Compruebe que accede al dominio correcto antes de introducir datos personales.</li>
            <li>No utilice enlaces recibidos por email, SMS o mensajería si sospecha que puedan ser fraudulentos.</li>
            <li>Actualice su navegador y sistema operativo para mejorar su seguridad.</li>
            <li>Revise la configuración de privacidad y cookies de su navegador.</li>
          </ul>

          <h2>¿Qué derechos tiene usted con respecto a sus datos?</h2>
          <p>
            Usted tiene derecho a conocer si el WEBSITE está tratando datos personales que le conciernen. Asimismo, puede solicitar el acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de sus datos, así como retirar el consentimiento cuando el tratamiento se base en este.
          </p>
          <p>
            Puede ejercer sus derechos contactando con TheNotCoalCompany OÜ a través de <a href="mailto:hi@notcoal.eu">hi@notcoal.eu</a>, indicando como asunto “Data Protection Rights” o “Derechos RGPD”, y aportando información suficiente para verificar su identidad.
          </p>

          <h2>Obligaciones del usuario</h2>
          <p>
            El usuario se compromete a garantizar la veracidad de los datos que facilite y a comunicar cualquier modificación. Cuando facilite datos de terceras personas, declara haber obtenido autorización suficiente y haber informado a dichas personas conforme a la normativa aplicable.
          </p>

          <h2>Comunicaciones comerciales</h2>
          <p>
            Usted puede optar por no recibir comunicaciones comerciales solicitándolo por email a <a href="mailto:hi@notcoal.eu">hi@notcoal.eu</a> con el asunto “No deseo recibir comunicaciones comerciales”.
          </p>

          <h2>Cookies</h2>
          <p>
            El WEBSITE puede utilizar cookies funcionales necesarias, cookies de idioma, cookies vinculadas a formularios de contacto y, si se implementan y usted lo consiente, cookies analíticas o de marketing. Puede consultar más información en nuestra{" "}
            <Link href="/cookies-policy">{t.legalLinks.cookiesPolicy}</Link>.
          </p>

          <h2>Contenido de la web y enlaces</h2>
          <p>
            Este WEBSITE puede contener enlaces a sitios web de terceros cuyas políticas de privacidad son ajenas a TheNotCoalCompany OÜ. Al acceder a dichos sitios, el usuario deberá revisar y decidir si acepta sus políticas de privacidad y cookies.
          </p>

          <h2>Propiedad intelectual e industrial</h2>
          <p>
            Los elementos que forman parte del WEBSITE, incluyendo textos, diseño, estructura, código, logotipos, marcas, imágenes y demás signos distintivos, son titularidad de TheNotCoalCompany OÜ o de sus colaboradores, salvo indicación contraria, y están protegidos por derechos de propiedad intelectual e industrial.
          </p>

          <h2>Responsabilidad</h2>
          <p>
            TheNotCoalCompany OÜ realiza esfuerzos razonables para mantener el WEBSITE actualizado, seguro y disponible, pero no garantiza la inexistencia absoluta de errores, interrupciones o incidencias técnicas. El acceso y uso del WEBSITE es responsabilidad del usuario.
          </p>

          <h2>Actualizaciones de esta política</h2>
          <p>
            Esta {t.legalLinks.privacyPolicy} podrá actualizarse periódicamente. Resultarán aplicables las condiciones publicadas en el momento de utilización del WEBSITE. Se recomienda revisar esta página de forma periódica para mantenerse informado.
          </p>

          <h2>Legislación aplicable</h2>
          <p>
            Esta política se interpretará conforme a la normativa de protección de datos aplicable en la Unión Europea, incluyendo el RGPD, y demás normas que resulten aplicables a TheNotCoalCompany OÜ.
          </p>
        </div>
      </section>
    </main>
  );
}
