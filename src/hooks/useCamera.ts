import { useState, useCallback } from 'react';

interface UseCameraResult {
  error: string | null;
  hasPermission: boolean | null;
  requestPermission: () => Promise<void>;
}

export const useCamera = (): UseCameraResult => {
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
            setError('Camera access denied. Please enable camera access to scan QR codes.');
            break;
          case 'NotFoundError':
            setError('No camera found. Please make sure your device has a camera.');
            break;
          case 'NotReadableError':
            setError('Unable to access camera. Please make sure no other app is using it.');
            break;
          default:
            setError('An error occurred while accessing the camera.');
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
