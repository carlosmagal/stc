import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import PTBR from "./locales/pt/pt-br.json";
import ENUS from "./locales/en/en-us.json";
import ESES from "./locales/es/es-es.json";

const resources = {
  "pt-BR": PTBR,
  "en-US": ENUS,
  "es-ES": ESES,
};

i18next.use(initReactI18next).init({
  resources,
  lng: navigator.language,
  interpolation: { escapeValue: false },
});

export default i18next;
