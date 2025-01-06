import { useState, useEffect, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface UseCameraOptions {
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
}

interface UseCameraResult {
  error: string | null;
  hasPermission: boolean | null;
  startScanning: () => Promise<void>;
  stopScanning: () => Promise<void>;
  requestPermission: () => Promise<void>;
}

export const useCamera = (
  onScan: (result: string) => void,
  options: UseCameraOptions = {}
): UseCameraResult => {
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const cleanup = useCallback(async () => {
    if (scanner) {
      try {
        await scanner.stop();
        await scanner.clear();
      } catch (err) {
        // Ignore cleanup errors
      }
      setScanner(null);
    }
  }, [scanner]);

  useEffect(() => {
    cleanup();
    }, []);

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

  const startScanning = async () => {
    try {
      // Check if the browser supports getUserMedia
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Camera access is not supported in this browser.');
      }

      const newScanner = new Html5Qrcode('qr-reader');
      setScanner(newScanner);

      // Get list of cameras before starting
      const cameras = await Html5Qrcode.getCameras();
      if (cameras.length === 0) {
        throw new Error('No cameras found on this device.');
      }
      // Try to find the back camera first
      const camera = cameras.find(c =>
        c.label.toLowerCase().includes('back') ||
        c.label.toLowerCase().includes('rear')
      ) || cameras[0];

      // Request camera permissions explicitly before starting
      await navigator.mediaDevices.getUserMedia({
        video: { deviceId: camera.id }
      });

      await newScanner.start(
        camera.id,
        {
          fps: options.fps || 10,
          qrbox: { width: options.qrbox || 250, height: options.qrbox || 250 },
          aspectRatio: options.aspectRatio || 1.0,
          formatsToSupport: ['QR_CODE'],
        },
        (decodedText) => {
          onScan(decodedText);
          newScanner.stop()
          setScanner(null);
        },
        (errorMessage) => {
          console.debug('QR Scan error:', errorMessage);
        }
      );

      if (error) {
        setError(null);
      }
    } catch (err) {
      await cleanup();
      if (err instanceof Error) {
        setError(err.message);
      } else {
        console.log(err)
        setError('Failed to start camera. Please try again.');
      }
    } finally {
      if (scanner) {
        scanner.stop()
        setScanner(null)
      }
    }
  };

  const stopScanning = async () => {
    await cleanup();
  };

  return {
    startScanning,
    stopScanning,
    error,
    hasPermission,
    requestPermission,
  };
};
