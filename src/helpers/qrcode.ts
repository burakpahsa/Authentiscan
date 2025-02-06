import { extension as getExtensionFromMimeType, extension as getMimeTypeFromExtension } from 'mime-types';
import _ from 'lodash';

const commonMimeTypesSignatures = {
    'JVBERi0': 'application/pdf',
    'R0lGODdh': 'image/gif',
    'R0lGODlh': 'image/gif',
    'iVBORw0KGgo': 'image/png',
    '/9j/': 'image/jpg',
  };

function getMimeTypeFromBase64({ base64String }: { base64String: string }) {
    const [,mimeTypeFromBase64] = base64String.match(/data:(.*?);base64/i) ?? [];

    if (mimeTypeFromBase64) {
      return { mimeType: mimeTypeFromBase64 };
    }

    const inferredMimeType = _.find(commonMimeTypesSignatures, (_mimeType, signature) => base64String.startsWith(signature));

    if (inferredMimeType) {
      return { mimeType: inferredMimeType };
    }

    return { mimeType: undefined };
  }

function getFileExtensionFromMimeType({
    mimeType,
    defaultExtension = 'txt',
  }: {
    mimeType: string | undefined
    defaultExtension?: string
  }) {
    if (mimeType) {
      return getExtensionFromMimeType(mimeType) ?? defaultExtension;
    }

    return defaultExtension;
  }

export function downloadFromBase64({ sourceValue, filename, extension, fileMimeType }:
    { sourceValue: string; filename?: string; extension?: string; fileMimeType?: string }) {
      if (sourceValue === '') {
        throw new Error('Base64 string is empty');
      }

      const defaultExtension = extension ?? 'txt';
      const { mimeType } = getMimeTypeFromBase64({ base64String: sourceValue });
      let base64String = sourceValue;
      if (!mimeType) {
        const targetMimeType = fileMimeType ?? getMimeTypeFromExtension(defaultExtension);
        base64String = `data:${targetMimeType};base64,${sourceValue}`;
      }

      const cleanExtension = extension ?? getFileExtensionFromMimeType(
        { mimeType, defaultExtension });
      let cleanFileName = filename ?? `file.${cleanExtension}`;
      if (extension && !cleanFileName.endsWith(`.${extension}`)) {
        cleanFileName = `${cleanFileName}.${cleanExtension}`;
      }

      const a = document.createElement('a');
      a.href = base64String;
      a.download = cleanFileName;
      a.click();
    }
