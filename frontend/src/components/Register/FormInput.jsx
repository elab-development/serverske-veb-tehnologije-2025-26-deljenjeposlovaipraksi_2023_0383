import "../../styles/global.css";
 
const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  icon = null,
}) => {
  return (
    <div className={`form-input ${error ? "form-input--error" : ""}`}>
      {label && (
        <label className="form-input__label" htmlFor={name}>
          {label}
          {required && <span className="form-input__required">*</span>}
        </label>
      )}
      <div className="form-input__wrap">
        {icon && <span className="form-input__icon">{icon}</span>}
        <input
          className={`form-input__field ${icon ? "form-input__field--icon" : ""}`}
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
        />
      </div>
      {error && <p className="form-input__error">{error}</p>}
    </div>
  );
};
 
export default FormInput;