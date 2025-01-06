import React, { useEffect } from "react";
import { useCamera } from "../hooks/useCamera";
import { CameraPermission } from "./CameraPermission";
import { ErrorMessage } from "./ErrorMessage";
import { ScannerOverlay } from "./Scanner/ScannerOverlay";

interface QRScannerProps {
  // onScan: (qrCode: string) => void;
  onError?: (error: string) => void;
  startScanning: () => Promise<void>;
  isScanning: boolean;
  error: string | null;
  hasPermission: boolean;
  requestPermission: () => Promise<void>;
}

export const QRScanner: React.FC<QRScannerProps> = ({ isScanning, error, hasPermission, startScanning, requestPermission, onError }) => {
  // const { startScanning, isScanning, error, hasPermission, requestPermission } =
  //   useCamera(onScan, {
  //     fps: 30,
  //     qrbox: 250,
  //     aspectRatio: 1.0,
  //   });

  useEffect(() => {
    if (!isScanning && hasPermission) {
      try {
        startScanning();
      } catch (err) {
        console.error("Scanner initialization failed:", err);
      }
    }
    const initializeScanner = async () => {
      try {
        if (!hasPermission) {
          await requestPermission();
        }
        if (!isScanning) {
          await startScanning();
        }
      } catch (err) {
        console.error("Scanner initialization failed:", err);
      }
    };

    if (!isScanning) {
      initializeScanner();
    }
  }, [hasPermission, isScanning]);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  return (
    <div className="relative w-full">
      {error && <ErrorMessage message={error} />}

      {!hasPermission ? (
        <CameraPermission onRequestPermission={requestPermission} />
      ) : (
        <div className="relative">
            <>
              <div
                id="qr-reader"
                className="w-full rounded-lg overflow-hidden aspect-square bg-gray-100 [&_video]:w-full [&_video]:h-full [&_video]:object-cover [&_img]:hidden [&_select]:hidden [&_button]:hidden"
              />
              <ScannerOverlay />
            </>
        </div>
      )}
    </div>
  );
};
