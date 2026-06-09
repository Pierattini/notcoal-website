"use client";

import styles from "./AdminDashboard.module.css";
import { AdminShell } from "./_components/AdminShell";
import { LeadModals } from "./_components/LeadModals";
import { LeadsSection } from "./_components/LeadsSection";
import { ProjectModals } from "./_components/ProjectModals";
import { ProjectsSection } from "./_components/ProjectsSection";
import { StatsGrid } from "./_components/StatsGrid";
import { Toast } from "./_components/Toast";
import { useAdminDashboard } from "./_hooks/useAdminDashboard";

export default function AdminPage() {
  const admin = useAdminDashboard();

  return (
    <AdminShell
      activeSection={admin.activeSection}
      onRefresh={admin.loadDashboard}
      onSectionChange={admin.setActiveSection}
    >
      <StatsGrid stats={admin.stats} />

      {admin.loading ? (
        <div className={styles.loadingState}>Cargando panel admin...</div>
      ) : admin.activeSection === "leads" ? (
        <LeadsSection
          exportLeads={admin.exportLeads}
          leadMeetingFilter={admin.leadMeetingFilter}
          leadPage={admin.leadPage}
          leadPages={admin.leadPages}
          leadSearch={admin.leadSearch}
          leadStatusFilter={admin.leadStatusFilter}
          leadsCount={admin.leadsCount}
          paginatedLeads={admin.paginatedLeads}
          setLeadMeetingFilter={admin.setLeadMeetingFilter}
          setLeadPage={admin.setLeadPage}
          setLeadSearch={admin.setLeadSearch}
          setLeadStatusFilter={admin.setLeadStatusFilter}
          setMessageLead={admin.setMessageLead}
          setSelectedLead={admin.setSelectedLead}
          toggleLeadSort={admin.toggleLeadSort}
          updateLeadStatus={admin.updateLeadStatus}
        />
      ) : (
        <ProjectsSection
          duplicateProject={admin.duplicateProject}
          openProjectModal={admin.openProjectModal}
          paginatedProjects={admin.paginatedProjects}
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
        />
      )}

      <LeadModals
        messageLead={admin.messageLead}
        selectedLead={admin.selectedLead}
        setMessageLead={admin.setMessageLead}
        setSelectedLead={admin.setSelectedLead}
      />

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
