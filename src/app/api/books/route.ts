import { NextRequest, NextResponse } from "next/server";
// Importações ajustadas para usar a Camada de Abstração
import { getBooks, createBook } from "@/app/actions/bookDb"; 
import { handleApiError } from '@/utils/apiUtils';

// O Prisma Client não é mais importado diretamente aqui, pois está encapsulado em 'bookDb'.


// 1. GET /api/books - Retorna a lista de livros
// Suporta filtros via query parameters (ex: ?status=lendo&q=titulo)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url); 
    
    // Converte os searchParams em um objeto simples.
    // A função getBooks em 'bookDb' será responsável por aplicar os filtros no Prisma.
    const filters = Object.fromEntries(searchParams.entries()); 

    const books = await getBooks(filters); 

    // O status 200 é implícito e o retorno é o JSON com a lista.
    return NextResponse.json(books); 
  } catch (error) {
    // Tratamento de erro centralizado
    return handleApiError(error, "Falha ao buscar os livros.");
  }
}

// 2. POST /api/books - Adiciona um novo livro
// Recebe todos os campos (título, autor, status, notas, etc.) no corpo (body) da requisição.
export async function POST(request: NextRequest) {
  try {
    // Lê os dados completos da requisição. Os tipos devem ser garantidos pelo 'createBook'.
    const data = await request.json(); 

    // Chama a função de abstração. O createBook em 'bookDb' cuida:
    // - Da validação completa dos novos e antigos campos
    // - Da atribuição de datas (createdAt, updatedAt) e valores padrão
    // - Da comunicação direta com o Prisma
    const newBook = await createBook(data); 

    // Retorna o livro criado com status 201 Created
    return NextResponse.json(newBook, { status: 201 }); 
  } catch (error) {
    // Erros de validação do cliente (400) ou erros internos.
    // O utilitário handleApiError deve ajudar a distinguir.
    return handleApiError(error, "Falha ao criar livro.", 400); 
  }
};