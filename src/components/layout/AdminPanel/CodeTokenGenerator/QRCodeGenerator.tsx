import { useState } from "react";
import { useQRCode } from "@/hooks/useQRCode";

 const errorCorrectionLevels = ["low", "medium", "quartile", "high"] as const;
type ErrorCorrectionLevel = (typeof errorCorrectionLevels)[number];

export const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState("https://it-tools.tech");
  const [foreground, setForeground] = useState("#000000ff");
  const [background, setBackground] = useState("#ffffffff");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<ErrorCorrectionLevel>("medium");

  const { qrcode } = useQRCode({
    text,
    color: { background, foreground },
    errorCorrectionLevel,
    options: { width: 1024 },
  });

  const downloadQRCode = () => {
    if (qrcode) {
      const link = document.createElement("a");
      link.href = qrcode;
      link.download = "qr-code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Text:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your link or text..."
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={2}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Foreground Color:</label>
        <input
          type="color"
          value={foreground}
          onChange={(e) => setForeground(e.target.value)}
          className="w-full h-10"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Background Color:</label>
        <input
          type="color"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          className="w-full h-10"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Error Resistance:</label>
        <select
          value={errorCorrectionLevel}
          onChange={(e) => setErrorCorrectionLevel(e.target.value as ErrorCorrectionLevel)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          {errorCorrectionLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center gap-3">
        {qrcode && <img src={qrcode} alt="QR Code" className="w-48 h-48" />}
        <button
          onClick={downloadQRCode}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Download QR Code
        </button>
      </div>
    </div>
  );
}
