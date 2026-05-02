import { createClient } from "@supabase/supabase-js";

// Use process.env fallback for SSR, and a placeholder so it doesn't crash on initial server boot
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_URL : "") || "https://placeholder.supabase.co";
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_ANON_KEY : "") || "placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
