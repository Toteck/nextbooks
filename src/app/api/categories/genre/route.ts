import { NextRequest, NextResponse } from 'next/server';
// Importação da função de banco para categorias
import { createGenre } from '@/app/actions/categoryDb';
// Importação do utilitário de erro para tratamento consistente
import { handleApiError } from '@/utils/apiUtils';

// POST /api/categories/genre - Adicionar novo gênero/categoria 
// Recebe o nome do novo gênero no corpo (body) da requisição.
export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json(); // Espera um JSON com { name: "Novo Gênero" }

    // Validação de entrada básica
    if (!name || typeof name !== 'string' || name.trim() === '') {
      // Retorna 400 Bad Request se o nome estiver faltando ou for inválido
      return NextResponse.json(
        { message: 'O campo "name" é obrigatório e deve ser uma string válida.' },
        { status: 400 }
      );
    }

    // Chama a função da Camada de Abstração para criar o gênero. 
    // A função 'createGenre' em 'categoryDb' deve garantir a unicidade no banco.
    const newGenre = await createGenre(name.trim());

    // Retorna o novo gênero criado com o status 201 Created
    return NextResponse.json(newGenre, { status: 201 });
  } catch (error) {
    // Tratamento de erros.
    // Se a unicidade for violada (erro do Prisma), o handleApiError deve retornar uma mensagem amigável e status 400/409.
    return handleApiError(error, 'Falha ao adicionar novo gênero. Verifique se o nome já existe.', 400);
  }
}