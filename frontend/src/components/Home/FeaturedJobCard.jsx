import { Link } from "react-router-dom";
import "../../styles/global.css";
 
const tagStyles = {
  "Istaknuto": "tag--orange",
  "Hitno":     "tag--red",
  "Praksa":    "tag--teal",
  "Novo":      "tag--white",
};
 
const FeaturedJobCard = ({
  id = 1,
  image = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  tag = "Novo",
  company = "Kompanija d.o.o.",
  title = "Naziv pozicije",
  location = "Beograd",
  type = "Puno radno vreme",
  salary = "1 500€ – 2 500€",
}) => {
  return (
    <div className="fjob">
      <div
        className="fjob__image"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="fjob__overlay" />
 
      <span className={`fjob__tag ${tagStyles[tag] || "tag--white"}`}>
        {tag}
      </span>
 
      <div className="fjob__content">
        <p className="fjob__company">{company}</p>
        <h3 className="fjob__title">{title}</h3>
 
        <div className="fjob__meta">
          <span className="fjob__meta-item">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </span>
          <span className="fjob__meta-item">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            {type}
          </span>
        </div>
 
        <div className="fjob__footer">
          <span className="fjob__salary">{salary}</span>
          <Link to={`/poslovi/${id}`} className="fjob__btn">
            Prijavi se
          </Link>
        </div>
      </div>
    </div>
  );
};
 
export default FeaturedJobCard;