import { Camera } from "lucide-react";
import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

type ScannerOverlayProps = {
  onScan: (data: string) => void;
};

export const ScannerOverlay: React.FC<ScannerOverlayProps> = ({ onScan }) => {
  return (
    <>
      <div className="w-full rounded-lg overflow-hidden aspect-square bg-gray-100 [&_video]:w-full [&_video]:h-full [&_video]:object-cover [&_img]:hidden [&_select]:hidden [&_button]:hidden">
        <BarcodeScannerComponent
          onUpdate={(_err, result) => {
            if (result) {
              onScan(result.getText());
            }
          }}
          delay={300}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white">
            <Camera className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500 animate-pulse" />
          </div>
        </div>
      </div>
    </>
  );
};
