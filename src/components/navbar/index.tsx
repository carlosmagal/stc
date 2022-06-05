import React, { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../contexts/UserContext";
import FlagsContainer from "../flagsContainer";
import VehicleCard from "../vehicleCard";

import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import data from "../../utils/frontend_data_gps.json";
import "./styles.scss";

const Navbar = () => {
  const [routeStore, setRouteStore] = useState("");
  const { loading, setLoading, setRoute, setStop } = useContext(UserContext);
  const { i18n, t } = useTranslation();
  const { courses } = data;

  const handleChangeLanguage = useCallback(
    (e: string) => {
      i18n.changeLanguage(e);
    },
    [i18n]
  );

  const handleChangeSelect = (e: SelectChangeEvent) => {
    setRouteStore(e.target.value);
  };

  const handleRouting = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStop(false);
    setRoute(parseInt(routeStore.charAt(routeStore.length - 1)) - 1);
  };

  return (
    <nav className="nav">
      <div className="nav-header">
        <form action="submit" onSubmit={handleRouting}>
          <h1>{t("choose-route")}</h1>
          <Select
            value={routeStore}
            onChange={handleChangeSelect}
            disabled={loading}
          >
            {courses.map((e, i) => (
              <MenuItem key={i} value={`Route ${i + 1}`}>
                {t("route")}
                {` ${i + 1}`}
              </MenuItem>
            ))}
          </Select>
          <div>
            <h2>{t("vehicle-info")}</h2>
            <VehicleCard />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? (
              <CircularProgress color="secondary" size={20} />
            ) : (
              t("begin-route")
            )}
          </button>
        </form>
      </div>

      <div>
        <p>{t("select-lang")}</p>
        <FlagsContainer setLanguage={handleChangeLanguage} />
      </div>
    </nav>
  );
};

export default Navbar;
