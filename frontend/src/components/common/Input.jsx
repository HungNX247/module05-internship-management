import "../../styles/common-components.css";

function Input({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  error,
  icon,
  className = "",
  children
}) {
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="form-label">{label}</label>}

      <div className="input-wrapper">
        {icon && <div className="input-icon">{icon}</div>}

        <input
          className={`form-input ${error ? "form-input-error" : ""} ${icon ? "has-icon" : ""}`}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />

        {children}
      </div>

      {error && <div className="form-error">{error}</div>}
    </div>
  );
}

export default Input;
