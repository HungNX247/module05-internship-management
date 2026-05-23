import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { clearAuthData, getCurrentUser } from "../../services/tokenService";

function Header() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  async function handleLogout() {
    try {
      await authApi.logout();
    } catch {
    } finally {
      clearAuthData();
      navigate("/login", { replace: true });
    }
  }

  return (
    <header
      style={{
        height: "64px",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        background: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ background: "#4f46e5", color: "white", padding: "0.4rem", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h10L11 22l2-10H3Z" /></svg>
        </div>
        <h3 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 800, color: "#1e293b", letterSpacing: "-0.025em" }}>
          Taskora
        </h3>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ textAlign: "right", display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1e293b" }}>{currentUser?.fullName || "User"}</span>
            <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{currentUser?.role || "Guest"}</span>
          </div>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#64748b", border: "2px solid #fff", boxShadow: "0 0 0 1px #e2e8f0" }}>
            {(currentUser?.fullName || "U").charAt(0).toUpperCase()}
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: "1px solid #e2e8f0",
            background: "transparent",
            color: "#64748b",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#fee2e2";
            e.currentTarget.style.color = "#ef4444";
            e.currentTarget.style.borderColor = "#fecaca";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#64748b";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
