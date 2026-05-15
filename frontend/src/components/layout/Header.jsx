import { getCurrentRole, getCurrentUser } from "../../services/tokenService";

function Header() {
  const user = getCurrentUser();
  const role = getCurrentRole();
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <header className="app-header">
      <div className="app-header__brand">
        <div className="app-header__logo">IMS</div>
        <div>
          <h3 className="app-header__title">Internship Management</h3>
          <p className="app-header__subtitle">Hệ thống quản lý thực tập</p>
        </div>
      </div>

      <div className="app-header__user">
        <div className="app-header__avatar">{initials}</div>
        <div className="app-header__user-info">
          <span className="app-header__user-name">
            {user?.fullName || "Khách"}
          </span>
          <span className="app-header__user-role">{role || "—"}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
