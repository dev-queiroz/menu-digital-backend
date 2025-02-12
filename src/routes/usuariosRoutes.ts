import { Router } from "express";
import * as usuariosController from "../controllers/usuariosController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { usuarioSchema } from "../utils/validators"; // Certifique-se de definir um schema adequado para usuários

const router = Router();

/**
 * Registro de admin (self-register) – público, mas exige a senha de admin.
 */
router.post(
  "/register-admin",
  validationMiddleware(usuarioSchema),
  usuariosController.registerAdmin
);

/**
 * Registro de garçons ou chefs – somente administradores podem criar esses usuários.
 */
router.post(
  "/register-user",
  authMiddleware,
  roleMiddleware(["admin"]),
  validationMiddleware(usuarioSchema),
  usuariosController.registerUser
);

/**
 * Listar usuários – somente administradores.
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  usuariosController.listarUsuarios
);

/**
 * Obter detalhes de um usuário – somente administradores.
 */
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  usuariosController.getUsuario
);

/**
 * Deletar um usuário – somente administradores.
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  usuariosController.deleteUsuario
);

export default router;
