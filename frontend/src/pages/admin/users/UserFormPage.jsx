import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Input } from "../../../components/common";
import { userApi } from "../../../api/userApi";
import MainLayout from "../../../layouts/MainLayout";
import "../../../styles/user-management.css";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  role: "HR",
  status: "ACTIVE",
};

function UserFormPage() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      loadUserDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function loadUserDetail() {
    try {
      setLoading(true);
      const response = await userApi.getUserById(id);

      if (!response.success) {
        setErrorMessage(response.message || "Không tải được thông tin user");
        return;
      }

      const user = response.data;
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        role: user.role || "HR",
        status: user.status || "ACTIVE",
      });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Không tải được thông tin user"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setErrorMessage("");
    setSuccessMessage("");
  }

  function validateForm() {
    const nextErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Vui lòng nhập họ tên";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Vui lòng nhập email";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      nextErrors.email = "Email không đúng định dạng";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Vui lòng nhập số điện thoại";
    }

    if (!isEditMode && !formData.password) {
      nextErrors.password = "Vui lòng nhập mật khẩu";
    }

    if (!formData.role) {
      nextErrors.role = "Vui lòng chọn role";
    }

    if (!formData.status) {
      nextErrors.status = "Vui lòng chọn status";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        role: formData.role,
        status: formData.status,
      };

      if (!isEditMode) {
        payload.password = formData.password;
      }

      const response = isEditMode
        ? await userApi.updateUser(id, payload)
        : await userApi.createUser(payload);

      if (!response.success) {
        setErrorMessage(response.message || "Lưu user thất bại");
        return;
      }

      setSuccessMessage(
        isEditMode ? "Cập nhật user thành công" : "Tạo user thành công"
      );
      navigate("/admin/users", { replace: true });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Lưu user thất bại");
    } finally {
      setLoading(false);
    }
  }

  if (loading && isEditMode) {
    return (
      <MainLayout>
        <p>Đang tải thông tin user...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="user-management-page">
        <div className="user-form-page-header">
          <h2>{isEditMode ? "Sửa người dùng" : "Thêm người dùng"}</h2>
          <p>
            {isEditMode
              ? "Cập nhật thông tin tài khoản"
              : "Tạo tài khoản mới cho hệ thống"}
          </p>
        </div>

        {errorMessage && (
          <div className="user-message-error">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="user-message-success">{successMessage}</div>
        )}

        <form className="user-form-card" onSubmit={handleSubmit} noValidate>
          <Input
            label="Full name"
            name="fullName"
            value={formData.fullName}
            placeholder="Nhập họ tên"
            onChange={handleChange}
            error={errors.fullName}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="name@company.com"
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            placeholder="Nhập số điện thoại"
            onChange={handleChange}
            error={errors.phone}
          />

          {!isEditMode && (
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              placeholder="Nhập mật khẩu"
              onChange={handleChange}
              error={errors.password}
            />
          )}

          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="ADMIN">ADMIN</option>
              <option value="HR">HR</option>
              <option value="MENTOR">MENTOR</option>
              <option value="INTERN">INTERN</option>
            </select>
            {errors.role && <div className="form-error">{errors.role}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
            {errors.status && (
              <div className="form-error">{errors.status}</div>
            )}
          </div>

          <div className="user-form-actions">
            <Button type="submit" disabled={loading}>
              {loading ? "Đang lưu..." : "Lưu"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/admin/users")}
            >
              Hủy
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default UserFormPage;
