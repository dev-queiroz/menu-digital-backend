import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const ENV = {
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};

if (!ENV.SUPABASE_URL || !ENV.SUPABASE_ANON_KEY) {
  throw new Error(
    "Variáveis de ambiente do Supabase não foram configuradas corretamente!"
  );
}
