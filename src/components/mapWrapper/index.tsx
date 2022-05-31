import { useJsApiLoader } from "@react-google-maps/api";
import Map from "../map";

const MapWrapper = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? "D",
  });

  if (loadError) {
    return <div>Erro</div>;
  }

  if (isLoaded) {
    return <Map />;
  }

  return <div>loading</div>;
};

export default MapWrapper;
