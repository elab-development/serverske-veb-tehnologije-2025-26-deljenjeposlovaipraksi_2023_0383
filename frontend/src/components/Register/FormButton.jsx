import "../../styles/global.css";
 
const FormButton = ({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={`form-btn form-btn--${variant} ${fullWidth ? "form-btn--full" : ""} ${loading ? "form-btn--loading" : ""}`}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <span className="form-btn__spinner" />
      ) : (
        children
      )}
    </button>
  );
};
 
export default FormButton;
 