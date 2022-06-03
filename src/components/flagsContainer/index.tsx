import React from "react";

import brazil from "../../assets/images/flags/brazil.png";
import spain from "../../assets/images/flags/spain.png";
import us from "../../assets/images/flags/us.png";
import "./styles.scss";

interface Props {
  setLanguage: (e: string) => void;
}

const FlagsContainer = ({ setLanguage }: Props) => {
  return (
    <div className="flags-container">
      <button type="button" onClick={() => setLanguage("pt-BR")}>
        <img src={brazil} alt="" />
      </button>
      <button type="button" onClick={() => setLanguage("en-US")}>
        <img src={us} alt="" />
      </button>
      <button type="button" onClick={() => setLanguage("es-ES")}>
        <img src={spain} alt="" />
      </button>
    </div>
  );
};

export default FlagsContainer;
