import Link from "next/link";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        paddingTop: "110px",
      }}
    >
      <aside
        style={{
          width: "260px",
          background: "#111827",
          padding: "30px",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h2>Panel Admin</h2>

        <nav
          style={{
            display: "grid",
            gap: "14px",
            marginTop: "30px",
          }}
        >
          <Link href="/admin/projects" style={linkStyle}>
            📁 Proyectos
          </Link>

          <Link href="/admin/leads" style={linkStyle}>
            📨 Formularios
          </Link>
        </nav>
      </aside>

      <section
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        {children}
      </section>
    </main>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  background: "#1f2937",
  padding: "14px 16px",
  borderRadius: "10px",
};