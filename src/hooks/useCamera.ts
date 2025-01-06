import { useState, useEffect, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface UseCameraOptions {
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
}

interface UseCameraResult {
  startScanning: () => Promise<void>;
  stopScanning: () => Promise<void>;
  isScanning: boolean;
  error: string | null;
  hasPermission: boolean;
  requestPermission: () => Promise<void>;
}

export const useCamera = (
  onScan: (result: string) => void,
  options: UseCameraOptions = {}
): UseCameraResult => {
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  const cleanup = useCallback(async () => {
    if (scanner) {
      try {
        if (isScanning) {
          await scanner.stop();
        }
        await scanner.clear();
      } catch (err) {
        // Ignore cleanup errors
      }
      setScanner(null);
      setIsScanning(false);
    }
  }, [scanner, isScanning]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

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
      await cleanup();

      const newScanner = new Html5Qrcode('qr-reader');
      setScanner(newScanner);

      const cameras = await Html5Qrcode.getCameras();
      if (cameras.length === 0) {
        throw new Error('No cameras found');
      }

      // Prefer back camera
      const camera = cameras.find(c => 
        c.label.toLowerCase().includes('back') || 
        c.label.toLowerCase().includes('rear')
      ) || cameras[0];

      await newScanner.start(
        camera.id,
        {
          fps: options.fps || 10,
          qrbox: { width: options.qrbox || 250, height: options.qrbox || 250 },
          aspectRatio: options.aspectRatio || 1.0,
        },
        (decodedText) => {
          onScan(decodedText);
        },
        () => {} // Ignore errors during scanning
      );

      setIsScanning(true);
      setError(null);
    } catch (err) {
      await cleanup();
      setError('Failed to start camera. Please try again.');
    }
  };

  const stopScanning = async () => {
    await cleanup();
  };

  return {
    startScanning,
    stopScanning,
    isScanning,
    error,
    hasPermission,
    requestPermission,
  };
};