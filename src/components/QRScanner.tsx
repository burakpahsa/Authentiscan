
import React, { useEffect } from "react";
import { CameraPermission } from "./CameraPermission";
import { ErrorMessage } from "./ErrorMessage";
import { ScannerOverlay } from "./Scanner/ScannerOverlay";

interface QRScannerProps {
  error: string | null;
  hasPermission: boolean | null;
  startScanning: () => Promise<void>;
  requestPermission: () => Promise<void>;
}

export const QRScanner: React.FC<QRScannerProps> = ({
  error,
  hasPermission,
  startScanning,
  requestPermission,
}) => {
  useEffect(() => {
    if (hasPermission === null) {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    if (hasPermission) {
      startScanning();
    }
  }, [hasPermission]);

  return (
    <div className="relative w-full">
      {error && <ErrorMessage message={error} />}
      {!hasPermission ? (
        <CameraPermission onRequestPermission={requestPermission} />
      ) : (
        <div className="relative">
          <div
            id="qr-reader"
            className="w-full rounded-lg overflow-hidden aspect-square bg-gray-100 [&_video]:w-full [&_video]:h-full [&_video]:object-cover [&_img]:hidden [&_select]:hidden [&_button]:hidden"
          />
          <ScannerOverlay />
        </div>
      )}
    </div>
  );
};

