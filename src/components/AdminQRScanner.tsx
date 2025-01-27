import React from "react";
import { ScanIcon } from "lucide-react";
import { QRScanner } from "./QRScanner";

interface Props {
  onScan: (qrCode: string) => void;
  onClose: () => void;
  error?: string | null;
  hasPermission: boolean | null;
  requestPermission: () => Promise<void>;
}

export const AdminQRScanner: React.FC<Props> = ({
  error,
  hasPermission,
  requestPermission,
  onScan,
  onClose,
}) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <ScanIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold">Scan QR Code</h2>
          <p className="text-gray-600 text-sm mt-1">
            Position the QR code within the frame
          </p>
        </div>

        <div className="mb-6">
          <QRScanner
            error={error}
            hasPermission={hasPermission}
            requestPermission={requestPermission}
            onScan={onScan}
          />
        </div>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
