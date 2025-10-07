import { NextRequest, NextResponse } from "next/server";
// Importação da função de banco para remover o gênero
import { removeGenre } from "@/app/actions/categoryDb";
// Importação do utilitário de erro para tratamento consistente
import { handleApiError } from "@/utils/apiUtils";

//Interface para tipar corretamente o parâmetro dinâmico da rota
interface GenreRouteContext {
  params: { id: string };
}

// DELETE /api/categories/genre/[id] - Remover gênero específico
// O ID do gênero é passado na URL.
export async function DELETE(request: NextRequest, context: GenreRouteContext) {
  const { id } = context.params; // ID do gênero a ser removido

  try {
    // Chama a função da Camada de Abstração para remover o gênero no banco.
    await removeGenre(id);

    // Retorna o status padrão RESTful para deleção bem-sucedida: 204 No Content.
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // Tratamento de erros.
    // O erro do TypeScript (TS2554) indica que 'handleApiError' espera apenas 1 argumento ('error').
    // Registramos a mensagem de erro customizada e o ID no console para depuração.
    console.error(`Falha ao remover o gênero com ID: ${id}. Erro:`, error);

    // Chamamos a função utilitária com o único argumento esperado,
    // confiando que ela irá definir o status de erro apropriado (ex: 500 ou um mapeamento).
    return handleApiError(error);
  }
}
