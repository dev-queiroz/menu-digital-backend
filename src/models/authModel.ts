import { supabase } from "../config/db";

const registerUser = async (
  name: string,
  email: string,
  password: string,
  password_gerente: string,
  role: "gerente" | "garcom"
) => {
  if (role === "gerente" && password_gerente !== process.env.SENHA_GERENTE) {
    throw new Error("Senha do gerente incorreta");
  }

  const { data, error } = await supabase.auth.signUp({
    name,
    email,
    password,
    role,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
};
