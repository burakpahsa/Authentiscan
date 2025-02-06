import JSZip from "jszip";
import { saveAs } from "file-saver";
import QRCode from "qrcode";
import Papa from "papaparse";
import { QrCodeSettings, TokenSettings } from "@/types";
import { createBulkTokens } from "./tokens";

export async function generateAndDownloadZip(quantity: number, tokenSettings: TokenSettings, qrCodeSettings: QrCodeSettings) {
    const tokens = createBulkTokens(quantity, tokenSettings)
  const zip = new JSZip();
  const csvData: string[][] = [["Token", "ID"]]; // CSV headers

  for (const { token, id } of tokens) {
    csvData.push([token, id.toString()]); // Add row to CSV

    // Generate QR Code for the token
    const qrCodeDataUrl = await QRCode.toDataURL(token, { color: {dark: qrCodeSettings.foreground, light: qrCodeSettings.background }, width: 1024, errorCorrectionLevel: qrCodeSettings.errorCorrectionLevel ?? "M" });
    const qrCodeBlob = await fetch(qrCodeDataUrl).then((res) => res.blob());

    // Add the QR code image to ZIP
    zip.file(`token-${id}.png`, qrCodeBlob);
  }

  // Convert CSV data to a blob
  const csvBlob = new Blob([Papa.unparse(csvData)], { type: "text/csv" });
  zip.file("tokens.csv", csvBlob);

  // Generate and download ZIP
  const zipBlob = await zip.generateAsync({ type: "blob" });
  saveAs(zipBlob, "tokens.zip");
}
