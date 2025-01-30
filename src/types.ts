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
