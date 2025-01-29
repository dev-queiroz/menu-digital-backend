const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Rotas
const authRoutes = require("./routes/authRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const sessionRoutes = require("./routes/sessionRoutes.js");
const tableRoutes = require("./routes/tableRoutes.js");

// Configurações
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/tables", tableRoutes);

module.exports = app;
