import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { saveToken, saveCurrentUser } from "../../services/tokenService";
import { Button, Input } from "../../components/common";
import "../../styles/auth.css";

function getDashboardPathByRole(role) {
  switch (role) {
    case "ADMIN": return "/admin/dashboard";
    case "HR": return "/hr/dashboard";
    case "MENTOR": return "/mentor/dashboard";
    case "INTERN": return "/intern/dashboard";
    default: return "/login";
  }
}

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  // check email
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.email.trim()) nextErrors.email = "Vui lòng nhập email";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) nextErrors.email = "Email không đúng định dạng";
    if (!formData.password) nextErrors.password = "Vui lòng nhập mật khẩu";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      setApiError("");
      const response = await authApi.login({
        email: formData.email.trim(),
        password: formData.password,
      });
      if (!response.success) {
        setApiError(response.message || "Đăng nhập thất bại");
        return;
      }

      // remember user
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email.trim());
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      const loginData = response.data;
      if (!loginData || !loginData.token || !loginData.user) {
        setApiError("Dữ liệu phản hồi từ server không hợp lệ (thiếu Token hoặc User).");
        return;
      }

      saveToken(loginData.token);
      saveCurrentUser(loginData.user);
      navigate(getDashboardPathByRole(loginData.user.role), { replace: true });
    } catch (error) {
      setApiError(error.response?.data?.message || "Không thể đăng nhập. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="brand">
          <div className="brand-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h10L11 22l2-10H3Z" /></svg>
          </div>
          <span>Taskora</span>
        </div>

        <div className="welcome-section">
          <h1 className="welcome-title">Xin chào,<br />quay trở lại nhé!</h1>
          <p className="welcome-desc">Đăng nhập để tiếp tục quản lý dự án, theo dõi tiến độ và cộng tác cùng đội nhóm.</p>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h10L11 22l2-10H3Z" /></svg>
              </div>
              <div className="feature-info">
                <h4>Hiệu suất vượt trội</h4>
                <p>Tối ưu tốc độ và trải nghiệm người dùng</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </div>
              <div className="feature-info">
                <h4>Bảo mật tuyệt đối</h4>
                <p>Dữ liệu của bạn luôn được bảo vệ an toàn</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </div>
              <div className="feature-info">
                <h4>Cộng tác dễ dàng</h4>
                <p>Kết nối và làm việc cùng đội nhóm hiệu quả</p>
              </div>
            </div>
          </div>
        </div>

        <div className="support-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
          <span>Cần hỗ trợ? Liên hệ chúng tôi</span>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="card-header">
            <div className="header-top">
              <div className="card-logo">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h10L11 22l2-10H3Z" /></svg>
              </div>
              <h2 className="card-title">Đăng nhập</h2>
            </div>
            <p className="card-subtitle">Vui lòng đăng nhập để tiếp tục</p>
          </div>

          {apiError && <div className="auth-error-message">{apiError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              placeholder="name@company.com"
              onChange={handleChange}
              error={errors.email}
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>}
            />

            <Input
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="••••••••"
              onChange={handleChange}
              error={errors.password}
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>}
            >
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ?
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg> :
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                }
              </button>
            </Input>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="forgot-password">Quên mật khẩu?</a>
            </div>

            <Button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              <span>{loading ? "Đang xử lý..." : "Đăng nhập ngay"}</span>
              {!loading && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>}
            </Button>

            <div className="social-divider">
              <span>Hoặc đăng nhập với</span>
            </div>

            <div className="social-buttons">
              <button type="button" className="social-btn">
                <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
              </button>
              <button type="button" className="social-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              </button>
              <button type="button" className="social-btn">
                <svg width="20" height="20" viewBox="0 0 24 24"><path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" fill="#f25022" /></svg>
              </button>
            </div>

            <div className="card-footer">
              <span>Chưa có tài khoản? </span>
              <a href="#" className="signup-link">Đăng ký ngay</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
