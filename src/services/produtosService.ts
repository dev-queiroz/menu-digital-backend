import supabase from "../config/supabase";
import { Produto } from "../models/produtoModel";

// Função para criar um produto
export const criarProduto = async (produto: Produto): Promise<Produto> => {
  const { data, error } = await supabase
    .from("produtos")
    .insert([produto])
    .single();

  if (error) throw new Error("Erro ao criar produto: " + error.message);

  return data;
};

// Função para editar um produto
export const editarProduto = async (
  produtoId: string,
  produto: Partial<Produto>
): Promise<Produto> => {
  const { data, error } = await supabase
    .from("produtos")
    .update(produto)
    .eq("id", produtoId)
    .single();

  if (error) throw new Error("Erro ao editar produto: " + error.message);

  return data;
};

// Função para excluir um produto
export const excluirProduto = async (produtoId: string): Promise<void> => {
  const { error } = await supabase
    .from("produtos")
    .delete()
    .eq("id", produtoId);

  if (error) throw new Error("Erro ao excluir produto: " + error.message);
};
