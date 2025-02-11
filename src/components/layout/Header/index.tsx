import { QrCode, ShieldCheck, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LanguageSelector } from "./LanguageSelector";
import useWindowSize from "@hooks/useWindowSize";
import { Session } from "@supabase/auth-js";
import { Logout } from "./Logout";

type Props = {
  session: Session | null;
};

export const Header: React.FC<Props> = ({ session }) => {
  const { t } = useTranslation();
  const isMobile = useWindowSize(600);

  const iconSize = isMobile ? "w-6 h-6 mr-1" : "w-5 h-5 mr-1";

  return (
    <div className="flex justify-between h-16">
      <div className="flex items-center">
        <ShieldCheck className="w-8 h-8 text-blue-600" />
        {(!isMobile || !session) && (
          <span className="ml-2 text-xl font-bold">AuthentiScan</span>
        )}
      </div>
      <div className={`flex items-center space-x-${isMobile ? 2 : 4}`}>
        <Link
          to="/"
          className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-blue-600"
        >
          <QrCode className={iconSize} />
          {!isMobile && t("nav.scan")}
        </Link>
        <Link
          to={`/admin${session ? "/manage-products" : ""}`}
          className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-blue-600"
        >
          <Settings className={iconSize} />
          {!isMobile && t("nav.admin")}
        </Link>
        <LanguageSelector />
        {session && <Logout />}
      </div>
    </div>
  );
};
