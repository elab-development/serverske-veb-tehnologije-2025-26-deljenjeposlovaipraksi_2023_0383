import { useState } from "react";
import JobListCard from "../components/Jobs/JobListCard";
import "../styles/global.css";
 
const ALL_JOBS = [
  { id: 1, title: "Senior Frontend Developer", company: "TechFlow Systems", location: "Beograd", workType: "Remote", jobType: "Puno radno vreme", salary: "3 000€ – 4 500€", postedAt: "12.05.2026", tags: ["React", "TypeScript", "Next.js"], description: "Tražimo iskusnog frontend developera za rad na SaaS platformi. Rad u modernom tech stacku sa naglaskom na performance i UX.", isNew: true, isUrgent: false },
  { id: 2, title: "UI/UX Designer", company: "Nova Vizija d.o.o.", location: "Novi Sad", workType: "Hibrid", jobType: "Puno radno vreme", salary: "2 000€ – 3 000€", postedAt: "13.05.2026", tags: ["Figma", "Prototyping", "Design Systems"], description: "Dizajner koji će kreirati korisničke interfejse za mobilne i web aplikacije. Odlična sloboda u kreiranju rešenja.", isNew: true, isUrgent: false },
  { id: 3, title: "Full Stack Developer", company: "DataStream Analytics", location: "Beograd", workType: "Kancelarija", jobType: "Puno radno vreme", salary: "2 800€ – 4 000€", postedAt: "10.05.2026", tags: ["Laravel", "Vue.js", "MySQL"], description: "Razvoj i održavanje web aplikacija za analitiku podataka. Tim od 12 developera, agilna metodologija.", isNew: false, isUrgent: true },
  { id: 4, title: "Marketing Specialist", company: "GrowthLab Agency", location: "Beograd", workType: "Hibrid", jobType: "Puno radno vreme", salary: "1 200€ – 1 800€", postedAt: "11.05.2026", tags: ["SEO", "Google Ads", "Content"], description: "Upravljanje digitalnim marketingom za klijente iz regiona. Kreativna agencija sa dinamičnim timom.", isNew: false, isUrgent: false },
  { id: 5, title: "DevOps Engineer", company: "CloudBase d.o.o.", location: "Remote", workType: "Remote", jobType: "Puno radno vreme", salary: "3 500€ – 5 000€", postedAt: "09.05.2026", tags: ["Docker", "Kubernetes", "AWS"], description: "Održavanje cloud infrastrukture i CI/CD pipeline-a za enterprise klijente.", isNew: false, isUrgent: true },
  { id: 6, title: "Junior Backend Developer", company: "StartupHub", location: "Novi Sad", workType: "Hibrid", jobType: "Puno radno vreme", salary: "1 000€ – 1 500€", postedAt: "14.05.2026", tags: ["Node.js", "PostgreSQL"], description: "Odlična prilika za juniore koji žele da napreduju u backend razvoju. Mentorstvo i continual learning.", isNew: true, isUrgent: false },
];
 
const SORT_OPTIONS = ["Najnovije", "Najstarije", "Plata (rastuće)", "Plata (opadajuće)"];
const WORK_TYPES = ["Sve", "Remote", "Hibrid", "Kancelarija"];
 
const Jobs = () => {
  const [search, setSearch] = useState("");
  const [workType, setWorkType] = useState("Sve");
  const [sort, setSort] = useState("Najnovije");
 
  const filtered = ALL_JOBS.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchType = workType === "Sve" || job.workType === workType;
    return matchSearch && matchType;
  });
 
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
            Pretraži {ALL_JOBS.length}+ aktivnih oglasa širom Srbije.
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
                <JobListCard {...job} />
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