"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/services/project.service";

type Project = {
  id: string;
  title: string;
  category?: string;
  country?: string;
  featured?: boolean;
};

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };

    loadProjects();
  }, []);

  return (
    <main style={{ padding: "40px" }}>
      <h1>Administración de Proyectos</h1>

      <button
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
        }}
      >
        Nuevo Proyecto
      </button>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Título</th>
            <th>Categoría</th>
            <th>País</th>
            <th>Destacado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.category}</td>
              <td>{project.country}</td>
              <td>{project.featured ? "Sí" : "No"}</td>

              <td>
                <button>Editar</button>

                <button
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}