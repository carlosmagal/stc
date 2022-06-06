import data from "./frontend_data_gps.json";

interface PolylineProps {
  lat: number;
  lng: number;
}

export const getPolylineValues = (courseIndex: number) => {
  if (courseIndex === -1) return [];
  const course = data.courses[courseIndex].gps;
  let polylineValues: PolylineProps[] = [];

  for (let i = 0; i < course.length; i++) {
    polylineValues.push({ lat: course[i].latitude, lng: course[i].longitude });
  }

  return polylineValues;
};
