import { GoogleMap } from "@react-google-maps/api";
import mapStyles from "../../styles/mapStyles";

import "./styles.scss";

const Map = () => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: -19.912998,
    lng: -43.940933,
  };

  return (
    <div className="map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={{
          styles: mapStyles,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      ></GoogleMap>
    </div>
  );
};

export default Map;
