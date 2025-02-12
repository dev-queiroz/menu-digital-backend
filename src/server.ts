import server from "./index";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
