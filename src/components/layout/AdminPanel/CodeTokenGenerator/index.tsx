import { useState } from "react";
import { QRCodeGenerator } from "./QRCodeGenerator";
import { TokenGenerator } from "./TokenGenerator";
import { FormInput } from "@/components/common/FormInput";
import useWindowSize from "@/hooks/useWindowSize";
import { createToken } from "@/helpers/tokens";
import { ErrorCorrectionLevel, QrCodeSettings, TokenSettings } from "@/types";
import { TokenSettingsChecks } from "./TokenSettingsChecks";

export const errorCorrectionLevels = [
  "low",
  "medium",
  "quartile",
  "high",
] as const;

export const CodeTokenGenerator: React.FC = () => {
  const [bulkQuantity, setBulkQuantity] = useState(10);
  const [tokenSettings, setTokenSettings] = useState<TokenSettings>({
    length: 64,
    withUppercase: true,
    withLowercase: true,
    withNumbers: true,
    withSymbols: false,
  });
  const [qrCodeSettings, setQrCodeSettings] = useState<QrCodeSettings>({
    foreground: "#000000ff",
    background: "#ffffffff",
    errorCorrectionLevel: "medium",
  });
  const isMobile = useWindowSize(700);

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
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <div
            className={!isMobile ? "grid grid-cols-2 gap-4" : undefined}
            style={
              isMobile
                ? { display: "flex", flexDirection: "column", gap: 20 }
                : undefined
            }
          >
            <FormInput
              label="Quantity of codes to generate"
              type="number"
              value={bulkQuantity.toString()}
              required
              onChange={(val: string) => setBulkQuantity(parseInt(val))}
            />
            <TokenSettingsChecks
              tokenSettings={tokenSettings}
              setTokenSettings={setTokenSettings}
            />
            <div className="mt-4 col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Length: {tokenSettings.length}
              </label>
              <input
                type="range"
                min="1"
                max="512"
                step="1"
                value={tokenSettings.length}
                onChange={(e) =>
                  setTokenSettings({
                    ...tokenSettings,
                    length: Number(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Foreground Color:
              </label>
              <input
                type="color"
                value={qrCodeSettings.foreground}
                onChange={(e) =>
                  setQrCodeSettings({
                    ...qrCodeSettings,
                    foreground: e.target.value,
                  })
                }
                className="w-full h-10"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Background Color:
              </label>
              <input
                type="color"
                value={qrCodeSettings.background}
                onChange={(e) =>
                  setQrCodeSettings({
                    ...qrCodeSettings,
                    background: e.target.value,
                  })
                }
                className="w-full h-10"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Error Resistance:
              </label>
              <select
                value={qrCodeSettings.errorCorrectionLevel}
                onChange={(e) =>
                  setQrCodeSettings({
                    ...qrCodeSettings,
                    errorCorrectionLevel: e.target
                      .value as ErrorCorrectionLevel,
                  })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {errorCorrectionLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <TokenGenerator />
        <QRCodeGenerator />
      </div>
    </div>
  );
};
