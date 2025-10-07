import { NextResponse } from 'next/server';
// Importação da função de banco para categorias
import { getGenres } from '@/app/actions/categoryDb'; 
// Importação do utilitário de erro para tratamento consistente
import { handleApiError } from '@/utils/apiUtils';

// GET /api/categories - Retorna a lista de todas as categorias/gêneros 
export async function GET() {
  try {
    // Chama a função da Camada de Abstração para buscar todos os gêneros no banco de dados.
    // A função getGenres cuidará da lógica do Prisma (ex: findMany) e ordenação.
    const genres = await getGenres();

    // Retorna a lista de gêneros com status 200 (implícito)
    return NextResponse.json(genres);
  } catch (error) {
    // Tratamento de erro centralizado para qualquer falha na busca ou no banco.
    return handleApiError(error, 'Falha ao listar as categorias/gêneros.');
  }
}
