import { Link } from "react-router-dom";
import "../../styles/global.css";
 
const CTABanner = () => {
  return (
    <section className="cta-banner">
      <div className="cta-banner__bg">
        <div className="cta-banner__orb cta-banner__orb--1" />
        <div className="cta-banner__orb cta-banner__orb--2" />
        <div className="cta-banner__grid" />
      </div>
 
      <div className="cta-banner__inner">
 
        <div className="cta-banner__left">
          <span className="cta-banner__tag">Za kandidate</span>
          <h2 className="cta-banner__title">
            Spreman za<br />
            <span className="cta-banner__title-highlight">sledeći korak?</span>
          </h2>
          <p className="cta-banner__text">
            Hiljade poslova čeka. Kreiraj profil i prijavi se već danas.
          </p>
          <Link to="/registracija" className="cta-banner__btn cta-banner__btn--light">
            Počni besplatno
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
 
        <div className="cta-banner__divider" />
 
        <div className="cta-banner__right">
          <span className="cta-banner__tag cta-banner__tag--muted">Za poslodavce</span>
          <h2 className="cta-banner__title">
            Tražite pravi<br />
            <span className="cta-banner__title-highlight">kadar?</span>
          </h2>
          <p className="cta-banner__text">
            Objavite oglas i doprite do hiljada kvalifikovanih kandidata odmah.
          </p>
          <Link to="/registracija?tip=kompanija" className="cta-banner__btn cta-banner__btn--outline">
            Objavi oglas
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
 
      </div>
    </section>
  );
};
 
export default CTABanner;