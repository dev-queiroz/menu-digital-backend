export type UsuarioTipo = "admin" | "garcom" | "chef";

export interface Usuario {
  id?: string; // Adicione o id se necessário
  nome: string; // Nome do usuário
  email: string;
  senha?: string; // Remova a senha original ou mantenha como opcional
  senhaHash?: string; // Adicione a propriedade para a senha hash
  tipo: UsuarioTipo; // Tipo de usuário (admin, garcom, chef)
}
