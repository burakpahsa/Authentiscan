import QRCode, { QRCodeErrorCorrectionLevel, QRCodeToDataURLOptions } from "qrcode";
import { useEffect, useState } from "react";

export function useQRCode({
    text,
    color: { background, foreground },
    errorCorrectionLevel,
    options,
  }: {
    text: string;
    color: { foreground: string; background: string };
    errorCorrectionLevel?: QRCodeErrorCorrectionLevel;
    options?: QRCodeToDataURLOptions;
  }) {
    const [qrcode, setQrcode] = useState<string>("");

    useEffect(() => {
      if (text) {
        QRCode.toDataURL(text.trim(), {
          color: {
            dark: foreground,
            light: background,
            ...options?.color,
          },
          errorCorrectionLevel: errorCorrectionLevel ?? "M",
          ...options,
        }).then(setQrcode);
      }
    }, [text, background, foreground, errorCorrectionLevel, options]);

    return { qrcode };
  }
