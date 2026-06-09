"use client";

import styles from "../AdminDashboard.module.css";
import { AdminSection } from "../_lib/types";

type AdminShellProps = {
  activeSection: AdminSection;
  children: React.ReactNode;
  onRefresh: () => void;
  onSectionChange: (section: AdminSection) => void;
};

export function AdminShell({
  activeSection,
  children,
  onRefresh,
  onSectionChange,
}: AdminShellProps) {
  return (
    <main className={styles.adminPage}>
      <aside className={styles.sidebar}>
        <div className={styles.brandBlock}>
          <span className={styles.brandMark}>TNCC</span>
          <div>
            <strong>The Not Coal Company</strong>
            <small>Admin Console</small>
          </div>
        </div>

        <button
          className={`${styles.navButton} ${
            activeSection === "leads" ? styles.navButtonActive : ""
          }`}
          type="button"
          onClick={() => onSectionChange("leads")}
        >
          Formularios y reuniones
        </button>

        <button
          className={`${styles.navButton} ${
            activeSection === "projects" ? styles.navButtonActive : ""
          }`}
          type="button"
          onClick={() => onSectionChange("projects")}
        >
          Proyectos
        </button>
      </aside>

      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Executive dashboard</span>
            <h1>Panel administrativo</h1>
          </div>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onRefresh}
          >
            Actualizar datos
          </button>
        </header>

        {children}
      </section>
    </main>
  );
}
