import { PrismaClient } from '@prisma/client'; // Importa o PrismaClient do pacote do Prisma

const prisma = new PrismaClient(); // Cria uma instância do PrismaClient

export default prisma; // Exporta a instância para ser usada em outras partes do aplicativo