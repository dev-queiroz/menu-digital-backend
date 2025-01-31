export interface Sessao {
  id: string; // UUID
  mesa_id: string; // ID da mesa
  data_inicio: string; // Timestamp
  data_fim?: string | null; // Timestamp de finalização (opcional)
  status: "ativa" | "finalizada"; // Status da sessão
}
