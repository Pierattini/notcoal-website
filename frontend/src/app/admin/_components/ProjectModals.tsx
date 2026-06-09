"use client";

import { ChangeEvent, FormEvent } from "react";
import styles from "../AdminDashboard.module.css";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "../_lib/constants";
import { Project, ProjectForm } from "../_lib/types";

type ProjectModalsProps = {
  closeProjectModal: () => void;
  editingProject: Project | null;
  handleGalleryImages: (event: ChangeEvent<HTMLInputElement>) => void;
  handleMainImage: (event: ChangeEvent<HTMLInputElement>) => void;
  handleProjectField: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  moveGalleryImage: (index: number, direction: -1 | 1) => void;
  previewProject: Project | null;
  projectForm: ProjectForm;
  projectModalOpen: boolean;
  removeGalleryImage: (index: number) => void;
  saveProject: (event: FormEvent<HTMLFormElement>) => void;
  savingProject: boolean;
  setPreviewProject: (project: Project | null) => void;
};

export function ProjectModals({
  closeProjectModal,
  editingProject,
  handleGalleryImages,
  handleMainImage,
  handleProjectField,
  moveGalleryImage,
  previewProject,
  projectForm,
  projectModalOpen,
  removeGalleryImage,
  saveProject,
  savingProject,
  setPreviewProject,
}: ProjectModalsProps) {
  return (
    <>
      {projectModalOpen && (
        <div className={styles.modalOverlay} onClick={closeProjectModal}>
          <div
            className={styles.projectModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.eyebrow}>
                  {editingProject ? "Editar proyecto" : "Nuevo proyecto"}
                </span>
                <h3>{editingProject ? editingProject.title : "Crear Proyecto"}</h3>
              </div>
              <button type="button" onClick={closeProjectModal}>
                ×
              </button>
            </div>

            <form className={styles.projectForm} onSubmit={saveProject}>
              <div className={styles.formGrid}>
                <label>
                  Título
                  <input
                    name="title"
                    value={projectForm.title}
                    onChange={handleProjectField}
                    required
                  />
                </label>
                <label>
                  Categoría
                  <select
                    name="category"
                    value={projectForm.category}
                    onChange={handleProjectField}
                  >
                    {PROJECT_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  País
                  <input
                    name="country"
                    value={projectForm.country}
                    onChange={handleProjectField}
                  />
                </label>
                <label>
                  Potencia
                  <input
                    name="power"
                    value={projectForm.power}
                    onChange={handleProjectField}
                  />
                </label>
                <label>
                  Área
                  <input
                    name="area"
                    value={projectForm.area}
                    onChange={handleProjectField}
                  />
                </label>
                <label>
                  Cliente
                  <input
                    name="company"
                    value={projectForm.company}
                    onChange={handleProjectField}
                  />
                </label>
                <label>
                  Estado
                  <select
                    name="status"
                    value={projectForm.status}
                    onChange={handleProjectField}
                  >
                    {PROJECT_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                Descripción corta
                <textarea
                  name="description"
                  value={projectForm.description}
                  onChange={handleProjectField}
                  rows={3}
                />
              </label>

              <label>
                Descripción larga
                <textarea
                  name="metaDescription"
                  value={projectForm.metaDescription}
                  onChange={handleProjectField}
                  rows={5}
                />
              </label>

              <div className={styles.imageTools}>
                <label>
                  Imagen principal
                  <input type="file" accept="image/*" onChange={handleMainImage} />
                </label>
                {projectForm.imageUrl && (
                  <img
                    src={projectForm.imageUrl}
                    alt="Vista previa"
                    className={styles.imagePreview}
                  />
                )}
              </div>

              <div className={styles.imageTools}>
                <label>
                  Galería de imágenes
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryImages}
                  />
                </label>
                <div className={styles.galleryGrid}>
                  {projectForm.gallery.map((image, index) => (
                    <div key={`${image}-${index}`} className={styles.galleryItem}>
                      <img src={image} alt={`Galería ${index + 1}`} />
                      <div>
                        <button
                          type="button"
                          onClick={() => moveGalleryImage(index, -1)}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveGalleryImage(index, 1)}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={closeProjectModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={savingProject}
                >
                  {savingProject ? "Guardando..." : "Guardar Proyecto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {previewProject && (
        <div
          className={styles.modalOverlay}
          onClick={() => setPreviewProject(null)}
        >
          <div
            className={styles.centerModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.eyebrow}>Vista previa</span>
                <h3>{previewProject.title}</h3>
              </div>
              <button type="button" onClick={() => setPreviewProject(null)}>
                ×
              </button>
            </div>
            {previewProject.imageUrl && (
              <img
                src={previewProject.imageUrl}
                alt={previewProject.title || "Proyecto"}
                className={styles.previewImage}
              />
            )}
            <div className={styles.detailGrid}>
              <span>Categoría</span>
              <strong>{previewProject.category || "-"}</strong>
              <span>País</span>
              <strong>{previewProject.country || "-"}</strong>
              <span>Potencia</span>
              <strong>{previewProject.power || "-"}</strong>
              <span>Área</span>
              <strong>{previewProject.area || "-"}</strong>
              <span>Cliente</span>
              <strong>{previewProject.company || "-"}</strong>
              <span>Estado</span>
              <strong>{previewProject.status || "Draft"}</strong>
            </div>
            <div className={styles.messageBox}>
              <p>
                {previewProject.metaDescription ||
                  previewProject.description ||
                  "Sin descripción."}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
