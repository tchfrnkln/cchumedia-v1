'use client';

import { create } from 'zustand';
import { supabase } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  order: number;
  image_url: string | null;
  specs: Record<string, string[]>; // <- added dynamic specs
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  categoryCounts: Record<string, number>;


  fetchProducts: () => Promise<void>;
  getCategoryCounts: () => Record<string, number>;
  addProduct: (
    name: string,
    description: string,
    price: number,
    order: number,
    image: File | null,
    specs: Record<string, string[]>,
    featured?: boolean,
    badge?: string,
    rating?: number,
    review?: number,
    cat?: string
  ) => Promise<void>;
  updateProduct: (
    id: string,
    name: string,
    description: string,
    price: number,
    order: number,
    image: File | null,
    specs: Record<string, string[]>, // <- specs
    featured?: boolean,
    badge?: string,
    rating?: number,
    review?: number,
    cat?: string
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  categoryCounts: {},

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      set({ error: error.message, isLoading: false });
      toast.error(error.message);
      return;
    }
    set({ products: data as Product[], isLoading: false });
    
    const counts: Record<string, number> = { all: data.length };

      data.forEach(product => {
        const cat = product.cat || product.category;
        if (cat) {
          counts[cat] = (counts[cat] || 0) + 1;
        }
      });

    set({ categoryCounts: counts });
  },
  getCategoryCounts: () => get().categoryCounts,


  addProduct: async (name, description, price, order, image, specs, featured, badge, rating, review, cat) => {
    set({ isLoading: true, error: null });
    let image_url: string | null = null;

    if (image) {
      const filePath = `${crypto.randomUUID()}-${image.name}`;
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, image);

      if (uploadError) {
        set({ error: uploadError.message, isLoading: false });
        toast.error(uploadError.message);
        return;
      }

      const { data: urlData } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);
      image_url = urlData.publicUrl;
    }

    const { error } = await supabase.from('products').insert({
      name,
      description,
      price,
      order,
      image_url,
      specs, // <- insert specs
      featured,
      badge,
      rating,
      reviews: review,
      cat
    });

    if (error) {
      set({ error: error.message, isLoading: false });
      toast.error(error.message);
      return;
    }

    await get().fetchProducts();
    set({ isLoading: false });
    toast.success('Product added!');
  },

  updateProduct: async (id, name, description, price, order, image, specs, featured, badge, rating, review, cat) => {
    set({ isLoading: true, error: null });
    let image_url: string | null = null;
    const existing = get().products.find((p) => p.id === id);

    if (image) {
      const filePath = `${crypto.randomUUID()}-${image.name}`;
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, image);

      if (uploadError) {
        set({ error: uploadError.message, isLoading: false });
        toast.error(uploadError.message);
        return;
      }

      const { data: urlData } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);
      image_url = urlData.publicUrl;
    } else if (existing) {
      image_url = existing.image_url;
    }

    const { error } = await supabase
      .from('products')
      .update({ name, description, price, order, image_url, specs, featured, badge, rating, reviews: review, cat }) // <- update specs
      .eq('id', id);

    if (error) {
      set({ error: error.message, isLoading: false });
      toast.error(error.message);
      return;
    }

    await get().fetchProducts();
    set({ isLoading: false });
    toast.success('Product updated!');
  },

  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      set({ error: error.message, isLoading: false });
      toast.error(error.message);
      return;
    }

    await get().fetchProducts();
    set({ isLoading: false });
    toast.success('Product deleted!');
  },
}));