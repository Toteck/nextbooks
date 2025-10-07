// app/api/books/route.ts
import { NextResponse } from 'next/server';
import { getBooks } from '@/app/actions/bookDb';
import { handleApiError } from '@/utils/apiUtils';

// Handler para a requisição GET (Listar Livros com Filtros)
export async function GET(request: Request) {
    try {
        // 1. Extração dos Parâmetros de URL
        const { searchParams } = new URL(request.url);
        
        // Mapeia os parâmetros da URL para o objeto BookFilters
        const filters = {
            q: searchParams.get('q') || undefined,
            status: searchParams.get('status') || undefined,
            genreId: searchParams.get('genreId') || undefined,
        };

        // 2. Consulta ao Banco de Dados (usando a função corrigida)
        // A função getBooks já trata a lógica de 'where' e o modo SQLite.
        const books = await getBooks(filters);

        // 3. Resposta de Sucesso
        return NextResponse.json(books);

    } catch (error) {
        // Usa o utilitário de erro para padronizar a resposta
        return handleApiError(error);
    }
}

// Nota: A lógica POST (criação) será removida daqui se você migrar 
// completamente para as Server Actions (createBookAction).