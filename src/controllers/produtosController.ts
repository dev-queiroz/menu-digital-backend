import { Request, Response } from "express";
import * as produtosService from "../services/produtosService";
import { Produto } from "../models/produtoModel";
import { uploadImage } from "../utils/storage";

// Extensão do Request para incluir o tipo de arquivo
interface RequestWithFile extends Request {
  file?: Express.Multer.File; // Adiciona a propriedade file
}

/**
 * Lista todos os produtos do cardápio.
 * Geralmente, esse endpoint é público.
 */
export const listarProdutos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const produtos = await produtosService.listarProdutos();

    res.status(200).json(produtos);
  } catch (error: any) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
};

/**
 * Cria um novo produto.
 * Apenas administradores podem criar produtos.
 * Se um arquivo de imagem for enviado, ele é convertido para WebP e feito o upload.
 */
export const criarProduto = async (
  req: RequestWithFile,
  res: Response
): Promise<void> => {
  try {
    // Verificação de permissão: somente admin pode criar
    const usuario = (req as any).user;
    if (!usuario || usuario.tipo !== "admin") {
      res.status(403).json({ error: "Acesso negado." });
      return;
    }

    // Campos obrigatórios (nome, preco, categoria, imagem podem vir no corpo ou como arquivo)
    const { nome, preco, categoria, descricao } = req.body;
    if (!nome || !preco || !categoria) {
      res.status(400).json({
        error: "Campos obrigatórios: nome, preco, categoria.",
      });
      return;
    }

    let imagemPath = "";
    // Verifica se foi enviado um arquivo de imagem via multipart (ex: usando Multer)
    if (req.file) {
      // Ex: req.file.originalname e req.file.buffer são disponibilizados pelo Multer
      const fileName = `${Date.now()}_${req.file.originalname.split(".")[0]}`;
      imagemPath = await uploadImage(req.file.buffer, fileName);
    } else if (req.body.imagem) {
      // Caso a URL da imagem já seja fornecida no body (alternativa)
      imagemPath = req.body.imagem;
    } else {
      res.status(400).json({ error: "Imagem é obrigatória." });
      return;
    }

    // Monta o objeto do produto
    const produto: Produto = {
      id: "", // Será gerado pelo Supabase
      nome,
      preco: parseFloat(preco),
      categoria,
      imagem: imagemPath,
      descricao: descricao || "",
    };

    // Cria o produto no banco
    const produtoCriado = await produtosService.criarProduto(produto);
    res.status(201).json(produtoCriado);
  } catch (error: any) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
};

/**
 * Edita um produto existente.
 * Apenas administradores podem editar produtos.
 * Se um arquivo de imagem for enviado, ele é convertido para WebP e feito o upload.
 */
export const editarProduto = async (
  req: RequestWithFile,
  res: Response
): Promise<void> => {
  try {
    // Verificação de permissão: somente admin pode editar
    const usuario = (req as any).user;
    if (!usuario || usuario.tipo !== "admin") {
      res.status(403).json({ error: "Acesso negado." });
      return;
    }

    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "ID do produto é obrigatório." });
      return;
    }

    const { nome, preco, categoria, descricao } = req.body;
    if (!nome || !preco || !categoria) {
      res.status(400).json({
        error: "Campos obrigatórios: nome, preco, categoria.",
      });
      return;
    }

    let imagemPath = "";
    if (req.file) {
      const fileName = `${Date.now()}_${req.file.originalname.split(".")[0]}`;
      imagemPath = await uploadImage(req.file.buffer, fileName);
    } else if (req.body.imagem) {
      imagemPath = req.body.imagem;
    }

    const produto: Produto = {
      id,
      nome,
      preco: parseFloat(preco),
      categoria,
      imagem: imagemPath,
      descricao: descricao || "",
    };

    const produtoEditado = await produtosService.editarProduto(id, produto);
    res.status(200).json(produtoEditado);
  } catch (error: any) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
};
