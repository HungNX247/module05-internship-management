import { useNavigate } from "react-router-dom";
import { saveCurrentUser, saveToken } from "../../services/tokenService";
import "../../styles/user-management.css";

const DEV_USERS = {
  ADMIN: {
    role: "ADMIN",
    fullName: "Admin Dev",
    email: "admin@gmail.com",
    dashboard: "/admin/dashboard",
  },
  HR: {
    role: "HR",
    fullName: "HR Dev",
    email: "hr@gmail.com",
    dashboard: "/hr/dashboard",
  },
};

function LoginPage() {
  const navigate = useNavigate();

  function handleDevLogin(roleKey) {
    const user = DEV_USERS[roleKey];
    saveToken("dev-mock-token");
    saveCurrentUser({
      id: 1,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
    navigate(user.dashboard);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__logo">IMS</div>
        <h2>Đăng nhập</h2>
        <p>
          Hệ thống quản lý thực tập sinh. Màn hình login chính thức sẽ do
          Nguyệt hoàn thiện ở Sprint 1.
        </p>

        {import.meta.env.DEV && (
          <div className="login-dev-box">
            <p>Dev only — mock login khi backend chưa chạy:</p>
            <div className="login-dev-actions">
              <button type="button" onClick={() => handleDevLogin("ADMIN")}>
                Đăng nhập ADMIN
              </button>
              <button type="button" onClick={() => handleDevLogin("HR")}>
                Đăng nhập HR
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
