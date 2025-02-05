import { useTranslation } from "react-i18next";

export const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language; // Get current language

    const changeLanguage = (lang: string) => {
      i18n.changeLanguage(lang);
      localStorage.setItem("i18nLang", lang); // Persist language selection
    };

    return (
        <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-gray-700 text-white p-2 rounded cursor-pointer"
      >
        <option value="en">EN</option>
        <option value="de">DE</option>
      </select>
    )
}
