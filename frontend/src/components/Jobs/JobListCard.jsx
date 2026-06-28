import { useState } from "react";
import "../../styles/global.css";
 
const JobListCard = ({
  id = 1,
  title = "Senior Frontend Developer",
  company = "TechCorp Solutions",
  companyLogo = null,
  location = "Beograd",
  workType = "Hibrid",
  jobType = "Puno radno vreme",
  salary = "2 500€ – 3 800€",
  postedAt = "14.05.2026",
  tags = ["React", "TypeScript"],
  description = "Tražimo iskusnog frontend developera koji će raditi na razvoju modernih web aplikacija...",
  isNew = false,
  isUrgent = false,
}) => {
  const [saved, setSaved] = useState(false);

  const handleApply = async() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if(!token){
      window.location.href = '/login';
      return;
    }

    if(role !== 'job_seeker'){
      alert('Samo kandidati mogu da se prijave na oglas');
      return;
    }

    try{
      const response = await fetch('http://127.0.0.1:8000/api/job-seeker/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({job_listing_id: id})
      });

      const data = await response.json();

      if(!response.ok){
        alert(data.message || 'Greska pri prijavi. ');
        return;
      }
      
      alert('Uspešno ste se prijavili na oglas!');
    }catch (error) {
      alert('Greška pri povezivanju sa serverom.');
    }
  };
 
  const initials = company
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
 
  return (
    <article className="jlc">
      {/* Left accent bar */}
      <div className="jlc__bar" />
 
      <div className="jlc__inner">
        {/* Top row */}
        <div className="jlc__top">
          <div className="jlc__badges">
            {isNew && <span className="jlc__badge jlc__badge--new">Novo</span>}
            {isUrgent && <span className="jlc__badge jlc__badge--urgent">Hitno</span>}
          </div>
          <button
            className={`jlc__save ${saved ? "jlc__save--active" : ""}`}
            onClick={() => setSaved(!saved)}
            aria-label={saved ? "Ukloni iz sačuvanih" : "Sačuvaj"}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
 
        {/* Main content */}
        <div className="jlc__body">
          <div className="jlc__info">
            <h2 className="jlc__title">{title}</h2>
 
            <div className="jlc__meta">
              <span className="jlc__meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                {company}
              </span>
              <span className="jlc__meta-dot" />
              <span className="jlc__meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {location} · {workType}
              </span>
              <span className="jlc__meta-dot" />
              <span className="jlc__meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {postedAt}
              </span>
            </div>
 
            <p className="jlc__desc">{description}</p>
 
            <div className="jlc__tags">
              {tags.map((tag) => (
                <span key={tag} className="jlc__tag">{tag}</span>
              ))}
              <span className="jlc__tag jlc__tag--type">{jobType}</span>
            </div>
          </div>
 
          {/* Right side */}
          <div className="jlc__right">
            <div className="jlc__logo">
              {companyLogo ? (
                <img src={companyLogo} alt={company} />
              ) : (
                <span className="jlc__logo-initials">{initials}</span>
              )}
            </div>
            <div className="jlc__salary">{salary}</div>
            <button className="jlc__apply" onClick={handleApply}>
              Prijavi se
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
 
export default JobListCard;