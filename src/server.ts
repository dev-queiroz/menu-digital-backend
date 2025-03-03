import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { rateLimiter, errorHandler } from "./middlewares";
import routes from "./routes";
import { logger } from "./utils";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(rateLimiter);
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
