import { TabBar } from "@/components/common/TabBar";
import { useTranslation } from "react-i18next";

export const AdminTabs: React.FC = () => {
  const {t} = useTranslation()
  const tabs = [
    { name: t('adminNav.manage'), path: "/admin/manage-products" },
    { name: t('adminNav.scan'), path: "/admin/scan-log" },
    { name: t('adminNav.codeGenerator'), path: "/admin/code-generator" },
  ];
  return <TabBar tabs={tabs} />;
};
