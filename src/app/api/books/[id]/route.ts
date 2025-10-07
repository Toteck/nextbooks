// app/api/books/[id]/route.ts
import { NextResponse } from 'next/server';
import { getBook } from '@/app/actions/bookDb';
import { handleApiError } from '@/utils/apiUtils';

// Handler para a requisição GET (Detalhe do Livro)
export async function GET(
    request: Request, 
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        // 1. Consulta ao Banco
        const book = await getBook(id);

        if (!book) {
            // Se getBook retorna null, lançamos um erro 'não encontrado'
            // que será tratado pelo handleApiError
            throw new Error(`Livro com ID ${id} não encontrado.`);
        }

        return NextResponse.json(book);

    } catch (error) {
        // handleApiError converte "não encontrado" em status 404
        return handleApiError(error);
    }
}

// Nota: As lógicas PUT, PATCH e DELETE devem ser removidas daqui
// se você migrar para as Server Actions (updateBookAction, deleteBookAction).