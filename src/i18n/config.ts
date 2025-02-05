import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18next
  .use(HttpBackend) // Load translations from files
  .use(LanguageDetector)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    lng: localStorage.getItem("i18nLang") || "en", // Use saved language
    debug: true,
    interpolation: {
      escapeValue: false, // Not needed for React
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Path to translation files
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"], // Store selected language in localStorage
    },
  });


export default i18next;
