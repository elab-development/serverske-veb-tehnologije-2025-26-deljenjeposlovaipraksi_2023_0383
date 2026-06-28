import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../components/Register/FormInput";
import FormButton from "../components/Register/FormButton";
import "../styles/global.css";

const Register = () => {
  const [type, setType] = useState("kandidat");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    education: "",
    github_url: "",
    companyName: "",
    companySize: "",
    website: "",
    location: "",
    description: "",
  });

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
    else if (form.password.length < 8) e.password = "Minimum 8 karaktera";
    if (form.password !== form.passwordConfirm) e.passwordConfirm = "Lozinke se ne poklapaju";

    if (type === "kandidat") {
      if (!form.firstName) e.firstName = "Ime je obavezno";
      if (!form.lastName) e.lastName = "Prezime je obavezno";
    } else {
      if (!form.companyName) e.companyName = "Naziv kompanije je obavezan";
    }
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setLoading(true);

    try {
      const body = type === "kandidat" ? {
        email: form.email,
        password: form.password,
        role: "job_seeker",
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
        location: form.city,
        education: form.education,
        github_url: form.github_url,
      } : {
        email: form.email,
        password: form.password,
        role: "company",
        company_name: form.companyName,
        website: form.website,
        company_size: form.companySize,
        location: form.location,
        description: form.description,
      };

      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message || 'Greška pri registraciji.' });
        }
        return;
      }

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('role', data.data.role);

      window.location.href = '/home';

    } catch (error) {
      setErrors({ general: 'Greška pri povezivanju sa serverom.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="register__panel">
        <div className="register__panel-orb register__panel-orb--1" />
        <div className="register__panel-orb register__panel-orb--2" />
        <div className="register__panel-grid" />
        <div className="register__panel-content">
          <Link to="/" className="register__logo">
            <span>⚡</span>
            <span>Karijera<em>Hub</em></span>
          </Link>
          <div className="register__panel-text">
            <h2 className="register__panel-title">
              Tvoja karijera<br />
              počinje <span>ovde.</span>
            </h2>
            <p className="register__panel-sub">
              Pridruži se hiljadama kandidata i kompanija koji svakodnevno koriste KarijeraHub.
            </p>
          </div>
          <div className="register__panel-stats">
            <div className="register__panel-stat">
              <span className="register__panel-stat-num">13K+</span>
              <span className="register__panel-stat-label">Aktivnih oglasa</span>
            </div>
            <div className="register__panel-stat-div" />
            <div className="register__panel-stat">
              <span className="register__panel-stat-num">500+</span>
              <span className="register__panel-stat-label">Kompanija</span>
            </div>
            <div className="register__panel-stat-div" />
            <div className="register__panel-stat">
              <span className="register__panel-stat-num">95%</span>
              <span className="register__panel-stat-label">Zadovoljnih</span>
            </div>
          </div>
        </div>
      </div>

      <div className="register__form-side">
        <div className="register__form-wrap">
          <Link to="/" className="register__back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Nazad na početnu
          </Link>

          <div className="register__form-header">
            <h1 className="register__form-title">Kreiraj nalog</h1>
            <p className="register__form-sub">
              Već imaš nalog?{" "}
              <Link to="/login" className="register__form-link">Prijavi se</Link>
            </p>
          </div>

          <div className="register__toggle">
            <button
              className={`register__toggle-btn ${type === "kandidat" ? "register__toggle-btn--active" : ""}`}
              onClick={() => setType("kandidat")}
              type="button"
            >
              👤 Kandidat
            </button>
            <button
              className={`register__toggle-btn ${type === "kompanija" ? "register__toggle-btn--active" : ""}`}
              onClick={() => setType("kompanija")}
              type="button"
            >
              🏢 Kompanija
            </button>
          </div>

          <form className="register__form" onSubmit={handleSubmit} noValidate>

            {type === "kandidat" && (
              <>
                <div className="register__row">
                  <FormInput label="Ime" name="firstName" value={form.firstName} onChange={handle} placeholder="Marko" error={errors.firstName} required icon="👤" />
                  <FormInput label="Prezime" name="lastName" value={form.lastName} onChange={handle} placeholder="Marković" error={errors.lastName} required icon="👤" />
                </div>
                <div className="register__row">
                  <FormInput label="Telefon" name="phone" type="tel" value={form.phone} onChange={handle} placeholder="+381 60 000 0000" icon="📱" />
                  <FormInput label="Grad" name="city" value={form.city} onChange={handle} placeholder="Beograd" icon="📍" />
                </div>
                <FormInput label="Obrazovanje" name="education" value={form.education} onChange={handle} placeholder="Fakultet organizacionih nauka" icon="🎓" />
                <FormInput label="GitHub URL" name="github_url" value={form.github_url} onChange={handle} placeholder="https://github.com/korisnik" icon="💻" />
              </>
            )}

            {type === "kompanija" && (
              <>
                <FormInput label="Naziv kompanije" name="companyName" value={form.companyName} onChange={handle} placeholder="TechCorp d.o.o." error={errors.companyName} required icon="🏢" />
                <div className="register__row">
                  <FormInput label="Web sajt" name="website" value={form.website} onChange={handle} placeholder="www.kompanija.rs" icon="🌐" />
                  <FormInput label="Broj zaposlenih" name="companySize" value={form.companySize} onChange={handle} placeholder="50 – 200" icon="👥" />
                </div>
                <FormInput label="Lokacija" name="location" value={form.location} onChange={handle} placeholder="Beograd" icon="📍" />
                <FormInput label="Opis kompanije" name="description" value={form.description} onChange={handle} placeholder="Kratki opis vaše kompanije..." icon="📝" />
              </>
            )}

            <FormInput label="Email adresa" name="email" type="email" value={form.email} onChange={handle} placeholder="ime@primer.rs" error={errors.email} required icon="✉️" />
            <FormInput label="Lozinka" name="password" type="password" value={form.password} onChange={handle} placeholder="Minimum 8 karaktera" error={errors.password} required icon="🔒" />
            <FormInput label="Potvrdi lozinku" name="passwordConfirm" type="password" value={form.passwordConfirm} onChange={handle} placeholder="Ponovi lozinku" error={errors.passwordConfirm} required icon="🔒" />

            <p className="register__terms">
              Registracijom prihvataš naše{" "}
              <Link to="/uslovi" className="register__form-link">Uslove korišćenja</Link>{" "}
              i{" "}
              <Link to="/privatnost" className="register__form-link">Politiku privatnosti</Link>.
            </p>

            {errors.general && (
              <div className="login__error">
                {errors.general}
              </div>
            )}

            <FormButton type="submit" variant="primary" fullWidth loading={loading}>
              {type === "kandidat" ? "Kreiraj nalog" : "Registruj kompaniju"} →
            </FormButton>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;