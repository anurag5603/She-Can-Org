import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: any;

if (supabaseUrl && supabaseAnonKey) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
  }
}

if (!client) {
  console.warn(
    '⚠️ Supabase credentials missing! Using a mock client for demo/local testing.'
  );
  // Safe mock client implementing the interface used in AuthContext
  client = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({
        data: {
          subscription: {
            unsubscribe: () => {},
          },
        },
      }),
      signInWithOAuth: async () => {
        alert('Google OAuth / Supabase is not configured. Please use "Try Demo Admin Login".');
        return { data: {} as any, error: null };
      },
      signOut: async () => ({ error: null }),
    },
  };
}

export const supabase = client;
