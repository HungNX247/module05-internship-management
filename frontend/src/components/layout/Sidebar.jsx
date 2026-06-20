import { Link, useLocation } from "react-router-dom";
import { getCurrentRole } from "../../services/tokenService";

function Sidebar() {
  const role = getCurrentRole();
  const location = useLocation();

  const menuItems = {
    ADMIN: [
      { path: "/admin/dashboard", label: "Bảng điều khiển Admin", icon: "📊" },
      { path: "/admin/users", label: "Quản lý người dùng", icon: "👥" },
      { path: "/admin/logs", label: "Nhật ký hệ thống", icon: "📋", comingSoon: true },
      { path: "/admin/settings", label: "Cài đặt", icon: "⚙️", comingSoon: true },
      { path: "/hr/programs", label: "Chương trình thực tập", icon: "📅" },
      { path: "/hr/departments", label: "Quản lý phòng ban", icon: "🏛️" },
      { path: "/hr/interns", label: "Thực tập sinh", icon: "🎓" },
      { path: "/hr/mentors", label: "Quản lý Mentor", icon: "👨‍🏫" },
      { path: "/hr/mentor-assignment", label: "Gán Mentor", icon: "🔗" },
      { path: "/hr/mentor-workload", label: "Workload Mentor", icon: "📊" },
    ],
    HR: [
      { path: "/hr/dashboard", label: "Bảng điều khiển HR", icon: "🏢" },
      { path: "/hr/programs", label: "Chương trình thực tập", icon: "📅" },
      { path: "/hr/departments", label: "Quản lý phòng ban", icon: "🏛️" },
      { path: "/hr/interns", label: "Thực tập sinh", icon: "🎓" },
      { path: "/hr/mentors", label: "Quản lý Mentor", icon: "👨‍🏫" },
      { path: "/hr/mentor-assignment", label: "Gán Mentor", icon: "🔗" },
      { path: "/hr/mentor-workload", label: "Workload Mentor", icon: "📊" },
      { path: "/hr/vacancies", label: "Vị trí tuyển dụng", icon: "📋", comingSoon: true },
      { path: "/hr/reports", label: "Báo cáo", icon: "📈", comingSoon: true },
    ],
    MENTOR: [
      { path: "/mentor/dashboard", label: "Bảng điều khiển Mentor", icon: "👨‍🏫" },
      { path: "/mentor/interns", label: "Thực tập sinh của tôi", icon: "👥", comingSoon: true },
      {
        path: "/mentor/evaluations",
        label: "Đánh giá",
        icon: "📝",
        comingSoon: true,
      },
    ],
    INTERN: [
      { path: "/intern/dashboard", label: "Bảng điều khiển thực tập sinh", icon: "🎓" },
      { path: "/intern/apply", label: "Nộp hồ sơ", icon: "📄" },
      { path: "/intern/profile", label: "Hồ sơ của tôi", icon: "👤" },
      { path: "/intern/contract", label: "Hợp đồng", icon: "📝" },
      { path: "/intern/schedule", label: "Lịch thực tập", icon: "📅" },
      { path: "/intern/tasks", label: "Công việc của tôi", icon: "✅", comingSoon: true },
      {
        path: "/intern/reports",
        label: "Báo cáo tuần",
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
        Hệ thống v1.0.4
      </div>
    </aside>
  );
}

export default Sidebar;
