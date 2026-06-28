import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
 
const candidateReasons = [
  { icon: "🎯", title: "Direktna veza sa poslodavcima", desc: "Nema posrednika. Prijava ide direktno do hiring menadžera ili osnivača." },
  { icon: "💰", title: "Sve informacije unapred", desc: "Plata i beneficije vidljivi pre prijave. Nikakvih skrivenih detalja." },
  { icon: "⚡", title: "Prijava jednim klikom", desc: "Tvoj profil je sve što ti treba. Bez cover lettera — samo klikni." },
  { icon: "🔍", title: "Ekskluzivni oglasi", desc: "Hiljade pozicija koje ne možeš naći nigde drugde u regionu." },
];
 
const companyReasons = [
  { icon: "👥", title: "3.5K+ aktivnih kandidata", desc: "Pristup bazi kandidata koji aktivno traže posao u Srbiji i regionu." },
  { icon: "🚀", title: "Postavi oglas za 10 minuta", desc: "Oglas ide live za nekoliko minuta, bez komplikovanih procesa." },
  { icon: "📊", title: "Analitika u realnom vremenu", desc: "Prati broj prijava i kvalitet kandidata odmah nakon objave." },
  { icon: "🤝", title: "Direktna komunikacija", desc: "Razgovaraj sa kandidatima bez posrednika. Brže zapošljavanje." },
];
 
const stats = [
  { num: "13K+", label: "Aktivnih oglasa" },
  { num: "3.5K+", label: "Kandidata" },
  { num: "500+", label: "Kompanija" },
  { num: "95%", label: "Zadovoljstvo" },
];
 
const About = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
 
  return (
    <div className="ab">
 
      {/* ===== HERO ===== */}
      <section className="ab-hero">
        <div className="ab-hero__inner">
          <div className="ab-hero__label">O nama</div>
          <h1 className="ab-hero__title">
            Gde talenti i prilike<br />
            <span>se sreću.</span>
          </h1>
          <p className="ab-hero__sub">
            KarijeraHub je vodeća platforma za traženje posla u Srbiji.
            Spajamo ambiciozne ljude sa kompanijama koje grade budućnost —
            brzo, transparentno i bez kompromisa.
          </p>
          <div className="ab-hero__actions">
            <Link to="/poslovi" className="ab-hero__btn-primary">Pronađi posao →</Link>
            <Link to="/registracija?tip=kompanija" className="ab-hero__btn-ghost">Objavi oglas</Link>
          </div>
        </div>
 
        {/* Stats strip */}
        <div className="ab-stats">
          {stats.map((s, i) => (
            <div className="ab-stat" key={i}>
              <span className="ab-stat__num">{s.num}</span>
              <span className="ab-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
 
      {/* ===== MISSION ===== */}
      <section className="ab-mission reveal">
        <div className="ab-mission__inner">
          <div className="ab-mission__left">
            <span className="ab-tag">Naša misija</span>
            <h2 className="ab-mission__title">
              Pronalazak posla ne bi<br />
              trebalo da bude<br />
              komplikovan.
            </h2>
          </div>
          <div className="ab-mission__right">
            <p>
              Nastali smo 2021. iz jednostavne frustracije — pronalazak posla je bio
              previše spor, previše nepersonalizovan i previše zamoran. Odlučili smo
              da to promenimo jednom zauvek.
            </p>
            <p>
              Danas KarijeraHub pomaže hiljadama kandidata i kompanija u Srbiji i regionu.
              Bilo da tražiš prvo zaposlenje ili gradite tim koji će promeniti industriju —
              mi smo tu da to učinimo jednostavnim.
            </p>
            <div className="ab-mission__chips">
              <span>🇷🇸 Srbija & region</span>
              <span>⚡ Osnovan 2021.</span>
              <span>🏆 #1 job platforma</span>
            </div>
          </div>
        </div>
      </section>
 
      {/* ===== DIVIDER ===== */}
      <div className="ab-divider" />
 
      {/* ===== FOR CANDIDATES ===== */}
      <section className="ab-section reveal">
        <div className="ab-section__inner">
          <div className="ab-section__header">
            <span className="ab-tag">Za kandidate</span>
            <h2 className="ab-section__title">
              Zašto kandidati biraju<br />KarijeraHub
            </h2>
            <Link to="/registracija" className="ab-section__cta">
              Kreiraj profil →
            </Link>
          </div>
          <div className="ab-section__grid">
            {candidateReasons.map((r, i) => (
              <div className="ab-card" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="ab-card__icon">{r.icon}</span>
                <h3 className="ab-card__title">{r.title}</h3>
                <p className="ab-card__desc">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ===== MARQUEE ===== */}
      <div className="ab-marquee">
        <div className="ab-marquee__track">
          {[
            "Senior Developer", "UI/UX Designer", "Marketing Manager",
            "Data Analyst", "DevOps Engineer", "Product Manager",
            "Backend Developer", "Frontend Developer", "Project Manager",
            "UX Researcher", "Senior Developer", "UI/UX Designer",
            "Marketing Manager", "Data Analyst", "DevOps Engineer",
            "Product Manager", "Backend Developer", "Frontend Developer",
          ].map((item, i) => (
            <span key={i} className="ab-marquee__item">
              {item} <span className="ab-marquee__sep">·</span>
            </span>
          ))}
        </div>
      </div>
 
      {/* ===== FOR COMPANIES ===== */}
      <section className="ab-section ab-section--gray reveal">
        <div className="ab-section__inner">
          <div className="ab-section__header">
            <span className="ab-tag">Za kompanije</span>
            <h2 className="ab-section__title">
              Zašto kompanije biraju<br />KarijeraHub
            </h2>
            <Link to="/registracija?tip=kompanija" className="ab-section__cta">
              Objavi oglas →
            </Link>
          </div>
          <div className="ab-section__grid">
            {companyReasons.map((r, i) => (
              <div className="ab-card" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="ab-card__icon">{r.icon}</span>
                <h3 className="ab-card__title">{r.title}</h3>
                <p className="ab-card__desc">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ===== FINAL CTA ===== */}
      <section className="ab-cta reveal">
        <div className="ab-cta__inner">
          <h2 className="ab-cta__title">
            Spreman za sledeći korak?
          </h2>
          <p className="ab-cta__sub">
            Besplatno. Bez kreditne kartice. Za 60 sekundi.
          </p>
          <div className="ab-cta__btns">
            <Link to="/registracija" className="ab-cta__btn-primary">
              Tražim posao →
            </Link>
            <Link to="/registracija?tip=kompanija" className="ab-cta__btn-ghost">
              Tražim kadar →
            </Link>
          </div>
        </div>
      </section>
 
    </div>
  );
};
 
export default About;