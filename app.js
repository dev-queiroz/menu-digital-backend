const express = require("express");
const dotenv = require("dotenv");
const mesaRoutes = require("./routes/mesaRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const cronJob = require("./utils/cron");
const { helmet, limiter, cors } = require("./middlewares/security");
const errorHandler = require("./middlewares/errorHandler");
const setupSwagger = require('./swagger');
const routes = require('./routes');

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors);
app.use("/api/", limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/mesas", mesaRoutes);
app.use("/api/pedidos", pedidoRoutes);

cronJob;

app.use(errorHandler);

app.use("/", (req, res) => {
  res.status(200).json({ message: "API do sistema de restaurante" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

setupSwagger(app);

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
