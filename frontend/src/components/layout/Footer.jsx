import { Link } from "react-router-dom";
import "../../styles/global.css";
 
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
 
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span>⚡</span>
            <span>Karijera<em>Hub</em></span>
          </Link>
          <p className="footer__tagline">
            Pronađi posao ili praksu koja odgovara tvojim ambicijama.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="LinkedIn" className="footer__social">in</a>
            <a href="#" aria-label="Instagram" className="footer__social">ig</a>
            <a href="#" aria-label="Twitter" className="footer__social">tw</a>
          </div>
        </div>
 
        <div className="footer__col">
          <h4 className="footer__heading">Oglasi</h4>
          <Link to="/poslovi" className="footer__link">Poslovi</Link>
          <Link to="/prakse" className="footer__link">Prakse</Link>
          <Link to="/kompanije" className="footer__link">Kompanije</Link>
        </div>
 
        <div className="footer__col">
          <h4 className="footer__heading">Nalog</h4>
          <Link to="/login" className="footer__link">Prijava</Link>
          <Link to="/registracija" className="footer__link">Registracija</Link>
          <Link to="/profil" className="footer__link">Moj profil</Link>
        </div>
 
        <div className="footer__col">
          <h4 className="footer__heading">Kompanija</h4>
          <Link to="/o-nama" className="footer__link">O nama</Link>
          <Link to="/kontakt" className="footer__link">Kontakt</Link>
          <Link to="/faq" className="footer__link">Česta pitanja</Link>
        </div>
 
      </div>
 
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} KarijeraHub. Sva prava zadržana.</p>
        <div className="footer__legal">
          <Link to="/privatnost" className="footer__link">Privatnost</Link>
          <Link to="/uslovi" className="footer__link">Uslovi korišćenja</Link>
        </div>
      </div>
    </footer>
  );
};
 
export default Footer;