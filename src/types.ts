import { errorCorrectionLevels } from "./components/layout/AdminPanel/CodeTokenGenerator";

export interface Product {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  manufactureDate: string;
  qrCode: string;
  imageUrl: string;
  bestBefore: string;
  isFlagged: boolean;
}

export interface ScanResult {
  isAuthentic: boolean;
  product?: Omit<Product, 'isFlagged'>;
  message: string;
}

export interface ScanLog {
  id: number;
  qrCode: string;
  ipAddress?: string;
  timestamp: string;
  isVerified: boolean;
}

export type Languages = ['en', 'de']

export type TabItem = {
  name: string,
  path: string
}

export type Tabs = TabItem[]

export type TokenSettings = {
  length: number;
  withUppercase: boolean;
  withLowercase: boolean;
  withNumbers: boolean;
  withSymbols: boolean;
}

export type ErrorCorrectionLevel = (typeof errorCorrectionLevels)[number];

export type QrCodeSettings = {
  foreground: string;
  background: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
}
