import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import FlagsContainer from "../flagsContainer";
import VehicleCard from "../vehicleCard";

import "./styles.scss";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = useCallback(
    (e: string) => {
      i18n.changeLanguage(e);
    },
    [i18n]
  );

  return (
    <nav className="nav">
      <div className="nav-header">
        <h1>{t("choose-route")}</h1>
        <div>
          <h2>{t("vehicle-info")}</h2>
          <VehicleCard />
        </div>
      </div>

      <div>
        <p>{t("select-lang")}</p>
        <FlagsContainer setLanguage={handleChangeLanguage} />
      </div>
    </nav>
  );
};

export default Navbar;
