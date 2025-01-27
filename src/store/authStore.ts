import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Product, ScanLog } from '../types';

interface AuthStore {
  authenticProducts: Product[];
  scans: ScanLog[];
  isLoading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  verifyProduct: (qrCode: string, ipAddress?: string) => Product | undefined;
  fetchProducts: () => Promise<void>;
  fetchScans: () => Promise<void>;
}

const logRequest = async (productQr: string, ipAddress?: string) => {
  try {
    await supabase.from('scans').insert([{ ip_address: ipAddress, qr_code: productQr }])
  } catch (error) {
    console.error(error)
  }
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  authenticProducts: [],
  scans: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) throw error;

      const products: Product[] = data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        manufacturer: item.manufacturer || '',
        manufactureDate: item.manufacture_date || '',
        qrCode: item.qr_code,
        imageUrl: item.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
      }));

      set({ authenticProducts: products });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchScans: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('scans')
        .select('*');

      if (error) throw error;

      const scans: ScanLog[] = data.map(item => ({
        id: item.id,
        qrCode: item.qr_code,
        ipAddress: item.ip_address,
        timestamp: item.created_at,
      }));

      set({ scans });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  addProduct: async (product) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          name: product.name,
          description: product.description,
          manufacturer: product.manufacturer,
          manufacture_date: product.manufactureDate,
          qr_code: product.qrCode,
          image_url: product.imageUrl
        }]);

      if (error) throw error;

      await get().fetchProducts();
    } catch (error) {
      set({ error: (error as Error).message });
      set({ isLoading: false });
    }
  },

  removeProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await get().fetchProducts();
    } catch (error) {
      set({ error: (error as Error).message });
      set({ isLoading: false });
    }
  },

  verifyProduct: (qrCode: string, ipAddress?: string) => {
    logRequest(qrCode, ipAddress)
    return get().authenticProducts.find((p) => p.qrCode === qrCode)
  },
}));
