import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Product, ScanLog } from '../types';
import { logRequest } from '@helpers/store';

interface AuthStore {
  authenticProducts: Product[];
  scans: ScanLog[];
  isLoading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  verifyProduct: (qrCode: string, ipAddress?: string) => Promise<Omit<Product, 'isFlagged'> | undefined>;
  fetchProducts: () => Promise<void>;
  fetchScans: () => Promise<void>;
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
        imageUrl: item.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
        bestBefore: item.best_before,
        isFlagged: item.flagged
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
        .select('*')
        .order('created_at', {ascending: false})
        .limit(10)

      if (error) throw error;

      const scans: ScanLog[] = data.map(item => ({
        id: item.id,
        qrCode: item.qr_code,
        ipAddress: item.ip_address,
        timestamp: item.created_at,
        isVerified: item.is_verified
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
          image_url: product.imageUrl,
          best_before: product.bestBefore
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

  verifyProduct: async (qrCode: string, ipAddress?: string) => {
    const { data, error } = await supabase.from('products').select().eq('qr_code', qrCode).maybeSingle();
    if (error) throw error;
    if (data === null) {
      logRequest(qrCode, false, false, ipAddress)
      return undefined
    }
    if (data) {
      const isFlagged = await logRequest(qrCode, true, !data.flagged, ipAddress)
      const product: Product = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        manufacturer: data.manufacturer || '',
        manufactureDate: data.manufacture_date || '',
        qrCode: data.qr_code,
        imageUrl: data.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
        bestBefore: data.best_before,
        isFlagged: data.flagged || isFlagged
      }
      return product;
    }
  },
}));
