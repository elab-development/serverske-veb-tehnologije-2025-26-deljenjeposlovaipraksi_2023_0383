import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/global.css";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/job-listings/${id}`, {
      headers: { 'Accept': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleApply = async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      window.location.href = '/login';
      return;
    }

    if (role !== 'job_seeker') {
      setMessage('Samo kandidati mogu da se prijave na oglas.');
      return;
    }

    setApplying(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/job-seeker/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ job_listing_id: id })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Greška pri prijavi.');
        return;
      }

      setMessage('Uspešno ste se prijavili na oglas!');
    } catch (error) {
      setMessage('Greška pri povezivanju sa serverom.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="jd-page">
        <div className="jd-page__loading">Učitavanje...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="jd-page">
        <div className="jd-page__loading">Oglas nije pronađen.</div>
      </div>
    );
  }

  const initials = job.company?.company_name
    ? job.company.company_name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="jd-page">
      <div className="jd-page__hero">
        <div className="jd-page__hero-bg" />
        <div className="jd-page__hero-inner">
          <Link to="/poslovi" className="jd-page__back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Svi oglasi
          </Link>

          <div className="jd-page__hero-top">
            <div className="jd-page__logo">
              <span className="jd-page__logo-initials">{initials}</span>
            </div>
            <div className="jd-page__hero-text">
              <h1 className="jd-page__title">{job.title}</h1>
              <p className="jd-page__company">{job.company?.company_name}</p>
            </div>
          </div>

          <div className="jd-page__meta">
            <span className="jd-page__meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {job.location || "Nije navedeno"}
            </span>
            <span className="jd-page__meta-dot" />
            <span className="jd-page__meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              {job.type}
            </span>
            {job.experience_level && (
              <>
                <span className="jd-page__meta-dot" />
                <span className="jd-page__meta-item">{job.experience_level}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="jd-page__content">
        <div className="jd-page__main">
          <section className="jd-page__section">
            <h2 className="jd-page__section-title">Opis pozicije</h2>
            <p className="jd-page__description">{job.description}</p>
          </section>
        </div>

        <aside className="jd-page__sidebar">
          <div className="jd-page__card">
            {(job.salary_min || job.salary_max) && (
              <div className="jd-page__salary">
                {job.salary_min}€ – {job.salary_max}€
              </div>
            )}

            {message && <div className="jd-page__message">{message}</div>}

            <button
              className="jd-page__apply"
              onClick={handleApply}
              disabled={applying}
            >
              {applying ? "Slanje..." : "Prijavi se"}
              {!applying && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default JobDetails;