import "../../styles/global.css";
 
const features = [
  {
    icon: "🎯",
    title: "Precizno matchovanje",
    desc: "Algoritam povezuje tvoj profil sa oglasima koji zaista odgovaraju tvojim veštinama.",
  },
  {
    icon: "⚡",
    title: "Brza prijava",
    desc: "Jedan klik — CV ide direktno do poslodavca. Bez komplikovanih formulara.",
  },
  {
    icon: "🔔",
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
          <a href="/o-nama" className="mission__cta">
            Saznaj više o nama
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
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