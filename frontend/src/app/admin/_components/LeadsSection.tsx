"use client";

import styles from "../AdminDashboard.module.css";
import { LEAD_STATUSES } from "../_lib/constants";
import { Lead } from "../_lib/types";
import { formatDate, formatMeeting, parseJsonList } from "../_lib/utils";

type LeadsSectionProps = {
  exportLeads: () => void;
  leadMeetingFilter: string;
  leadPage: number;
  leadPages: number;
  leadSearch: string;
  leadStatusFilter: string;
  leadsCount: number;
  paginatedLeads: Lead[];
  setLeadMeetingFilter: (value: string) => void;
  setLeadPage: (value: number | ((page: number) => number)) => void;
  setLeadSearch: (value: string) => void;
  setLeadStatusFilter: (value: string) => void;
  setMessageLead: (lead: Lead) => void;
  setSelectedLead: (lead: Lead) => void;
  toggleLeadSort: (key: keyof Lead) => void;
  updateLeadStatus: (leadId: string, status: string) => void;
};

export function LeadsSection({
  exportLeads,
  leadMeetingFilter,
  leadPage,
  leadPages,
  leadSearch,
  leadStatusFilter,
  leadsCount,
  paginatedLeads,
  setLeadMeetingFilter,
  setLeadPage,
  setLeadSearch,
  setLeadStatusFilter,
  setMessageLead,
  setSelectedLead,
  toggleLeadSort,
  updateLeadStatus,
}: LeadsSectionProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <span className={styles.eyebrow}>Comercial</span>
          <h2>Formularios y reuniones</h2>
        </div>

        <button
          type="button"
          className={styles.primaryButton}
          onClick={exportLeads}
          disabled={leadsCount === 0}
        >
          EXPORT EXCEL
        </button>
      </div>

      <div className={styles.toolbar}>
        <input
          value={leadSearch}
          onChange={(event) => {
            setLeadSearch(event.target.value);
            setLeadPage(1);
          }}
          placeholder="Buscar por nombre, email, empresa, país..."
        />

        <select
          value={leadStatusFilter}
          onChange={(event) => {
            setLeadStatusFilter(event.target.value);
            setLeadPage(1);
          }}
        >
          <option value="All">Todos los estados</option>
          {LEAD_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={leadMeetingFilter}
          onChange={(event) => {
            setLeadMeetingFilter(event.target.value);
            setLeadPage(1);
          }}
        >
          <option value="All">Todas las reuniones</option>
          <option value="Yes">Solicita reunión</option>
          <option value="No">Sin reunión</option>
        </select>
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th onClick={() => toggleLeadSort("id")}>ID</th>
              <th onClick={() => toggleLeadSort("createdAt")}>
                Fecha de creación
              </th>
              <th onClick={() => toggleLeadSort("name")}>Nombre</th>
              <th onClick={() => toggleLeadSort("email")}>Email</th>
              <th>Teléfono</th>
              <th>Empresa</th>
              <th>País</th>
              <th>Código País</th>
              <th>Servicio solicitado</th>
              <th>Solicita reunión</th>
              <th>Fecha reunión</th>
              <th>Horario reunión</th>
              <th>Mensaje</th>
              <th>Archivos adjuntos</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeads.length === 0 ? (
              <tr>
                <td colSpan={15}>
                  <div className={styles.emptyState}>
                    No hay consultas que coincidan con los filtros.
                  </div>
                </td>
              </tr>
            ) : (
              paginatedLeads.map((lead) => {
                const attachments = parseJsonList(lead.attachments);

                return (
                  <tr key={lead.id} onClick={() => setSelectedLead(lead)}>
                    <td className={styles.mono}>{lead.id}</td>
                    <td>{formatDate(lead.createdAt)}</td>
                    <td>{lead.name || "-"}</td>
                    <td>{lead.email || "-"}</td>
                    <td>{lead.phone || "-"}</td>
                    <td>{lead.company || "-"}</td>
                    <td>{lead.country_name || "-"}</td>
                    <td>{lead.country_code || "-"}</td>
                    <td>{lead.service || "-"}</td>
                    <td>
                      <span className={styles.pill}>
                        {formatMeeting(lead.wants_meeting)}
                      </span>
                    </td>
                    <td>{lead.meetingDate || "-"}</td>
                    <td>{lead.meetingSlot || "-"}</td>
                    <td>
                      {lead.message ? (
                        <button
                          type="button"
                          className={styles.textButton}
                          onClick={(event) => {
                            event.stopPropagation();
                            setMessageLead(lead);
                          }}
                        >
                          Ver mensaje
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>{attachments.length ? attachments.length : "-"}</td>
                    <td>
                      <select
                        className={styles.statusSelect}
                        value={lead.status || "Nuevo"}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) =>
                          updateLeadStatus(lead.id, event.target.value)
                        }
                      >
                        {LEAD_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <span>
          Página {leadPage} de {leadPages}
        </span>
        <div>
          <button
            type="button"
            onClick={() => setLeadPage((page) => Math.max(1, page - 1))}
            disabled={leadPage === 1}
          >
            Anterior
          </button>
          <button
            type="button"
            onClick={() => setLeadPage((page) => Math.min(leadPages, page + 1))}
            disabled={leadPage === leadPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  );
}
