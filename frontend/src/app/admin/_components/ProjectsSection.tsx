"use client";

import styles from "../AdminDashboard.module.css";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "../_lib/constants";
import { FeaturedProjectPositions, Project } from "../_lib/types";
import { formatDate } from "../_lib/utils";

type ProjectsSectionProps = {
  duplicateProject: (project: Project) => void;
  featuredPositions: FeaturedProjectPositions;
  openProjectModal: (project?: Project) => void;
  paginatedProjects: Project[];
  projects: Project[];
  projectCategoryFilter: string;
  projectPage: number;
  projectPages: number;
  projectSearch: string;
  projectStatusFilter: string;
  removeProject: (project: Project) => void;
  setPreviewProject: (project: Project) => void;
  setProjectCategoryFilter: (value: string) => void;
  setProjectPage: (value: number | ((page: number) => number)) => void;
  setProjectSearch: (value: string) => void;
  setProjectStatusFilter: (value: string) => void;
  toggleProjectSort: (key: keyof Project) => void;
  toggleProjectStatus: (project: Project) => void;
  updateFeaturedPosition: (
    position: keyof FeaturedProjectPositions,
    projectId: string
  ) => void;
};

export function ProjectsSection({
  duplicateProject,
  featuredPositions,
  openProjectModal,
  paginatedProjects,
  projects,
  projectCategoryFilter,
  projectPage,
  projectPages,
  projectSearch,
  projectStatusFilter,
  removeProject,
  setPreviewProject,
  setProjectCategoryFilter,
  setProjectPage,
  setProjectSearch,
  setProjectStatusFilter,
  toggleProjectSort,
  toggleProjectStatus,
  updateFeaturedPosition,
}: ProjectsSectionProps) {
  const featuredPositionItems = [1, 2, 3] as const;

  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <span className={styles.eyebrow}>Portfolio</span>
          <h2>Gestión de proyectos</h2>
        </div>

        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => openProjectModal()}
        >
          Crear Proyecto
        </button>
      </div>

      <div className={styles.featuredManager}>
        <div className={styles.featuredManagerHeader}>
          <div>
            <span className={styles.eyebrow}>Featured Projects</span>
            <h3>Public homepage selection</h3>
          </div>
        </div>

        <div className={styles.featuredPositionGrid}>
          {featuredPositionItems.map((position) => {
            const selectedProject = projects.find(
              (project) => project.id === featuredPositions[position],
            );

            return (
              <label key={position} className={styles.featuredPositionCard}>
                <span>Featured Position {position}</span>
                <select
                  value={featuredPositions[position]}
                  onChange={(event) =>
                    updateFeaturedPosition(position, event.target.value)
                  }
                >
                  <option value="">No featured project assigned</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title || "Untitled project"}
                    </option>
                  ))}
                </select>
                <small>
                  {selectedProject?.title || "No featured project assigned"}
                </small>
              </label>
            );
          })}
        </div>
      </div>

      <div className={styles.toolbar}>
        <input
          value={projectSearch}
          onChange={(event) => {
            setProjectSearch(event.target.value);
            setProjectPage(1);
          }}
          placeholder="Buscar por título, país, cliente..."
        />

        <select
          value={projectCategoryFilter}
          onChange={(event) => {
            setProjectCategoryFilter(event.target.value);
            setProjectPage(1);
          }}
        >
          <option value="All">Todas las categorías</option>
          {PROJECT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={projectStatusFilter}
          onChange={(event) => {
            setProjectStatusFilter(event.target.value);
            setProjectPage(1);
          }}
        >
          <option value="All">Todos los estados</option>
          {PROJECT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th onClick={() => toggleProjectSort("title")}>Título</th>
              <th onClick={() => toggleProjectSort("category")}>Categoría</th>
              <th onClick={() => toggleProjectSort("country")}>País</th>
              <th>Potencia</th>
              <th>Área</th>
              <th>Cliente</th>
              <th>Estado</th>
              <th onClick={() => toggleProjectSort("createdAt")}>
                Fecha creación
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProjects.length === 0 ? (
              <tr>
                <td colSpan={9}>
                  <div className={styles.emptyState}>
                    Todavía no hay proyectos para esta vista.
                  </div>
                </td>
              </tr>
            ) : (
              paginatedProjects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <strong>{project.title || "Untitled project"}</strong>
                  </td>
                  <td>{project.category || "-"}</td>
                  <td>{project.country || "-"}</td>
                  <td>{project.power || "-"}</td>
                  <td>{project.area || "-"}</td>
                  <td>{project.company || "-"}</td>
                  <td>
                    <span className={styles.pill}>
                      {project.status || (project.featured ? "Published" : "Draft")}
                    </span>
                  </td>
                  <td>{formatDate(project.createdAt)}</td>
                  <td>
                    <div className={styles.actionGroup}>
                      <button type="button" onClick={() => openProjectModal(project)}>
                        Editar
                      </button>
                      <button type="button" onClick={() => duplicateProject(project)}>
                        Duplicar
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleProjectStatus(project)}
                      >
                        {project.status === "Published" ? "Despublicar" : "Publicar"}
                      </button>
                      <button type="button" onClick={() => setPreviewProject(project)}>
                        Vista previa
                      </button>
                      <button
                        type="button"
                        className={styles.dangerButton}
                        onClick={() => removeProject(project)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <span>
          Página {projectPage} de {projectPages}
        </span>
        <div>
          <button
            type="button"
            onClick={() => setProjectPage((page) => Math.max(1, page - 1))}
            disabled={projectPage === 1}
          >
            Anterior
          </button>
          <button
            type="button"
            onClick={() => setProjectPage((page) => Math.min(projectPages, page + 1))}
            disabled={projectPage === projectPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  );
}
