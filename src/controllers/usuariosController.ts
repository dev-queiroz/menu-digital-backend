import { Request, Response } from "express";
import * as usuariosService from "../services/usuariosService";
import { Usuario, UsuarioTipo } from "../models/usuarioModel";
import { ENV } from "../config/env";

/**
 * Registro de Admin.
 * Permite que um admin se registre sozinho, desde que forneça a senha correta (ADMIN_PASSWORD).
 */
export const registerAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nome, email, senha, adminPassword } = req.body;
    if (!nome || !email || !senha || !adminPassword) {
      res.status(400).json({ error: "Todos os campos são obrigatórios." });
      return;
    }

    if (adminPassword !== ENV.ADMIN_PASSWORD) {
      res.status(403).json({ error: "Senha de administrador inválida." });
      return;
    }

    const novoAdmin: Usuario = {
      id: "", // O Supabase ou o banco gerará o UUID
      nome,
      email,
      senha,
      tipo: "admin",
    };
    const usuario = await usuariosService.criarUsuario(novoAdmin);
    res.status(201).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Registro de Garçom ou Chef.
 * Somente administradores podem registrar esses usuários.
 */
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const usuarioLogado = (req as any).user as Usuario;
    if (!usuarioLogado || usuarioLogado.tipo !== "admin") {
      res.status(403).json({ error: "Acesso negado." });
      return;
    }
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) {
      res.status(400).json({ error: "Todos os campos são obrigatórios." });
      return;
    }

    if (tipo !== "garcom" && tipo !== "chef") {
      res.status(400).json({
        error: "Tipo de usuário inválido. Use 'garcom' ou 'chef'.",
      });
      return;
    }

    const novoUsuario: Usuario = {
      id: "",
      nome,
      email,
      senha,
      tipo: tipo as UsuarioTipo,
    };
    const usuario = await usuariosService.criarUsuario(novoUsuario);
    res.status(201).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Lista todos os usuários (garçons e chefs).
 * Apenas administradores podem acessar.
 */
export const listarUsuarios = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const usuarioLogado = (req as any).user as Usuario;

    if (!usuarioLogado || usuarioLogado.tipo !== "admin") {
      res.status(403).json({ error: "Acesso negado." });
      return;
    }
    const usuarios = await usuariosService.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Visualiza os detalhes de um usuário específico.
 * Apenas administradores podem acessar.
 */
export const getUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const usuarioLogado = (req as any).user as Usuario;
    if (!usuarioLogado || usuarioLogado.tipo !== "admin") {
      res.status(403).json({ error: "Acesso negado." });
      return;
    }
    const usuarioId = req.params.id;

    if (!usuarioId) {
      res.status(400).json({ error: "ID do usuário é obrigatório." });
      return;
    }
    const usuario = await usuariosService.buscarUsuarioPorId(usuarioId);

    if (!usuario) {
      res.status(404).json({ error: "Usuário não encontrado." });
      return;
    }
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Deleta um usuário (garçom ou chef).
 * Apenas administradores podem excluir.
 */
export const deleteUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const usuarioLogado = (req as any).user as Usuario;
    if (!usuarioLogado || usuarioLogado.tipo !== "admin") {
      res.status(403).json({ error: "Acesso negado." });
      return;
    }
    const usuarioId = req.params.id;

    if (!usuarioId) {
      res.status(400).json({ error: "ID do usuário é obrigatório." });
      return;
    }
    await usuariosService.excluirUsuario(usuarioId);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
