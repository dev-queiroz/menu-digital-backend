import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty", // Formata logs para leitura no terminal
    options: {
      colorize: true,
    },
  },
});

export default logger;
