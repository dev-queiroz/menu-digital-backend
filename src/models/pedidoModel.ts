import { Sessao } from "./sessaoModel";
import { Produto } from "./produtoModel";

export interface Pedido {
  id: string; // UUID
  sessao_id: Sessao["id"]; // ID da sessão associada
  produtos: Produto[]; // Lista de produtos no pedido
  status: "pendente" | "aprovado" | "pronto" | "entregue"; // Status do pedido
  data_criacao: string; // Timestamp de criação
}
