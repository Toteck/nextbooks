import { NextResponse } from 'next/server';
import { getGenres } from '@/app/actions/categoryDb';
import { handleApiError } from '@/utils/apiUtils';

// Handler para a requisição GET (Listar Gêneros)
export async function GET() {
    try {
        const genres = await getGenres();
        return NextResponse.json(genres);
    } catch (error) {
        return handleApiError(error);
    }
}

// Nota: A lógica POST para criação de gênero também deve ser migrada.