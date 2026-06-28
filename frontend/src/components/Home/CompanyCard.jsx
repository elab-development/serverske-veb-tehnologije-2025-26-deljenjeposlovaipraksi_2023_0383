import "../../styles/global.css";

const CompanyCard = ({
  companyName = "TechCorp Solutions",
  companyLogo = null,
  industry = "Informacione tehnologije",
  location = "Beograd, Srbija",
  openPositions = 5,
}) => {
  const initials = companyName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="company-card">
      <div className="company-card__logo">
        {companyLogo ? (
          <img src={companyLogo} alt={`${companyName} logo`} />
        ) : (
          <span className="company-card__initials">{initials}</span>
        )}
      </div>
      <h3 className="company-card__name">{companyName}</h3>
      <p className="company-card__industry">{industry}</p>

      <div className="company-card__location">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {location}
      </div>

      <div className="company-card__footer">
        <span className="company-card__positions">
          {openPositions} {openPositions === 1 ? "oglas" : "oglasa"}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default CompanyCard;