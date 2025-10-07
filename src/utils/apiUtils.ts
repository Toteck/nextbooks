// utils/apiUtils.ts

import { NextResponse } from 'next/server';

/**
 * @description Função de utilidade para padronizar o tratamento de erros em API Routes.
 * Transforma erros lançados pelas camadas de dados (bookDb/categoryDb) em respostas HTTP padronizadas.
 * @param error O objeto de erro capturado no bloco catch.
 * @returns Um objeto NextResponse com status e mensagem de erro apropriados.
 */
export function handleApiError(error: unknown): NextResponse {
    let message = 'Ocorreu um erro interno do servidor.';
    let status = 500;

    // A Camada de Abstração de Dados (bookDb/categoryDb) lança erros do tipo Error.
    if (error instanceof Error) {
        message = error.message;

        // Se a mensagem for sobre Gênero/Livro NÃO ENCONTRADO, retornamos 404.
        if (message.includes('não encontrado') || message.includes('não encontrada')) {
            status = 404;
        }
        // Se for erro de Duplicidade (Gênero já existe ou Livro com dados iguais), retornamos 409 Conflict.
        else if (message.includes('já existe') || message.includes('em uso')) {
            status = 409;
        }
        // Se for erro de Dados Inválidos, como tipo incorreto.
        else if (message.includes('falha na consulta') || message.includes('Falha ao obter o livro')) {
             status = 400;
        }
    } else {
        // Para erros que não são instâncias de Error (e.g., string ou objeto genérico)
        message = `Erro desconhecido: ${String(error)}`;
    }

    console.error('API Error:', message, 'Status:', status);
    
    return NextResponse.json({ message, status, error: true }, { status });
}