import { NextRequest, NextResponse } from "next/server";
// Importações da Camada de Abstração de Dados e Utilitários de Erro
import { getBook, updateBook, deleteBook, UpdateBookData } from "@/app/actions/bookDb";
import { handleApiError } from '@/utils/apiUtils'; 

// Interface para garantir a tipagem correta dos parâmetros de rota
interface BookRouteContext {
  params: { id: string };
}

// 1. GET /api/books/[id] - Obter detalhes de um livro
export async function GET(request: NextRequest, context: BookRouteContext) {
  const { id } = context.params;

  try {
    // Chama a função de abstração para buscar no banco
    const book = await getBook(id);

    if (!book) {
      // Retorno 404 se a função de banco não encontrar o registro
      return NextResponse.json({ message: 'Livro não encontrado.' }, { status: 404 });
    }

    // Retorno 200 (implícito)
    return NextResponse.json(book);
  } catch (error) {
    // Tratamento de erros, incluindo possíveis falhas de comunicação com o banco
    return handleApiError(error, `Falha ao obter o livro com ID: ${id}.`);
  }
}

// 2. PUT /api/books/[id] - Atualizar livro existente
export async function PUT(request: NextRequest, context: BookRouteContext) {
  const { id } = context.params;

  try {
    // Lê os dados do corpo. O tipo UpdateBookData deve ser importado da camada de banco.
    const data: UpdateBookData = await request.json();

    // Chama a função de abstração para realizar a atualização no banco.
    // A função updateBook cuidará de: validação, atualização do campo 'updatedAt', e retorno.
    const updatedBook = await updateBook(id, data);

    // Se a função de banco não encontrar o livro, ela deve lançar um erro 
    // que será capturado, mas aqui assumimos o sucesso.
    return NextResponse.json(updatedBook);
  } catch (error) {
    // Tratamento de erros, usando 400 para erros de validação do cliente
    return handleApiError(error, `Falha ao atualizar o livro com ID: ${id}.`, 400);
  }
}

// 3. DELETE /api/books/[id] - Remover livro
export async function DELETE(request: NextRequest, context: BookRouteContext) {
  const { id } = context.params;

  try {
    // Chama a função de abstração para remover o livro no banco
    await deleteBook(id);

    // Retorna o status padrão RESTful para deleção bem-sucedida: 204 No Content
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // Tratamento de erros para falha na deleção (ex: livro não encontrado, erro no banco)
    return handleApiError(error, `Falha ao remover o livro com ID: ${id}.`);
  }
}