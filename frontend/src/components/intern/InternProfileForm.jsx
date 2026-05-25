import { Input } from "../common";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  school: "",
  major: "",
  academicYear: "",
  gpa: "",
  birthDate: "",
};

function InternProfileForm({
  formData,
  errors = {},
  onChange,
  disabled = false,
}) {
  const data = { ...emptyForm, ...formData };
  const isLocked = disabled;

  return (
    <div className="intern-profile-form">
      <div className="intern-profile-form__grid">
        <Input
          label="Họ và tên"
          name="fullName"
          value={data.fullName}
          onChange={onChange}
          error={errors.fullName}
          disabled={isLocked}
          placeholder="Nguyễn Văn A"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={data.email}
          onChange={onChange}
          error={errors.email}
          disabled={isLocked}
          placeholder="email@example.com"
        />
        <Input
          label="Số điện thoại"
          name="phone"
          value={data.phone}
          onChange={onChange}
          error={errors.phone}
          disabled={isLocked}
          placeholder="0912345678"
        />
        <Input
          label="Trường"
          name="school"
          value={data.school}
          onChange={onChange}
          error={errors.school}
          disabled={isLocked}
        />
        <Input
          label="Ngành"
          name="major"
          value={data.major}
          onChange={onChange}
          error={errors.major}
          disabled={isLocked}
        />
        <Input
          label="Năm học"
          name="academicYear"
          value={data.academicYear}
          onChange={onChange}
          error={errors.academicYear}
          disabled={isLocked}
          placeholder="Năm 3"
        />
        <Input
          label="GPA"
          name="gpa"
          type="number"
          step="0.01"
          min="0"
          max="4"
          value={data.gpa}
          onChange={onChange}
          error={errors.gpa}
          disabled={isLocked}
        />
        <Input
          label="Ngày sinh"
          name="birthDate"
          type="date"
          value={data.birthDate}
          onChange={onChange}
          error={errors.birthDate}
          disabled={isLocked}
        />
      </div>
    </div>
  );
}

export { emptyForm };
export default InternProfileForm;
