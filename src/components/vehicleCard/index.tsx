import data from "../../utils/frontend_data_gps.json";
import { useTranslation } from "react-i18next";
import "./styles.scss";

const VehicleCard = () => {
  const { t } = useTranslation();
  const vehicle = data.vehicle;

  return (
    <div className="vehicle-card">
      <div className="card-img">
        <img src={vehicle.picture.address} alt="thumb" width="140" />
      </div>
      <div className="card-info">
        <h4>
          <strong>{t("plate")}: </strong>
          {data.vehicle.plate}
        </h4>

        <div className="card-color">
          <strong>{t("color")}: </strong>
          <div style={{ backgroundColor: vehicle.color }} />
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
