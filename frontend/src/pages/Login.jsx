import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../components/Register/FormInput";
import FormButton from "../components/Register/FormButton";
import "../styles/global.css";
 
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
 
  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
 
  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email je obavezan";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email nije validan";
    if (!form.password) e.password = "Lozinka je obavezna";
    return e;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/api/login',{email, password});
      localStorage.post('token', response.data.token);
      navigate('/home');
    }catch(error){
      alert("Pogresan email ili lozinka");
    }
  };
 
  return (
    <div className="login">
 
      {/* Left panel */}
      <div className="login__panel">
        <div className="login__panel-orb login__panel-orb--1" />
        <div className="login__panel-orb login__panel-orb--2" />
        <div className="login__panel-grid" />
 
        <div className="login__panel-content">
          <Link to="/" className="login__logo">
            <span>⚡</span>
            <span>Karijera<em>Hub</em></span>
          </Link>
 
          <div className="login__panel-text">
            <h2 className="login__panel-title">
              Dobro došao<br />
              <span>nazad.</span>
            </h2>
            <p className="login__panel-sub">
              Prijavi se i nastavi tamo gde si stao. Hiljade novih oglasa čeka.
            </p>
          </div>
 
          {/* Register CTA */}
          <div className="login__panel-register">
            <p className="login__panel-register-text">Nemaš nalog?</p>
            <Link to="/registracija" className="login__panel-register-btn">
              Kreiraj besplatan nalog
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="login__panel-register-hint">
              Besplatno · Bez kreditne kartice · Za 60 sekundi
            </p>
          </div>
        </div>
      </div>
 
      {/* Right panel — forma */}
      <div className="login__form-side">
        <Link to="/" className="login__back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Nazad na početnu
        </Link>
 
        <div className="login__form-wrap">
          <div className="login__form-header">
            <h1 className="login__form-title">Prijavi se</h1>
            <p className="login__form-sub">
              Nemaš nalog?{" "}
              <Link to="/registracija" className="login__form-link">
                Registruj se besplatno
              </Link>
            </p>
          </div>
 
          <form className="login__form" onSubmit={handleSubmit} noValidate>
            <FormInput
              label="Email adresa"
              name="email"
              type="email"
              value={form.email}
              onChange={handle}
              placeholder="ime@primer.rs"
              error={errors.email}
              required
              icon="✉️"
            />
            <FormInput
              label="Lozinka"
              name="password"
              type="password"
              value={form.password}
              onChange={handle}
              placeholder="Unesite lozinku"
              error={errors.password}
              required
              icon="🔒"
            />
 
            <div className="login__forgot">
              <Link to="/zaboravljena-lozinka" className="login__forgot-link">
                Zaboravili ste lozinku?
              </Link>
            </div>
 
            <FormButton type="submit" variant="primary" fullWidth loading={loading}>
              Prijavi se →
            </FormButton>
          </form>
 
          {/* Divider */}
          <div className="login__divider">
            <span />
            <p>ili nastavi sa</p>
            <span />
          </div>
 
          {/* Social login */}
          <div className="login__social">
            <button className="login__social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="login__social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </button>
          </div>
 
        </div>
      </div>
    </div>
  );
};
 
export default Login;