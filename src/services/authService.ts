import { supabase } from "../config/database";
import { User } from "../models/user";
import { logger } from "../utils";

interface LoginCredentials {
  email: string;
  password: string;
}

export const registerUser = async (
  email: string,
  password: string,
  role: User["role"] = "customer"
): Promise<User> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    logger.error("Error registering user", error);
    throw error;
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .insert([{ id: data.user!.id, email, role }])
    .select()
    .single();
  if (userError) throw userError;

  logger.info("User registered successfully", { userId: data.user!.id });
  return userData;
};

export const loginUser = async ({
  email,
  password,
}: LoginCredentials): Promise<string> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    logger.error("Error logging in user", error);
    throw error;
  }

  logger.info("User logged in successfully", { userId: data.user!.id });
  return data.session.access_token;
};

export const checkUserRole = async (
  token: string,
  requiredRole: User["role"]
): Promise<User> => {
  const { data, error } = await supabase.auth.getUser(token);
  if (error) throw error;

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("id", data.user.id)
    .single();
  if (userError) throw userError;

  if (userData.role !== requiredRole) {
    throw new Error(`User does not have the required role: ${requiredRole}`);
  }

  return { ...data.user, role: userData.role } as User;
};
