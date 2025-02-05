import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from "i18next-http-backend";

i18next
  .use(HttpBackend) // Load translations from files
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // Not needed for React
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Path to translation files
    },

  });


export default i18next;
