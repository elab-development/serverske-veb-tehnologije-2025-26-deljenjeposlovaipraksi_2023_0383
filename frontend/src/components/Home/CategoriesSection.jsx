import CategoryCard from "./CategoryCard";
import "../../styles/global.css";

const categories = [
  {
    id: 1,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "IT & Tehnologija",
    jobCount: 342,
  },
  {
    id: 2,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Marketing",
    jobCount: 156,
  },
  {
    id: 3,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Prodaja",
    jobCount: 234,
  },
  {
    id: 4,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
      </svg>
    ),
    title: "Dizajn",
    jobCount: 128,
  },
  {
    id: 5,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Pravo",
    jobCount: 87,
  },
  {
    id: 6,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 20h20M4 20V10l8-6 8 6v10" />
        <path d="M9 20v-5h6v5" />
      </svg>
    ),
    title: "Inženjering",
    jobCount: 195,
  },
  {
    id: 7,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Finansije",
    jobCount: 143,
  },
  {
    id: 8,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    title: "Obrazovanje",
    jobCount: 76,
  },
];

const stats = [
  { value: "1.2K+", label: "Aktivnih poslova" },
  { value: "500+", label: "Kompanija" },
  { value: "3.5K+", label: "Kandidata" },
  { value: "95%", label: "Zadovoljstvo" },
];

const CategoriesSection = () => {
  return (
    <section className="categories-section">
      <div className="categories-section__inner">
        <div className="categories-section__header">
          <span className="categories-section__eyebrow">Istraži oblasti</span>
          <h2 className="categories-section__title">Popularne kategorije</h2>
          <p className="categories-section__subtitle">
            Pronađi posao u oblasti koja te zanima — od tehnologije do kreativnih industrija.
          </p>
        </div>

        <div className="categories-section__grid">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              icon={cat.icon}
              title={cat.title}
              jobCount={cat.jobCount}
            />
          ))}
        </div>

        <div className="categories-section__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="categories-section__stat">
              <span className="categories-section__stat-value">{stat.value}</span>
              <span className="categories-section__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;