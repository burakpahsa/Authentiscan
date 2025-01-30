import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { ScanResult as ScanResultType } from "../../../types";
import { Camera } from "lucide-react";
import { QRScanner } from "../../common/QRScanner";
import { useCamera } from "../../../hooks/useCamera";
import { ScanResult } from "./ScanResult";

export const Scanner: React.FC = () => {
  const [result, setResult] = useState<ScanResultType | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [ipAddress, setIpAddress] = useState<string>();
  const verifyProduct = useAuthStore((state) => state.verifyProduct);

  const handleScan = async (data: string) => {
    const product = await verifyProduct(data, ipAddress);
    setResult({
      isAuthentic: !!product,
      product,
      message: product
        ? "Product authenticated successfully!"
        : "Warning: This product could not be verified.",
    });
    setShowScanner(false);
  };

  const { error, hasPermission, requestPermission } = useCamera();

  const handleStartScan = () => {
    setShowScanner(true);
    setResult(null);
  };

  const handleReset = () => {
    setResult(null);
    setShowScanner(true);
  };

  // Get user's ip address
  useEffect(() => {
    if (!ipAddress) {
      fetch("https://ipv4.icanhazip.com/")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          setIpAddress(data);
        })
        .catch((error) => {
          console.error(
            "There was a problem with the IP fetch operation:",
            error
          );
        });
    }
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Camera className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Scan QR Code</h1>
        <p className="text-gray-600 mt-2">
          Verify product authenticity by scanning its QR code
        </p>
      </div>

      {!showScanner && !result && (
        <button
          onClick={handleStartScan}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-8"
        >
          <Camera className="w-5 h-5" />
          Start Scanning
        </button>
      )}

      {showScanner && (
        <div className="mb-8">
          <QRScanner
            error={error}
            hasPermission={hasPermission}
            requestPermission={requestPermission}
            onScan={handleScan}
          />
        </div>
      )}

      {result && <ScanResult result={result} handleReset={handleReset} />}
    </div>
  );
};
