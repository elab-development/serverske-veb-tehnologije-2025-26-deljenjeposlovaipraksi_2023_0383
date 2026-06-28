import "../../styles/global.css";
 
const CityCard = ({ city, jobCount, image }) => {
  return (
    <div className="city-card">
      <div
        className="city-card__bg"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="city-card__overlay" />
      <div className="city-card__content">
        <h3 className="city-card__city">{city}</h3>
        <p className="city-card__count">{jobCount} oglasa</p>
      </div>
    </div>
  );
};
 
export default CityCard;