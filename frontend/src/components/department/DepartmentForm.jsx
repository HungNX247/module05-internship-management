import { useEffect, useState } from "react";
import { Modal } from "../common";

function DepartmentForm({ open, department, onClose, onSubmit, submitting }) {
  const isEdit = !!department;

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "ACTIVE",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    setErrors({});
    if (isEdit) {
      setForm({
        name: department.name || "",
        description: department.description || "",
        status: department.status || "ACTIVE",
      });
    } else {
      setForm({ name: "", description: "", status: "ACTIVE" });
    }
  }, [open, isEdit, department?.name, department?.description, department?.status]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Tên phòng ban không được để trống";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    onSubmit({
      name: form.name.trim(),
      description: form.description.trim() || undefined,
      status: form.status,
    });
  }

  return (
    <Modal
      open={open}
      title={isEdit ? "Chỉnh sửa phòng ban" : "Thêm phòng ban mới"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label">Tên phòng ban *</label>
          <input
            name="name"
            className={`form-input ${errors.name ? "form-input-error" : ""}`}
            value={form.name}
            onChange={handleChange}
            placeholder="Ví dụ: Phòng Công nghệ thông tin"
            maxLength={150}
          />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Mô tả</label>
          <textarea
            name="description"
            className="form-input"
            value={form.description}
            onChange={handleChange}
            rows="3"
            placeholder="Mô tả chức năng, nhiệm vụ của phòng ban..."
            maxLength={500}
            style={{ resize: "vertical" }}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Trạng thái</label>
          <select
            name="status"
            className="form-select"
            value={form.status}
            onChange={handleChange}
          >
            <option value="ACTIVE">Đang hoạt động</option>
            <option value="INACTIVE">Không hoạt động</option>
          </select>
        </div>

        <div className="department-form-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
            Hủy
          </button>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Đang lưu..." : isEdit ? "Cập nhật" : "Tạo mới"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default DepartmentForm;
