import supabase from "../config/supabase";
import { Usuario } from "../models/usuarioModel";

// Função para criar um novo usuário
export const criarUsuario = async (usuario: Usuario): Promise<Usuario> => {
  const { data, error } = await supabase
    .from("usuarios")
    .insert([usuario])
    .single();

  if (error) throw new Error("Erro ao criar usuário: " + error.message);

  return data;
};

// Função para editar um usuário
export const editarUsuario = async (
  usuarioId: string,
  usuario: Partial<Usuario>
): Promise<Usuario> => {
  const { data, error } = await supabase
    .from("usuarios")
    .update(usuario)
    .eq("id", usuarioId)
    .single();

  if (error) throw new Error("Erro ao editar usuário: " + error.message);

  return data;
};

// Função para excluir um usuário
export const excluirUsuario = async (usuarioId: string): Promise<void> => {
  const { error } = await supabase
    .from("usuarios")
    .delete()
    .eq("id", usuarioId);

  if (error) throw new Error("Erro ao excluir usuário: " + error.message);
};

// Função para buscar um usuário por ID
export const buscarUsuarioPorId = async (
  usuarioId: string
): Promise<Usuario | null> => {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", usuarioId)
    .single();

  if (error) throw new Error("Erro ao buscar usuário: " + error.message);

  return data;
};
