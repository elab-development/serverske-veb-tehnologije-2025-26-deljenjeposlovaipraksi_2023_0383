import { useState, useEffect } from "react";
import JobListCard from "../components/Jobs/JobListCard";
import "../styles/global.css";
 
const SORT_OPTIONS = ["Najnovije", "Najstarije", "Plata (rastuće)", "Plata (opadajuće)"];
const WORK_TYPES = ["Sve", "Remote", "Hibrid", "Kancelarija"];
 
const Jobs = () => {
  const [search, setSearch] = useState("");
  const [workType, setWorkType] = useState("Sve");
  const [sort, setSort] = useState("Najnovije");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/job-listings", {
      headers: {
        "Accept": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greška:", err);
        setLoading(false);
      });
  }, []);
 
  const filtered = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.company_name.toLowerCase().includes(search.toLowerCase());
    const matchType = workType === "Sve" || job.type === workType;
    return matchSearch && matchType;
  });

  if (loading) return <div>Učitavanje...</div>;
 
  return (
    <div className="jobs-page">
 
      {/* Hero */}
      <div className="jobs-page__hero">
        <div className="jobs-page__hero-bg" />
        <div className="jobs-page__hero-inner">
          <h1 className="jobs-page__hero-title">
            Pronađi posao koji<br />
            <span>te inspiriše.</span>
          </h1>
          <p className="jobs-page__hero-sub">
            Pretraži {jobs.length}+ aktivnih oglasa širom Srbije.
          </p>
          <div className="jobs-page__search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="jobs-page__search"
              placeholder="Pozicija, kompanija ili tehnologija..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
 
      <div className="jobs-page__content">
 
        {/* Toolbar */}
        <div className="jobs-page__toolbar">
          <div className="jobs-page__result-count">
            <span className="jobs-page__result-num">{filtered.length}</span>
            <span className="jobs-page__result-label">rezultata</span>
          </div>
 
          <div className="jobs-page__filters">
            <div className="jobs-page__work-types">
              {WORK_TYPES.map((w) => (
                <button
                  key={w}
                  className={`jobs-page__wt-btn ${workType === w ? "jobs-page__wt-btn--active" : ""}`}
                  onClick={() => setWorkType(w)}
                >
                  {w}
                </button>
              ))}
            </div>
 
            <div className="jobs-page__sort-wrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M7 12h10M11 18h2" />
              </svg>
              <select
                className="jobs-page__sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
 
        {/* Job list */}
        <div className="jobs-page__list">
          {filtered.length > 0 ? (
            filtered.map((job, i) => (
              <div key={job.id} style={{ animationDelay: `${i * 0.07}s` }}>
                <JobListCard
                  id={job.id}
                  title={job.title}
                  company={job.company?.company_name ?? ""}
                  location={job.location ?? ""}
                  workType={job.type ?? ""}
                  jobType={job.type ?? ""}
                  salary={job.salary_min && job.salary_max ? `${job.salary_min}€ – ${job.salary_max}€` : ""}
                  postedAt={job.created_at ? new Date(job.created_at).toLocaleDateString("sr-RS") : ""}
                  tags={[]}
                  description={job.description ?? ""}
                />
              </div>
            ))
          ) : (
            <div className="jobs-page__empty">
              <span className="jobs-page__empty-icon">🔍</span>
              <p>Nema rezultata za "<strong>{search}</strong>"</p>
            </div>
          )}
        </div>
 
      </div>
    </div>
  );
};
 
export default Jobs;