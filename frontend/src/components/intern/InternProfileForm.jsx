import { Button, Input } from "../common";

function InternProfileForm({
  formData,
  errors,
  loading,
  submitLabel = "Lưu hồ sơ",
  onChange,
  onSubmit,
  disabled = false,
}) {
  const FormContainer = onSubmit ? "form" : "div";

  return (
    <FormContainer className="intern-form" onSubmit={onSubmit} noValidate={onSubmit ? true : undefined}>
      <div className="intern-form-grid">
        <Input
          label="Họ tên"
          name="fullName"
          value={formData.fullName}
          placeholder="Nhập họ tên"
          onChange={onChange}
          error={errors.fullName}
          disabled={disabled}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          placeholder="Nhập email"
          onChange={onChange}
          error={errors.email}
          disabled={disabled}
        />

        <Input
          label="Số điện thoại"
          name="phone"
          value={formData.phone}
          placeholder="VD: 0912345678"
          onChange={onChange}
          error={errors.phone}
          disabled={disabled}
        />

        <Input
          label="Trường học"
          name="school"
          value={formData.school}
          placeholder="Nhập tên trường học"
          onChange={onChange}
          error={errors.school}
          disabled={disabled}
        />

        <Input
          label="Ngành học"
          name="major"
          value={formData.major}
          placeholder="Nhập ngành học"
          onChange={onChange}
          error={errors.major}
          disabled={disabled}
        />

        <Input
          label="Năm học"
          name="academicYear"
          value={formData.academicYear}
          placeholder="VD: Năm 4"
          onChange={onChange}
          error={errors.academicYear}
          disabled={disabled}
        />

        <Input
          label="GPA"
          type="number"
          name="gpa"
          value={formData.gpa}
          placeholder="VD: 3.2"
          onChange={onChange}
          error={errors.gpa}
          min="0"
          max="4"
          step="0.01"
          disabled={disabled}
        />
      </div>

      {onSubmit && !disabled && (
        <div className="intern-form-actions">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="btn-loading-spinner" />
                Đang xử lý...
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </div>
      )}
    </FormContainer>
  );
}

export default InternProfileForm;
