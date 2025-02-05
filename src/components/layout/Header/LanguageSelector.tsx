import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = i18n.language; // Get current language
  const dropdownRef = useRef<HTMLDivElement>(null)

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nLang", lang); // Persist language selection
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button to toggle dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-2 py-2 rounded flex items-center gap-1 transition hover:text-blue-600"
      >
        {currentLanguage === "en" ? "EN" : "DE"}
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="flex-column absolute bg-white shadow-lg rounded-b-md"
          style={{ width: 60, top: 52, alignItems: 'center' }}
        >
          <button
            onClick={() => changeLanguage("en")}
            className="flex w-full px-3 py-2 text-gray-900 hover:bg-gray-100"
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage("de")}
            className="flex w-full px-3 py-2 text-gray-900 hover:bg-gray-100 rounded-b-md"
          >
            DE
          </button>
        </div>
      )}
    </div>
  );
};
