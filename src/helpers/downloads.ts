import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function generateAndDownloadZip(token: string, count: number) {
  if (!token || count <= 0) return;

  const zip = new JSZip();

  for (let i = 1; i <= count; i++) {
    const folder = zip.folder(`Token-${i}`);
    if (folder) {
      folder.file("token.txt", token);
    }
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  saveAs(zipBlob, "tokens.zip");
}
