function ProgramForm({ formData, departments, mentors, errors, loading, onChange, onSubmit, submitLabel, onCancel }) {
  return (
    <form className="program-form" onSubmit={onSubmit} noValidate>
      <div className="form-group">
        <label className="form-label">Tên chương trình *</label>
        <input
          name="name"
          className={`form-input ${errors.name ? "form-input-error" : ""}`}
          value={formData.name}
          onChange={onChange}
          placeholder="Ví dụ: Thực tập sinh ReactJS - Khóa 1"
        />
        {errors.name && <div className="form-error">{errors.name}</div>}
      </div>

      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "18px" }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Phòng ban *</label>
          <select
            name="departmentId"
            className={`form-select ${errors.departmentId ? "form-input-error" : ""}`}
            value={formData.departmentId}
            onChange={onChange}
          >
            <option value="">-- Chọn phòng ban --</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>{department.name}</option>
            ))}
          </select>
          {errors.departmentId && <div className="form-error">{errors.departmentId}</div>}
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Mentor *</label>
          <select
            name="mentorId"
            className={`form-select ${errors.mentorId ? "form-input-error" : ""}`}
            value={formData.mentorId}
            onChange={onChange}
          >
            <option value="">-- Chọn mentor --</option>
            {mentors.map((mentor) => (
              <option key={mentor.id} value={mentor.id}>{mentor.fullName || mentor.name}</option>
            ))}
          </select>
          {errors.mentorId && <div className="form-error">{errors.mentorId}</div>}
        </div>
      </div>

      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "18px" }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Ngày bắt đầu *</label>
          <input
            type="date"
            name="startDate"
            className={`form-input ${errors.date ? "form-input-error" : ""}`}
            value={formData.startDate}
            onChange={onChange}
          />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Ngày kết thúc *</label>
          <input
            type="date"
            name="endDate"
            className={`form-input ${errors.date ? "form-input-error" : ""}`}
            value={formData.endDate}
            onChange={onChange}
          />
        </div>
      </div>
      {errors.date && <div className="form-error" style={{ marginBottom: "18px" }}>{errors.date}</div>}

      <div className="form-group">
        <label className="form-label">Số lượng intern tối đa *</label>
        <input
          type="number"
          name="maxInterns"
          className={`form-input ${errors.maxInterns ? "form-input-error" : ""}`}
          value={formData.maxInterns}
          onChange={onChange}
          min="1"
        />
        {errors.maxInterns && <div className="form-error">{errors.maxInterns}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">Mô tả chương trình</label>
        <textarea
          name="description"
          className="form-input"
          value={formData.description}
          onChange={onChange}
          rows="4"
          placeholder="Mô tả nội dung đào tạo, yêu cầu công việc..."
          style={{ resize: "vertical" }}
        />
      </div>

      <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
        <button className="btn btn-primary" type="submit" disabled={loading} style={{ minWidth: "120px" }}>
          {loading ? "Đang lưu..." : submitLabel}
        </button>
        {onCancel && (
          <button className="btn btn-secondary" type="button" onClick={onCancel} disabled={loading} style={{ minWidth: "100px" }}>
            Hủy
          </button>
        )}
      </div>
    </form>
  );
}

export default ProgramForm;
