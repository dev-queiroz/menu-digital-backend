export type UsuarioTipo = "admin" | "garcom" | "chef";

export interface Usuario {
  id: string; // UUID (vinculado ao Supabase Auth)
  nome: string; // Nome do usuário
  tipo: UsuarioTipo; // Tipo de usuário (admin, garcom, chef)
}
