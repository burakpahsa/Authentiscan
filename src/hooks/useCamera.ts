import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface UseCameraResult {
  error: string | null;
  hasPermission: boolean | null;
  requestPermission: () => Promise<void>;
}

export const useCamera = (): UseCameraResult => {
  const {t} = useTranslation()
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
      setError(null);
    } catch (err) {
      setHasPermission(false);
      if (err instanceof Error) {
        switch (err.name) {
          case 'NotAllowedError':
            setError(t('permission.error.notAllowed'));
            break;
          case 'NotFoundError':
            setError(t('permission.error.notFound'));
            break;
          case 'NotReadableError':
            setError(t('permission.error.notReadable'));
            break;
          default:
            setError(t('permission.error.default'));
        }
      }
    }
  }, []);

  return {
    error,
    hasPermission,
    requestPermission,
  };
};
