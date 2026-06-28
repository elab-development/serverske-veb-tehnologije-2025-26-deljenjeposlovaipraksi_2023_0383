import "../../styles/global.css";

const steps = [
  {
    number: "01",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Kreiraj profil",
    desc: "Registruj se za 60 sekundi. Dodaj CV, veštine i oblasti koje te zanimaju.",
  },
  {
    number: "02",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    title: "Istraži oglase",
    desc: "Pretraži hiljade pozicija. Filtriraj po gradu, industriji ili tipu posla.",
  },
  {
    number: "03",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 2 11 13" />
        <path d="M22 2 15 22 11 13 2 9l20-7z" />
      </svg>
    ),
    title: "Prijavi se jednim klikom",
    desc: "Pošalji prijavu direktno — bez kopiranja podataka, bez gubljenja vremena.",
  },
  {
    number: "04",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M22 4 12 14.01l-3-3" />
      </svg>
    ),
    title: "Dobij posao",
    desc: "Prati status prijava i čekaj poziv. Tvoja nova karijera počinje ovde.",
  },
];

const HowItWorks = () => {
  return (
    <section className="hiw">
      <div className="hiw__inner">
        <div className="hiw__header">
          <span className="hiw__eyebrow">Jednostavno kao 1-2-3</span>
          <h2 className="hiw__title">Kako funkcioniše?</h2>
          <p className="hiw__subtitle">
            Od registracije do prvog intervjua — sve u četiri koraka.
          </p>
        </div>

        <div className="hiw__steps">
          {steps.map((step, i) => (
            <div className="hiw__step" key={i} style={{ "--i": i }}>
              <div className="hiw__step-number">{step.number}</div>
              <div className="hiw__step-icon-wrap">
                <span className="hiw__step-icon">{step.icon}</span>
                <div className="hiw__step-ring" />
              </div>
              <h3 className="hiw__step-title">{step.title}</h3>
              <p className="hiw__step-desc">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hiw__connector">
                  <div className="hiw__connector-line" />
                  <svg className="hiw__connector-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;