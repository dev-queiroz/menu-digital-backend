import { supabase } from "../config/database";

export interface User {
  id: string;
  email: string;
  role: "customer" | "staff" | "admin";
  name?: string;
  created_at: string;
}

export const fetchUserById = async (userId: string): Promise<User> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
};

export const updateUser = async (
  userId: string,
  updates: Partial<User>
): Promise<User> => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
};
