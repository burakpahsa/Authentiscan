import { TabBar } from "@/components/common/TabBar";
import useWindowSize from "@/hooks/useWindowSize";
import { useTranslation } from "react-i18next";

export const AdminTabs: React.FC = () => {
  const {t} = useTranslation()
  const isMobile = useWindowSize(760)
  const tabs = [
    { name: isMobile ? t('adminNavMobile.manage') : t('adminNav.manage'), path: "/admin/manage-products" },
    { name: isMobile ? t('adminNavMobile.scan') : t('adminNav.scan'), path: "/admin/scan-log" },
    { name: isMobile ? t('adminNavMobile.codeGenerator') : t('adminNav.codeGenerator'), path: "/admin/code-generator" },
  ];
  return <TabBar tabs={tabs} />;
};
