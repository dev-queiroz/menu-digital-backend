import { Request, Response } from "express";
import * as sessoesService from "../services/sessoesService";
import { Usuario } from "../models/usuarioModel";

/**
 * Inicia uma sessão para uma mesa.
 * Responsabilidade: verificar disponibilidade da mesa, iniciar sessão e notificar o garçom via socket.
 */
export const iniciarSessao = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { mesa_id } = req.body;
    if (!mesa_id) {
      res.status(400).json({ error: "O campo mesa_id é obrigatório." });
      return;
    }

    const sessao = await sessoesService.iniciarSessao(mesa_id);
    res.status(200).json(sessao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Encerra a sessão de uma mesa.
 * Apenas usuários do tipo "garçom" ou "admin" podem encerrar a sessão.
 */
export const finalizarSessao = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { sessao_id } = req.body;
    if (!sessao_id) {
      res.status(400).json({ error: "O campo sessao_id é obrigatório." });
      return;
    }
    const usuario = (req as any).user as Usuario;
    if (!usuario) {
      res.status(401).json({ error: "Usuário não autenticado." });
      return;
    }

    await sessoesService.encerrarSessao(sessao_id, usuario);

    res.status(200).json({ message: "Sessão encerrada com sucesso." });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Permite que o cliente chame o garçom para finalizar a mesa.
 * Essa ação notifica o garçom (via Realtime ou WebSocket) para que ele verifique e proceda ao encerramento.
 */
export const chamarGarcom = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { sessao_id } = req.body;
    if (!sessao_id) {
      res.status(400).json({ error: "O campo sessao_id é obrigatório." });
      return;
    }
    // A função notificarGarcom irá configurar o canal e emitir a notificação ao garçom.
    sessoesService.notificarGarcom(sessao_id);

    res.status(200).json({
      message: "Notificação enviada ao garçom para finalizar a mesa.",
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
