import { PrismaClient } from '@prisma/client';

// Declara uma variável global para o cliente Prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// Cria uma única instância do PrismaClient
// Em desenvolvimento, reutiliza a instância global para evitar múltiplas conexões
// Em produção, cria uma nova instância
const client = globalThis.prisma || new PrismaClient({
    log: ['query'], // Opcional: para logar as queries no console
});

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = client;
}

export default client;