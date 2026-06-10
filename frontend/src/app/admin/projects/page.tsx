"use client";

import { useEffect } from "react";
import styles from "../AdminDashboard.module.css";
import { AdminShell } from "../_components/AdminShell";
import { ProjectModals } from "../_components/ProjectModals";
import { ProjectsSection } from "../_components/ProjectsSection";
import { StatsGrid } from "../_components/StatsGrid";
import { Toast } from "../_components/Toast";
import { useAdminDashboard } from "../_hooks/useAdminDashboard";

export default function AdminProjectsPage() {
  const admin = useAdminDashboard();

  useEffect(() => {
    admin.setActiveSection("projects");
  }, []);

  return (
    <AdminShell
      activeSection="projects"
      onRefresh={admin.loadDashboard}
      onSectionChange={admin.setActiveSection}
    >
      <StatsGrid stats={admin.stats} />

      {admin.loading ? (
        <div className={styles.loadingState}>Cargando proyectos...</div>
      ) : (
        <ProjectsSection
          duplicateProject={admin.duplicateProject}
          featuredPositions={admin.featuredPositions}
          openProjectModal={admin.openProjectModal}
          paginatedProjects={admin.paginatedProjects}
          projects={admin.projects}
          projectCategoryFilter={admin.projectCategoryFilter}
          projectPage={admin.projectPage}
          projectPages={admin.projectPages}
          projectSearch={admin.projectSearch}
          projectStatusFilter={admin.projectStatusFilter}
          removeProject={admin.removeProject}
          setPreviewProject={admin.setPreviewProject}
          setProjectCategoryFilter={admin.setProjectCategoryFilter}
          setProjectPage={admin.setProjectPage}
          setProjectSearch={admin.setProjectSearch}
          setProjectStatusFilter={admin.setProjectStatusFilter}
          toggleProjectSort={admin.toggleProjectSort}
          toggleProjectStatus={admin.toggleProjectStatus}
          updateFeaturedPosition={admin.updateFeaturedPosition}
        />
      )}

      <ProjectModals
        closeProjectModal={admin.closeProjectModal}
        editingProject={admin.editingProject}
        handleGalleryImages={admin.handleGalleryImages}
        handleMainImage={admin.handleMainImage}
        handleProjectField={admin.handleProjectField}
        moveGalleryImage={admin.moveGalleryImage}
        previewProject={admin.previewProject}
        projectForm={admin.projectForm}
        projectModalOpen={admin.projectModalOpen}
        removeGalleryImage={admin.removeGalleryImage}
        saveProject={admin.saveProject}
        savingProject={admin.savingProject}
        setPreviewProject={admin.setPreviewProject}
      />

      <Toast toast={admin.toast} />
    </AdminShell>
  );
}
