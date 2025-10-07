import { NextRequest, NextResponse } from 'next/server';
// Importação da função de banco para remover o gênero
import { removeGenre } from '@/app/actions/categoryDb';
// Importação do utilitário de erro para tratamento consistente
import { handleApiError } from '@/utils/apiUtils';

//Interface para tipar corretamente o parâmetro dinâmico da rota
interface GenreRouteContext {
  params: { id: string };
}

// DELETE /api/categories/genre/[genre] - Remover gênero específico
// O nome do gênero é passado na URL e será o valor de 'genre'.
export async function DELETE(request: NextRequest, context: GenreRouteContext) {
  const { id } = context.params; // ID do gênero a ser removido

  try {
    // Chama a função da Camada de Abstração para remover o gênero no banco.
    // A função 'removeGenre' em 'categoryDb' deve garantir a remoção
    // e o tratamento de caso (ex: se o gênero não existir).
    await removeGenre(id);

    // Retorna o status padrão RESTful para deleção bem-sucedida: 204 No Content.
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // Tratamento de erros. Pode ser 404 (Gênero não encontrado) ou 400 
    return handleApiError(error, `Falha ao remover o gênero: ${genreName}.`, 400);
  }
}