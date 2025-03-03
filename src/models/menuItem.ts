import { supabase } from "../config/database";

export interface MenuItem {
  id: number;
  category_id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string | null;
}

export interface MenuVariant {
  id: number;
  item_id: number;
  name: string;
  price: number;
  stock: number;
}

export const fetchMenuItems = async (): Promise<{
  items: MenuItem[];
  variants: MenuVariant[];
}> => {
  const { data: items, error: itemError } = await supabase
    .from("menu_items")
    .select("*");
  if (itemError) throw itemError;

  const { data: variants, error: variantError } = await supabase
    .from("menu_variants")
    .select("*");
  if (variantError) throw variantError;

  return { items, variants };
};

export const fetchMenuItemById = async (id: number): Promise<MenuItem> => {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};
