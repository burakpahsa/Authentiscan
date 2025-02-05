import React from "react";
import { Camera, ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CameraPermissionProps {
  onRequestPermission: () => void;
}

export const CameraPermission: React.FC<CameraPermissionProps> = ({
  onRequestPermission,
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="relative mx-auto w-16 h-16 mb-4">
        <Camera className="w-16 h-16 text-gray-300" />
        <ShieldAlert className="absolute -bottom-2 -right-2 w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {t("permission.title")}
      </h3>
      <p className="text-gray-600 mb-6">{t("permission.subtitle")}</p>
      <button
        onClick={onRequestPermission}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Camera className="w-5 h-5" />
        {t("permission.enable")}
      </button>
    </div>
  );
};
