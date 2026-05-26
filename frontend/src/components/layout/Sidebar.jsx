import { Link, useLocation } from "react-router-dom";
import { getCurrentRole } from "../../services/tokenService";

function Sidebar() {
  const role = getCurrentRole();
  const location = useLocation();

  const menuItems = {
    ADMIN: [
      { path: "/admin/dashboard", label: "Admin Dashboard", icon: "📊" },
      { path: "/admin/users", label: "User Management", icon: "👥" },
      { path: "/admin/logs", label: "System Logs", icon: "📋", comingSoon: true },
      { path: "/admin/settings", label: "Settings", icon: "⚙️", comingSoon: true },
      { path: "/hr/interns", label: "Interns", icon: "👨‍🎓" },
    ],
    HR: [
      { path: "/hr/dashboard", label: "HR Dashboard", icon: "🏢" },
      { path: "/hr/interns", label: "Interns", icon: "👨‍🎓" },
      { path: "/hr/vacancies", label: "Vacancies", icon: "📋", comingSoon: true },
      { path: "/hr/reports", label: "Reports", icon: "📈", comingSoon: true },
    ],
    MENTOR: [
      { path: "/mentor/dashboard", label: "Mentor Dashboard", icon: "👨‍🏫" },
      { path: "/mentor/interns", label: "My Interns", icon: "👥", comingSoon: true },
      {
        path: "/mentor/evaluations",
        label: "Evaluations",
        icon: "📝",
        comingSoon: true,
      },
    ],
    INTERN: [
      { path: "/intern/dashboard", label: "Intern Dashboard", icon: "🎓" },
      { path: "/intern/apply", label: "Nộp hồ sơ", icon: "📄" },
      { path: "/intern/profile", label: "Hồ sơ của tôi", icon: "👤" },
      { path: "/intern/tasks", label: "My Tasks", icon: "✅", comingSoon: true },
      {
        path: "/intern/reports",
        label: "Weekly Reports",
        icon: "📄",
        comingSoon: true,
      },
    ],
  };

  const currentMenu = (menuItems[role] || []).filter((item) => !item.comingSoon);

  return (
    <aside
      style={{
        width: "260px",
        minHeight: "calc(100vh - 60px)",
        background: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        padding: "1.5rem 1rem",
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0 6px -1px rgb(0 0 0 / 0.05)",
      }}
    >
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {currentMenu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                color: isActive ? "#4f46e5" : "#64748b",
                background: isActive ? "#f5f3ff" : "transparent",
                fontWeight: isActive ? "600" : "500",
                fontSize: "0.9375rem",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "#f8fafc";
                  e.currentTarget.style.color = "#1e293b";
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#64748b";
                }
              }}
            >
              <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          marginTop: "auto",
          padding: "1rem",
          borderTop: "1px solid #e2e8f0",
          fontSize: "0.875rem",
          color: "#94a3b8",
        }}
      >
        System v1.0.4
      </div>
    </aside>
  );
}

export default Sidebar;
