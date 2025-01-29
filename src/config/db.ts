const { createClient } = require("@supabase/supabase-js");

require("dotenv").config();

/**
 * Configura e cria a instância do cliente Supabase.
 * @returns {object} - O cliente do Supabase.
 */
const supabase = createClient(
  process.env.SUPABASE_URL, // URL do Supabase no arquivo .env
  process.env.SUPABASE_KEY // Chave de API do Supabase no arquivo .env
);

export { supabase };
