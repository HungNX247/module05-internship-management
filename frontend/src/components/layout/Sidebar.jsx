import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        minHeight: "calc(100vh - 60px)",
        borderRight: "1px solid #ddd",
        padding: "20px",
        background: "#f8f9fa",
      }}
    >
      <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Link to="/admin/dashboard">Admin Dashboard</Link>
        <Link to="/hr/dashboard">HR Dashboard</Link>
        <Link to="/mentor/dashboard">Mentor Dashboard</Link>
        <Link to="/intern/dashboard">Intern Dashboard</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
