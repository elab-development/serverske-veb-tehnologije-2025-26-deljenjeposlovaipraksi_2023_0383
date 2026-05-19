import CategoryCard from "./CategoryCard";
import "../../styles/global.css";
 
const categories = [
  { id: 1, icon: "💼", title: "IT & Tehnologija", jobCount: 342 },
  { id: 2, icon: "📣", title: "Marketing", jobCount: 156 },
  { id: 3, icon: "📈", title: "Prodaja", jobCount: 234 },
  { id: 4, icon: "🎨", title: "Dizajn", jobCount: 128 },
  { id: 5, icon: "⚖️", title: "Pravo", jobCount: 87 },
  { id: 6, icon: "🏗️", title: "Inženjering", jobCount: 195 },
  { id: 7, icon: "💰", title: "Finansije", jobCount: 143 },
  { id: 8, icon: "🎓", title: "Obrazovanje", jobCount: 76 },
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