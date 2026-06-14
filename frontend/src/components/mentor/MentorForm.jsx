import { useCallback, useEffect, useState } from "react";
import { Modal } from "../common";
import { hrUserApi } from "../../api/mentorApi";

function MentorForm({ open, mentor, onClose, onSubmit, submitting }) {
  const isEdit = !!mentor;

  const [form, setForm] = useState({
    userId: "",
    position: "",
    expertise: "",
    maxInterns: 5,
    status: "ACTIVE",
  });
  const [mentorUsers, setMentorUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const loadMentorUsers = useCallback(async () => {
    setUsersLoading(true);
    try {
      const res = await hrUserApi.getUsers({ role: "MENTOR", size: 100 });
      if (res?.success) setMentorUsers(res.data?.items || []);
    } catch {
      setMentorUsers([]);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    setErrors({});
    if (isEdit) {
      setForm({
        userId: mentor.userId || "",
        position: mentor.position || "",
        expertise: mentor.expertise || "",
        maxInterns: mentor.maxInterns ?? 5,
        status: mentor.status || "ACTIVE",
      });
    } else {
      setForm({ userId: "", position: "", expertise: "", maxInterns: 5, status: "ACTIVE" });
      loadMentorUsers();
    }
  }, [
    open,
    isEdit,
    mentor?.userId,
    mentor?.position,
    mentor?.expertise,
    mentor?.maxInterns,
    mentor?.status,
    loadMentorUsers,
  ]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const errs = {};
    if (!isEdit && !form.userId) errs.userId = "Vui lòng chọn user MENTOR";
    if (!form.maxInterns || Number(form.maxInterns) < 1)
      errs.maxInterns = "Số intern tối đa phải ít nhất là 1";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const payload = {};
    if (!isEdit) payload.userId = Number(form.userId);
    if (form.position?.trim()) payload.position = form.position.trim();
    if (form.expertise?.trim()) payload.expertise = form.expertise.trim();
    payload.maxInterns = Number(form.maxInterns);
    if (isEdit) payload.status = form.status;
    onSubmit(payload);
  }

  return (
    <Modal
      open={open}
      title={isEdit ? "Chỉnh sửa mentor" : "Thêm mentor mới"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        {!isEdit && (
          <div className="form-group">
            <label className="form-label">
              User MENTOR <span style={{ color: "var(--color-danger)" }}>*</span>
            </label>
            {usersLoading ? (
              <p style={{ fontSize: 13, color: "var(--color-text-muted)", margin: "8px 0" }}>
                Đang tải danh sách user...
              </p>
            ) : (
              <select
                name="userId"
                className={`form-select${errors.userId ? " form-input-error" : ""}`}
                value={form.userId}
                onChange={handleChange}
              >
                <option value="">-- Chọn user --</option>
                {mentorUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.fullName} ({u.email})
                  </option>
                ))}
              </select>
            )}
            {errors.userId && <span className="form-error">{errors.userId}</span>}
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Vị trí</label>
          <input
            type="text"
            name="position"
            className="form-input"
            value={form.position}
            onChange={handleChange}
            placeholder="VD: Senior Developer"
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Chuyên môn</label>
          <input
            type="text"
            name="expertise"
            className="form-input"
            value={form.expertise}
            onChange={handleChange}
            placeholder="VD: React, Java, Python"
            maxLength={255}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Số intern tối đa <span style={{ color: "var(--color-danger)" }}>*</span>
          </label>
          <input
            type="number"
            name="maxInterns"
            className={`form-input${errors.maxInterns ? " form-input-error" : ""}`}
            value={form.maxInterns}
            onChange={handleChange}
            min="1"
          />
          {errors.maxInterns && <span className="form-error">{errors.maxInterns}</span>}
        </div>

        {isEdit && (
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
        )}

        <div className="mentor-form-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onClose}
            disabled={submitting}
          >
            Hủy
          </button>
          <button type="submit" className="btn btn-primary btn-sm" disabled={submitting}>
            {submitting ? "Đang lưu..." : isEdit ? "Cập nhật" : "Tạo mentor"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default MentorForm;
