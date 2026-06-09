"use client";

export default function LeadsAdminPage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Formularios y Reuniones</h1>

      <button
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
        }}
      >
        Exportar Excel
      </button>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>País</th>
            <th>Empresa</th>
            <th>Servicio</th>
            <th>Reunión</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colSpan={9}>
              Sin registros todavía
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}