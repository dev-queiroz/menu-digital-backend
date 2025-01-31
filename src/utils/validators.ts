import { z } from "zod";

export const pedidoSchema = z.object({
  sessao_id: z.string().uuid(),
  produtos: z.array(
    z.object({
      id: z.string().uuid(),
      quantidade: z.number().positive(),
    })
  ),
});

export const sessaoSchema = z.object({
  mesa_id: z.string().uuid(),
});

export const usuarioSchema = z.object({
  nome: z.string().min(3).max(100),
  tipo: z.enum(["admin", "garcom", "chef"]),
});
