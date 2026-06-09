"use client";

import styles from "../AdminDashboard.module.css";
import { Lead } from "../_lib/types";
import { formatDate, formatMeeting, parseJsonList } from "../_lib/utils";

type LeadModalsProps = {
  messageLead: Lead | null;
  selectedLead: Lead | null;
  setMessageLead: (lead: Lead | null) => void;
  setSelectedLead: (lead: Lead | null) => void;
};

export function LeadModals({
  messageLead,
  selectedLead,
  setMessageLead,
  setSelectedLead,
}: LeadModalsProps) {
  return (
    <>
      {selectedLead && (
        <div className={styles.modalOverlay} onClick={() => setSelectedLead(null)}>
          <aside
            className={styles.sideModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.eyebrow}>Detalle de consulta</span>
                <h3>{selectedLead.name || "Lead sin nombre"}</h3>
              </div>
              <button type="button" onClick={() => setSelectedLead(null)}>
                ×
              </button>
            </div>

            <div className={styles.detailGrid}>
              <span>Email</span>
              <strong>{selectedLead.email || "-"}</strong>
              <span>Teléfono</span>
              <strong>{selectedLead.phone || "-"}</strong>
              <span>Empresa</span>
              <strong>{selectedLead.company || "-"}</strong>
              <span>País</span>
              <strong>{selectedLead.country_name || "-"}</strong>
              <span>Código País</span>
              <strong>{selectedLead.country_code || "-"}</strong>
              <span>Servicio</span>
              <strong>{selectedLead.service || "-"}</strong>
              <span>Reunión solicitada</span>
              <strong>{formatMeeting(selectedLead.wants_meeting)}</strong>
              <span>Fecha reunión</span>
              <strong>{selectedLead.meetingDate || "-"}</strong>
              <span>Horario reunión</span>
              <strong>{selectedLead.meetingSlot || "-"}</strong>
              <span>Fecha de creación</span>
              <strong>{formatDate(selectedLead.createdAt)}</strong>
            </div>

            <div className={styles.messageBox}>
              <span>Mensaje completo</span>
              <p>{selectedLead.message || "Sin mensaje."}</p>
            </div>

            <div className={styles.attachmentList}>
              <span>Archivos adjuntos</span>
              {parseJsonList(selectedLead.attachments).length ? (
                parseJsonList(selectedLead.attachments).map((file) => (
                  <strong key={file}>{file}</strong>
                ))
              ) : (
                <strong>Sin archivos adjuntos</strong>
              )}
            </div>
          </aside>
        </div>
      )}

      {messageLead && (
        <div className={styles.modalOverlay} onClick={() => setMessageLead(null)}>
          <div
            className={styles.centerModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>Mensaje de {messageLead.name || "lead"}</h3>
              <button type="button" onClick={() => setMessageLead(null)}>
                ×
              </button>
            </div>
            <div className={styles.messageBox}>
              <p>{messageLead.message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
