import React, { useEffect } from "react";
import { CameraPermission } from "./CameraPermission";
import { ErrorMessage } from "../ErrorMessage";
import { ScannerOverlay } from "./ScannerOverlay";
import { Loader } from "../Loader";

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
        <Loader />
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
