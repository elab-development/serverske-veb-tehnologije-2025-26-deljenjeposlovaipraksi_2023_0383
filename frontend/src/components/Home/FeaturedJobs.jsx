import { Link } from "react-router-dom";
import FeaturedJobCard from "./FeaturedJobCard";
import "../../styles/global.css";
 
const jobs = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    tag: "Istaknuto",
    company: "Nova Vizija d.o.o.",
    title: "Senior UI/UX Designer",
    location: "Beograd",
    type: "Puno radno vreme",
    salary: "2 500€ – 3 800€",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    tag: "Hitno",
    company: "TechFlow Systems",
    title: "Full Stack Developer",
    location: "Novi Sad · Remote",
    type: "Puno radno vreme",
    salary: "3 000€ – 4 500€",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
    tag: "Praksa",
    company: "GrowthLab Agency",
    title: "Marketing Specialist",
    location: "Beograd",
    type: "Praksa · 6 meseci",
    salary: "600€ – 900€",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    tag: "Novo",
    company: "DataStream Analytics",
    title: "Data Analyst",
    location: "Remote",
    type: "Puno radno vreme",
    salary: "2 200€ – 3 200€",
  },
];
 
const FeaturedJobs = () => {
  return (
    <section className="featured">
      <div className="featured__inner">
 
        <div className="featured__header">
          <div className="featured__header-left">
            <span className="featured__eyebrow">Izdvojeno za tebe</span>
            <h2 className="featured__title">Istaknuti oglasi</h2>
            <p className="featured__subtitle">
              Najtraženije pozicije ove nedelje — prijavi se dok ima mesta.
            </p>
          </div>
          <Link to="/poslovi" className="featured__all-link">
            Svi oglasi
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
 
        <div className="featured__grid">
          {jobs.map((job) => (
            <FeaturedJobCard key={job.id} {...job} />
          ))}
        </div>
 
      </div>
    </section>
  );
};
 
export default FeaturedJobs;