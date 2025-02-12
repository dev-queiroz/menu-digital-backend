import supabase from "../config/supabase";
import { Produto } from "../models/produtoModel";

/**
 * Cria um novo produto no banco de dados.
 * Recebe um objeto Produto com o caminho da imagem já definido.
 */
export const criarProduto = async (produto: Produto): Promise<Produto> => {
  const { data, error } = await supabase
    .from("produtos")
    .insert([produto])
    .single();

  if (error) throw new Error("Erro ao criar produto: " + error.message);
  return data;
};

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

export const excluirProduto = async (produtoId: string): Promise<void> => {
  const { error } = await supabase
    .from("produtos")
    .delete()
    .eq("id", produtoId);

  if (error) throw new Error("Erro ao excluir produto: " + error.message);
};

export const listarProdutos = async (): Promise<Produto[]> => {
  const { data, error } = await supabase.from("produtos").select("*");

  if (error) throw new Error("Erro ao listar produtos: " + error.message);
  return data;
};

export const buscarProdutoPorId = async (
  id: string
): Promise<Produto | null> => {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error("Erro ao buscar produto por ID: " + error.message);
  return data;
};
