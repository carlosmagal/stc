import { useJsApiLoader } from "@react-google-maps/api";
import Map from "../map";

const MapWrapper = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? "",
    //se nao tiver o .env, descomente a linha abaixo, comente a linha acima e cole a chave de api
    // googleMapsApiKey: "",
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
