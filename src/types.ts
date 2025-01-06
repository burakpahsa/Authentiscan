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