import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/global.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  const links = [
    { to: "/", label: "Početna" },
    { to: "/poslovi", label: "Poslovi" },
    { to: "/prakse", label: "Prakse" },
    { to: "/kompanije", label: "Kompanije" },
    { to: "/o-nama", label: "O nama" },
  ];

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">

        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">⚡</span>
          <span className="navbar__logo-text">Karijera<em>Hub</em></span>
        </Link>

        <nav className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`navbar__link ${location.pathname === to ? "navbar__link--active" : ""}`}
            >
              {label}
            </Link>
          ))}
          <div className="navbar__auth navbar__auth--mobile">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="navbar__btn navbar__btn--ghost">Odjava</button>
            ) : (
              <>
                <Link to="/login" className="navbar__btn navbar__btn--ghost">Prijava</Link>
                <Link to="/registracija" className="navbar__btn navbar__btn--solid">Registracija</Link>
              </>
            )}
          </div>
        </nav>

        <div className="navbar__auth navbar__auth--desktop">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="navbar__btn navbar__btn--ghost">Odjava</button>
          ) : (
            <>
              <Link to="/login" className="navbar__btn navbar__btn--ghost">Prijava</Link>
              <Link to="/registracija" className="navbar__btn navbar__btn--solid">Registracija</Link>
            </>
          )}
        </div>

        <button
          className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Otvori meni"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
};

export default Navbar;