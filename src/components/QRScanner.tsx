import React, { useEffect } from 'react';
import { useCamera } from '../hooks/useCamera';
import { CameraPermission } from './CameraPermission';
import { ErrorMessage } from './ErrorMessage';
import { ScannerOverlay } from './Scanner/ScannerOverlay';

interface QRScannerProps {
  onScan: (qrCode: string) => void;
  onError?: (error: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError }) => {
  const {
    startScanning,
    stopScanning,
    isScanning,
    error,
    hasPermission,
    requestPermission
  } = useCamera(onScan, {
    fps: 10,
    qrbox: 250,
    aspectRatio: 1.0
  });

  useEffect(() => {
    if (hasPermission && !isScanning) {
      startScanning();
    }
  }, [hasPermission, isScanning, startScanning]);

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, [stopScanning]);

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
          <div
            id="qr-reader"
            className="w-full rounded-lg overflow-hidden aspect-square bg-gray-100 [&_video]:w-full [&_video]:h-full [&_video]:object-cover [&_img]:hidden [&_select]:hidden [&_button]:hidden"
          />
          {isScanning && <ScannerOverlay />}
        </div>
      )}
    </div>
  );
};