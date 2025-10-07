import { NextRequest, NextResponse } from 'next/server';
// Importação da função de banco para remover o gênero
import { removeGenre } from '@/app/actions/categoryDb'; 
// Importação do utilitário de erro para tratamento consistente
import { handleApiError } from '@/utils/apiUtils';

//Interface para tipar corretamente o parâmetro dinâmico da rota
interface GenreRouteContext {
  params: { genre: string };
}

// DELETE /api/categories/genres/[genre] - Remover gênero específico
// O nome do gênero é passado na URL e será o valor de 'genre'.
export async function DELETE(request: NextRequest, context: GenreRouteContext) {
  // O valor de 'genre' (ex: 'Fic%C3%A7%C3%A3o') precisa ser decodificado
  const genreName = decodeURIComponent(context.params.genre);

  try {
    // Chama a função da Camada de Abstração para remover o gênero no banco.
    // A função 'removeGenre' em 'categoryDb' deve garantir a remoção
    // e o tratamento de caso (ex: se o gênero não existir).
    await removeGenre(genreName);
    
    // Retorna o status padrão RESTful para deleção bem-sucedida: 204 No Content.
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // Tratamento de erros. Pode ser 404 (Gênero não encontrado) ou 400 
    return handleApiError(error, `Falha ao remover o gênero: ${genreName}.`, 400);
  }
}