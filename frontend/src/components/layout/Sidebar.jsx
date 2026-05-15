import { NavLink } from "react-router-dom";
import { getCurrentRole } from "../../services/tokenService";

const MENU_ICONS = {
  Dashboard: "▣",
  "User Management": "◎",
  Interns: "◇",
};

const menuByRole = {
  ADMIN: [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "User Management", path: "/admin/users" },
  ],
  HR: [
    { label: "Dashboard", path: "/hr/dashboard" },
    { label: "Interns", path: "/hr/interns" },
  ],
  MENTOR: [{ label: "Dashboard", path: "/mentor/dashboard" }],
  INTERN: [{ label: "Dashboard", path: "/intern/dashboard" }],
};

function Sidebar() {
  const role = getCurrentRole();
  const menus = menuByRole[role] || [];

  return (
    <aside className="app-sidebar">
      <div className="app-sidebar__brand">
        <h3 className="app-sidebar__brand-title">IMS</h3>
        <p className="app-sidebar__brand-desc">Internship Management</p>
      </div>

      <nav className="app-sidebar__nav">
        {menus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `app-sidebar__link${isActive ? " app-sidebar__link--active" : ""}`
            }
          >
            <span className="app-sidebar__icon">
              {MENU_ICONS[item.label] || "•"}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
