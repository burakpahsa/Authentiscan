import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { ScanResult } from "../types";
import { CheckCircle, XCircle, Camera, RefreshCw } from "lucide-react";
import { QRScanner } from "./QRScanner";
import { useCamera } from "../hooks/useCamera";

export const Scanner: React.FC = () => {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const verifyProduct = useAuthStore((state) => state.verifyProduct);

  const handleScan = (data: string) => {
    const product = verifyProduct(data);
    setResult({
      isAuthentic: !!product,
      product,
      message: product
        ? "Product authenticated successfully!"
        : "Warning: This product could not be verified.",
    });
    setShowScanner(false);
  };

  const { startScanning, error, hasPermission, requestPermission } =
    useCamera(handleScan, {
      fps: 30,
      qrbox: 250,
      aspectRatio: 1.0,
    });

  const handleStartScan = () => {
    setShowScanner(true);
    setResult(null);
  };

  const handleReset = () => {
    setResult(null);
    setShowScanner(true);
  };

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
            startScanning={startScanning}
            requestPermission={requestPermission}
          />
        </div>
      )}

      {result && (
        <div
          className={`p-6 rounded-lg shadow-lg ${
            result.isAuthentic ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            {result.isAuthentic ? (
              <CheckCircle className="w-8 h-8 text-green-500" />
            ) : (
              <XCircle className="w-8 h-8 text-red-500" />
            )}
            <h2 className="text-xl font-semibold">{result.message}</h2>
          </div>

          {result.product && (
            <div className="mt-4">
              <div className="aspect-video rounded-lg overflow-hidden mb-4 shadow-md">
                <img
                  src={result.product.imageUrl}
                  alt={result.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {result.product.name}
              </h3>
              <p className="text-gray-600 mb-4">{result.product.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm bg-white p-4 rounded-lg">
                <div>
                  <span className="font-medium text-gray-700">
                    Manufacturer:
                  </span>
                  <p className="mt-1">{result.product.manufacturer}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Date:</span>
                  <p className="mt-1">{result.product.manufactureDate}</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleReset}
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Scan Another Code
          </button>
        </div>
      )}
    </div>
  );
};

