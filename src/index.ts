import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import usuariosRoutes from "./routes/usuariosRoutes";
import produtosRoutes from "./routes/produtosRoutes";
import pedidosRoutes from "./routes/pedidosRoutes";
import sessoesRoutes from "./routes/sessoesRoutes";
import cron from "node-cron";
import cleanupSessions from "../cron/cleanupSessions";

cron.schedule("0 * * * *", cleanupSessions);

const app = express();

// Middlewares globais
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/produtos", produtosRoutes);
app.use("/api/pedidos", pedidosRoutes);
app.use("/api/sessoes", sessoesRoutes);

// Middleware de tratamento de erros
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
  }
);

export default app;
