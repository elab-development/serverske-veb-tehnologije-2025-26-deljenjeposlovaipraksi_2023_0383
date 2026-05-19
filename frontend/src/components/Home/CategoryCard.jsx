import "../../styles/global.css";
 
const CategoryCard = ({ icon, title, jobCount, isActive = false }) => {
  return (
    <div className={`category-card ${isActive ? "category-card--active" : ""}`}>
      <div className="category-card__icon-wrap">
        <span className="category-card__icon">{icon}</span>
      </div>
      <h3 className="category-card__title">{title}</h3>
      <p className="category-card__count">{jobCount} poslova</p>
      <div className="category-card__arrow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};
 
export default CategoryCard;