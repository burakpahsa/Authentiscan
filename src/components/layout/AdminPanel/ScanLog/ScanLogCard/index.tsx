import { CheckCircle, XCircle } from "lucide-react";
import { ScanLog } from "@types";
import { getLocalDateString } from "@helpers/locales";
import { useTranslation } from "react-i18next";

type ScanLogCardProps = {
  scanLog: ScanLog;
};

export const ScanLogCard: React.FC<ScanLogCardProps> = ({ scanLog }) => {
  const {t} = useTranslation()

  return (
    <div
      className={`${
        scanLog.isVerified ? "bg-green-50" : "bg-red-50"
      } p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow`}
    >
      <div style={{ display: "flex", gap: 20 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: 10,
          }}
        >
          <div className="flex" style={{ alignItems: "center", gap: 10 }}>
            {scanLog.isVerified ? (
              <CheckCircle className="w-8 h-8 text-green-500" />
            ) : (
              <XCircle className="w-8 h-8 text-red-500" />
            )}
            <p> {scanLog.id}</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <p style={{ fontWeight: 600 }}>{t('scans.ipAddress')}</p>
            <p style={{wordBreak: 'break-word'}}>{scanLog.ipAddress}</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <p style={{ fontWeight: 600 }}>{t('scans.qrCode')}</p>
            <p
              style={{
                wordBreak: "break-word",
                flex: 1,
                marginRight: 20,
              }}
            >
              {scanLog.qrCode}
            </p>
          </div>
          <p style={{ marginTop: 10, alignSelf: "flex-end" }}>
            {getLocalDateString(scanLog.timestamp, true)}
          </p>
        </div>
      </div>
    </div>
  );
};
