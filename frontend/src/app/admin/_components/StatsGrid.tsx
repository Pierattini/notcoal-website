import styles from "../AdminDashboard.module.css";

type StatsGridProps = {
  stats: {
    totalLeads: number;
    meetingRequests: number;
    publishedProjects: number;
    currentMonthLeads: number;
  };
};

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className={styles.statsGrid}>
      <article className={styles.statCard}>
        <span>Total Leads</span>
        <strong>{stats.totalLeads}</strong>
      </article>
      <article className={styles.statCard}>
        <span>Reuniones Solicitadas</span>
        <strong>{stats.meetingRequests}</strong>
      </article>
      <article className={styles.statCard}>
        <span>Proyectos Publicados</span>
        <strong>{stats.publishedProjects}</strong>
      </article>
      <article className={styles.statCard}>
        <span>Consultas Este Mes</span>
        <strong>{stats.currentMonthLeads}</strong>
      </article>
    </div>
  );
}
