import { GoogleMap, Marker } from "@react-google-maps/api";
import { useSpring } from "@react-spring/web";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import mapStyles from "../../styles/mapStyles";

import data from "../../utils/frontend_data_gps.json";
import { path } from "../../utils/iconPath";
// import car from '../../assets/icons/car.svg'
import "./styles.scss";

interface Position {
  lat: number;
  lng: number;
}

interface Course {
  longitude: number;
  latitude: number;
  acquisition_time_unix: number;
  speed: number;
  direction: number;
  acquisition_time: string;
}

const initialCourse = {
  longitude: -19.912998,
  latitude: -43.940933,
  acquisition_time_unix: 0,
  speed: 0,
  direction: 0,
  acquisition_time: "",
};

const initialPosition = {
  lat: -23.963214,
  lng: -46.28054,
};

const Map = () => {
  const { route, stop, setRoute, setLoading, setStop } =
    useContext(UserContext);
  const { courses } = data;
  const [googleMap, setGoogleMap] = useState<google.maps.Map>();
  const [currentPosIndex, setCurrentPosIndex] = useState(0);
  const [currentCourse, setCurrentCourse] = useState<Course[]>([initialCourse]);
  const [currentPosition, setCurrentPosition] =
    useState<Position>(initialPosition);
  const animation = useSpring({
    val: 0,
    from: { val: 1 },
    config: { duration: 3000 },
    onChange: () => {
      const value = animation.val.get();
      if (currentPosIndex > 0) {
        const latDiff =
          (currentCourse[currentPosIndex].latitude -
            currentCourse[currentPosIndex - 1].latitude) *
          value;
        const lngDiff =
          (currentCourse[currentPosIndex].longitude -
            currentCourse[currentPosIndex - 1].longitude) *
          value;

        setCurrentPosition({
          lat: currentCourse[currentPosIndex].latitude - latDiff,
          lng: currentCourse[currentPosIndex].longitude - lngDiff,
        });
      }
    },
  });

  const resetValues = useCallback(() => {
    setLoading(false);
    setRoute(-1);
    setCurrentPosIndex(0);
    // setCurrentPosition(initialPosition);
    setCurrentCourse([initialCourse]);
  }, [setLoading, setRoute]);

  const doUpdate = useCallback(() => {
    const newCurPos = currentPosIndex + 1;
    if (newCurPos >= currentCourse.length) {
      if (!stop) {
        setStop(true);
        return;
      }
      resetValues();
      console.log("-------------------");
      return;
    }
    console.log("nao deu return");
    setCurrentPosIndex(newCurPos);
    animation.val.reset();
    animation.val.start();
  }, [animation, currentPosIndex, currentCourse, stop, setStop, resetValues]);

  const start = useCallback(() => {
    setTimeout(() => {
      doUpdate();
    }, 1500);
  }, [doUpdate]);

  //setando a rota atual, de acordo com o index do route que vem do navbar
  useEffect(() => {
    if (route !== -1) {
      setCurrentCourse(courses[route].gps);
      start();
    }
  }, [courses, route, googleMap, start, stop]);

  return (
    <div className="map">
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        center={currentPosition}
        zoom={15}
        onLoad={(map) => {
          setGoogleMap(map);
        }}
        options={{
          styles: mapStyles,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {googleMap && (
          <Marker
            position={currentPosition}
            icon={{
              path: path,
              fillColor: "#000000",
              fillOpacity: 1,
              scale: 0.6,
              anchor: new google.maps.Point(22, 43),
            }}
            options={{ map: googleMap }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
