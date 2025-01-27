import React, { useEffect } from "react";
import { CameraPermission } from "./CameraPermission";
import { ErrorMessage } from "./ErrorMessage";
import { ScannerOverlay } from "./Scanner/ScannerOverlay";
import { Loader2 } from "lucide-react";

interface QRScannerProps {
  error?: string | null;
  hasPermission: boolean | null;
  onScan: (data: string) => void;
  requestPermission: () => Promise<void>;
}

export const QRScanner: React.FC<QRScannerProps> = ({
  error,
  hasPermission,
  onScan,
  requestPermission,
}) => {
  useEffect(() => {
    if (hasPermission === null) {
      requestPermission();
    }
  }, []);

  return (
    <div className="relative w-full">
      {error && <ErrorMessage message={error} />}
      {hasPermission === null ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : hasPermission === false ? (
        <CameraPermission onRequestPermission={requestPermission} />
      ) : (
        <div className="relative">
          <ScannerOverlay onScan={onScan} />
        </div>
      )}
    </div>
  );
};
