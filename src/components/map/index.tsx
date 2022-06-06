import { GoogleMap, Marker } from "@react-google-maps/api";
import { useSpring } from "@react-spring/web";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import mapStyles from "../../styles/mapStyles";

import data from "../../utils/frontend_data_gps.json";
// import { getPolylineValues } from "../../utils/getPolylineValues";
import { path } from "../../utils/iconPath";
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
  // const polylinePath = getPolylineValues(route);
  const [rotation, setRotation] = useState(0);
  const [googleMap, setGoogleMap] = useState<google.maps.Map>();
  const [currentPosIndex, setCurrentPosIndex] = useState(0);
  const [currentCourse, setCurrentCourse] = useState<Course[]>([initialCourse]);
  const [currentPosition, setCurrentPosition] =
    useState<Position>(initialPosition);
  const animation = useSpring({
    val: 0,
    from: { val: 1 },
    config: { duration: 1500 },
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
    setCurrentCourse([initialCourse]);
  }, [setLoading, setRoute]);

  const getRotation = (
    cPos: { latitude: number; longitude: number },
    nPos: { latitude: number; longitude: number }
  ) => {
    if (!cPos || !nPos) {
      return 0;
    }
    const latDiff = cPos.latitude - nPos.latitude;
    const lngDiff = cPos.longitude - nPos.longitude;
    return (Math.atan2(lngDiff, latDiff) * 180.0) / Math.PI;
  };

  //muda a posicao e chama a animacao
  const doUpdate = useCallback(() => {
    const newCurPos = currentPosIndex + 1;
    if (newCurPos >= currentCourse.length) {
      if (!stop) {
        setStop(true);
        return;
      }
      resetValues();
      return;
    }
    setRotation(
      getRotation(currentCourse[currentPosIndex], currentCourse[newCurPos])
    );
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
      // animateCircle(line);
    }
  }, [courses, route, googleMap, start, stop]);

  // const lineSymbol = {
  //   path: google.maps.SymbolPath.CIRCLE,
  //   scale: 8,
  //   strokeColor: "#393",
  // };
  // const line = new google.maps.Polyline({
  //   path: polylinePath,
  //   icons: [
  //     {
  //       icon: lineSymbol,
  //       offset: "99%",
  //     },
  //   ],
  //   map: googleMap,
  // });

  // function animateCircle(line: google.maps.Polyline) {
  //   let count = 0;

  //   const interval = window.setInterval(() => {
  //     count = (count + 1) % 200;

  //     const icons = line.get("icons");
  //     icons[0].offset = count / 2 + "%";

  //     if (icons[0].offset === "100%") {
  //       line.setMap(null);
  //       console.log('first')
  //       clearInterval(interval);
  //     }
  //     line.set("icons", icons);
  //   }, 100);
  // }
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
        {/* {route !== -1 && (
          <Polyline path={polylinePath} options={{ strokeColor: "#4B8673" }} />
        )} */}
        {googleMap && (
          <Marker
            position={currentPosition}
            icon={{
              path: path,
              fillColor: "#000000",
              fillOpacity: 1,
              scale: 0.6,
              rotation: rotation,
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
