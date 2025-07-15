import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are properly configured
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const hasValidConfig = supabaseUrl && 
                      supabaseAnonKey && 
                      supabaseUrl !== 'your_supabase_url_here' &&
                      supabaseAnonKey !== 'your_supabase_anon_key_here' &&
                      isValidUrl(supabaseUrl);

if (!hasValidConfig) {
  console.warn('Supabase environment variables not found or invalid. Please connect to Supabase.');
}

// Use valid placeholder values that won't cause URL constructor errors
export const supabase = createClient(
  hasValidConfig ? supabaseUrl : 'https://placeholder.supabase.co', 
  hasValidConfig ? supabaseAnonKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk3NzEyMDAuImV4cCI6MTk2NTM0NzIwMH0.placeholder'
);

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  author: string;
  tags: string[];
  linkedin_url?: string;
  featured_image?: string;
};