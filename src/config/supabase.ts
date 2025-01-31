import { createClient } from "@supabase/supabase-js";
import { ENV } from "./env";

const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false, // Não armazena sessões localmente
  },
});

export default supabase;
