import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

/**
 * Função para remover sessões inativas ou expiradas.
 * Critério de expiração: sessões que não tiveram atividade nas últimas 2 horas.
 */
async function cleanupSessions() {
  try {
    const duasHorasAtras = new Date(Date.now() - 2 * 60 * 60 * 1000);

    const resultado = await prisma.sessao.deleteMany({
      where: {
        atualizadaEm: {
          lt: duasHorasAtras,
        },
        status: "ativa", // Altere conforme o status usado no seu banco
      },
    });

    console.log(`${resultado.count} sessões inativas removidas.`);
  } catch (error) {
    console.error("Erro ao limpar sessões:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executa o cleanup quando o script for chamado
cleanupSessions();

export default cleanupSessions;
