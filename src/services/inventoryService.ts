import { supabase } from "../config/database";
import { logger } from "../utils";

export const updateStock = async (
  variantId: number,
  quantityChange: number
): Promise<void> => {
  try {
    const { data: variant, error: fetchError } = await supabase
      .from("menu_variants")
      .select("stock")
      .eq("id", variantId)
      .single();
    if (fetchError) throw fetchError;

    const newStock = variant.stock + quantityChange;
    if (newStock < 0) throw new Error("Stock cannot be negative");

    const { error } = await supabase
      .from("menu_variants")
      .update({ stock: newStock })
      .eq("id", variantId);
    if (error) throw error;

    logger.info("Stock updated", { variantId, newStock });
  } catch (error) {
    logger.error("Error updating stock", error);
    throw error;
  }
};

export const checkStock = async (variantId: number): Promise<number> => {
  const { data, error } = await supabase
    .from("menu_variants")
    .select("stock")
    .eq("id", variantId)
    .single();
  if (error) throw error;
  return data.stock;
};
