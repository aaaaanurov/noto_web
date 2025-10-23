import { createClient } from '@supabase/supabase-js';

// Эти переменные нужно будет добавить в .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials are not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Для публичного доступа не нужна сессия
  },
});

// Типы для БД
export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}

export interface Wishlist {
  id: number;
  owner_id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  cover_color_hex: string | null;
  text_color_hex: string | null;
  privacy: 'public' | 'unlisted' | 'private';
  share_token: string | null;
  created_at: string;
}

export interface WishlistItem {
  id: number;
  wishlist_id: number;
  title: string | null;
  description: string | null;
  price: number | null;
  currency: string | null;
  image_url: string | null;
  product_url: string | null;
  bookable: boolean | null;
  created_at: string;
}

