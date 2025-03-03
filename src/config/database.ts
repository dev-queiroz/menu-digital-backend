import { createClient } from "@supabase/supabase-js";

interface EnvConfig {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL and Key must be provided in environment variables"
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: false,
  },
});

export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("menu_items")
      .select("id")
      .limit(1);
    if (error) throw error;
    console.log("Supabase connection successful");
    return true;
  } catch (err) {
    console.error("Supabase connection failed:", err);
    return false;
  }
};

export type SupabaseClient = typeof supabase;
