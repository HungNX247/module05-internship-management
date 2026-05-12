import "../../styles/common-components.css";

function Input({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  error,
}) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}

      <input
        className={`form-input ${error ? "form-input-error" : ""}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />

      {error && <div className="form-error">{error}</div>}
    </div>
  );
}

export default Input;
