import CityCard from "../components/Home/CityCard";
import CategoriesSection from "../components/Home/CategoriesSection";
import MissionSection from "../components/Home/MissionSection";
import CTABanner from "../components/Home/CTABanner";
import FeaturedJobs from "../components/Home/FeaturedJobs";
import "../styles/global.css"
import { useState } from "react";

const companies = [
  {
    id: 1,
    companyName: "TechCorp Solutions",
    industry: "Information Technology",
    location: "Belgrade, Serbia",
    openPositions: 5,
  },
  {
    id: 2,
    companyName: "Nova Vizija",
    industry: "Marketing & Design",
    location: "Novi Sad, Serbia",
    openPositions: 3,
  },
  {
    id: 3,
    companyName: "DataFlow",
    industry: "Data Analytics",
    location: "Niš, Serbia",
    openPositions: 2,
  },
  {
    id: 4,
    companyName: "DataFlow",
    industry: "Data Analytics",
    location: "Niš, Serbia",
    openPositions: 2,
  }
];

const cities = [
  { id: 1, city: "All Cities", jobCount: 3188, image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80" },
  { id: 2, city: "Remote", jobCount: 64, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80" },
  { id: 3, city: "Belgrade", jobCount: 1886, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { id: 4, city: "Novi Sad", jobCount: 472, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" },
  { id: 5, city: "Niš", jobCount: 251, image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=400&q=80" },
  { id: 6, city: "Subotica", jobCount: 213, image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&q=80" },
];

const Home = () => {
  const [selectedCity, setSelectedCity] = useState("");
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__bg" />

        <div className="hero__inner">

          {/* Left */}
          <div className="hero__left">
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-number">13 233 +</span>
                <span className="hero__stat-label">open positions</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-number">1 950 +</span>
                <span className="hero__stat-label">companies</span>
              </div>
            </div>

            <h1 className="hero__title">
              The largest selection of
              job listings in
              one place<span className="hero__dot">.</span>
            </h1>

            <div className="hero__form">
              <p className="hero__form-label">
                Which city would you like to work in?
                <span className="hero__form-hint"> (select one)</span>
              </p>
              <div className="hero__select-wrap">
                <select
                  className="hero__select"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="" disabled>Select a city</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.city}>{c.city}</option>
                  ))}
                </select>
                <svg className="hero__select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
              <button className="hero__btn">
                Continue <span>›</span>
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="hero__right">
            <div className="hero__grid">
              {cities.map((c) => (
                <CityCard
                  key={c.id}
                  city={c.city}
                  jobCount={c.jobCount}
                  image={c.image}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      <MissionSection/>
      <CategoriesSection/>
      <FeaturedJobs/>
      <CTABanner/>
    </div>
  );
};

export default Home;