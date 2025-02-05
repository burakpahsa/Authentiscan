import { QrCode, ShieldCheck, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LanguageSelector } from "./LanguageSelector";

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between h-16">
      <div className="flex items-center">
        <ShieldCheck className="w-8 h-8 text-blue-600" />
        <span className="ml-2 text-xl font-bold">AuthentiScan</span>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-blue-600"
        >
          <QrCode className="w-5 h-5 mr-1" />
          {t("nav.scan")}
        </Link>
        <Link
          to="/admin"
          className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-blue-600"
        >
          <Settings className="w-5 h-5 mr-1" />
          {t("nav.admin")}
        </Link>
        <LanguageSelector />
      </div>
    </div>
  );
};
