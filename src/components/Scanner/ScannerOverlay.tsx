import React from 'react';
import { Camera } from 'lucide-react';

export const ScannerOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white">
          <div className="absolute inset-0 border-2 border-blue-500 opacity-50 animate-pulse" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-white text-sm font-medium">
            Position QR code here
          </div>
          <Camera className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
};