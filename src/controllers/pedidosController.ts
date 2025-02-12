import { Request, Response } from "express";
import * as pedidosService from "../services/pedidosService";
import { Usuario } from "../models/usuarioModel";

/**
 * Cria um novo pedido.
 */
export const criarPedido = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const usuario = (req as any).user;
    if (!usuario) {
      res.status(401).json({ error: "Usuário não autenticado." });
      return;
    }

    const pedido = await pedidosService.criarPedido(req.body, usuario);
    res.status(201).json(pedido);
  } catch (error: any) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
};

/**
 * Altera o status de um pedido.
 * Apenas usuários com permissões adequadas (garçom, chef, admin) podem alterar.
 */
export const alterarStatusPedido = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { pedido_id, status } = req.body;
    if (!pedido_id || !status) {
      res
        .status(400)
        .json({ error: "Os campos pedido_id e status são obrigatórios." });
    }
    const usuario = (req as any).user as Usuario;
    if (!usuario) {
      res.status(401).json({ error: "Usuário não autenticado." });
      return;
    }

    const pedido = await pedidosService.alterarStatusPedido(
      pedido_id,
      status,
      usuario
    );
    res.status(200).json(pedido);
  } catch (error: any) {
    res.status(500).json({
      error:
        error instanceof Error
          ? "Erro ao alterar status do pedido: " + error.message
          : "Erro desconhecido",
    });
  }
};

/**
 * Lista todos os pedidos.
 * Apenas usuários com permissões adequadas (garçom, chef, admin) podem listar.
 */
export const listarPedidos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const usuario = (req as any).user as Usuario;
    if (!usuario) {
      res.status(401).json({ error: "Usuário não autenticado." });
      return;
    }

    const pedidos = await pedidosService.listarPedidos(usuario);
    res.status(200).json(pedidos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
