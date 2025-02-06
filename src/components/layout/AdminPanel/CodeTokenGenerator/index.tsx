import { useState } from "react";
import { QRCodeGenerator } from "./QRCodeGenerator";
import { TokenGenerator } from "./TokenGenerator";

export const CodeTokenGenerator: React.FC = () => {
  const [bulkQuantity, setBulkQuantity] = useState(10)
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Generate Code and Token
          </h1>
          <p className="text-gray-600 mt-1">Create in bulk maybe</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-4">
          
      </div>
      <TokenGenerator />
      <QRCodeGenerator />
    </div>
  );
};
