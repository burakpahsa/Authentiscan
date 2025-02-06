import { TabBar } from "@/components/common/TabBar";

export const AdminTabs: React.FC = () => {
  const tabs = [
    { name: "Manage Products", path: "/admin/manage-products" },
    { name: "Scan Log", path: "/admin/scan-log" },
    { name: "Code + Token Generator", path: "/admin/code-generator" },
  ];
  return <TabBar tabs={tabs} />;
};
