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

      // Ghi nhớ email đăng nhập.
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email.trim());
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      const loginData = response.data;
      if (!loginData || !loginData.token || !loginData.user) {
        setApiError("Dữ liệu phản hồi từ server không hợp lệ (thiếu token hoặc thông tin người dùng).");
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


          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
