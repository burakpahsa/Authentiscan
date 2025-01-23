export interface Product {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  manufactureDate: string;
  qrCode: string;
  imageUrl: string;
}

export interface ScanResult {
  isAuthentic: boolean;
  product?: Product;
  message: string;
}

export interface ScanLog {
  id: number;
  qrCode: string;
  ipAddress?: string;
  timestamp: string;
}