import { createClient } from "@supabase/supabase-js";

// Vite replaces `import.meta.env.VITE_...` statically. 
// Do NOT use optional chaining (?.) as it breaks the static replacement.
const supabaseUrl = (typeof process !== 'undefined' && process.env.VITE_SUPABASE_URL) || import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = (typeof process !== 'undefined' && process.env.VITE_SUPABASE_ANON_KEY) || import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
