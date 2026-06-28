import "../../styles/global.css";
import { Link } from "react-router-dom";

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: "Precizno matchovanje",
    desc: "Algoritam povezuje tvoj profil sa oglasima koji zaista odgovaraju tvojim veštinama.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Brza prijava",
    desc: "Jedan klik — CV ide direktno do poslodavca. Bez komplikovanih formulara.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    title: "Obaveštenja u realnom vremenu",
    desc: "Budi prvi koji se prijavljuje kada se pojavi oglas koji tražiš.",
  },
];

const MissionSection = () => {
  return (
    <section className="mission">
      <div className="mission__bg">
        <div className="mission__orb mission__orb--1" />
        <div className="mission__orb mission__orb--2" />
        <div className="mission__orb mission__orb--3" />
        <div className="mission__lines" />
      </div>

      <div className="mission__inner">
        <div className="mission__left">
          <span className="mission__eyebrow">Naša misija</span>
          <h2 className="mission__title">
            Karijera koja te
            <br />
            <span className="mission__title-accent">čeka — ne traži.</span>
          </h2>
          <p className="mission__text">
            Naš zadatak je da proces pronalaska posla učinimo jednostavnim, brzim i
            ljudskim. Verujemo da svaka osoba zaslužuje šansu da pronađe posao koji
            je ispunjava — a svaki poslodavac kandidata koji odgovara njihovoj viziji.
          </p>
          <Link to="/o-nama" className="mission__cta">
            Saznaj više o nama
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="mission__right">
          {features.map((f, i) => (
            <div className="mission__card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="mission__card-icon">{f.icon}</div>
              <div className="mission__card-body">
                <h3 className="mission__card-title">{f.title}</h3>
                <p className="mission__card-desc">{f.desc}</p>
              </div>
              <div className="mission__card-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;