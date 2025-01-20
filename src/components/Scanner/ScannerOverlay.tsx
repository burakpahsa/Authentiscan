import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

type ScannerOverlayProps = {
  onScan: (data: string) => void;
};

export const ScannerOverlay: React.FC<ScannerOverlayProps> = ({
  onScan,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white">
          <div className="absolute inset-0 border-2 border-blue-500 opacity-50 animate-pulse" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-white text-sm font-medium">
            Position QR code here
          </div>
          <BarcodeScannerComponent
            onUpdate={(_err, result) => {
              if (result) {
                console.log(result.getText())
                onScan(result.getText())
              }
              // if (err) console.log("Error: ", err);
            }}
            delay={300}
          />
        </div>
      </div>
    </div>
  );
};
