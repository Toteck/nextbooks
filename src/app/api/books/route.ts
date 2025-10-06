// Rotas API(mock / backend fake no início)
// CRUD de livros

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


//1. GET /api/livros - Retorna a lista de livros
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url); // Extrai os parâmetros de busca da URL
    const status = searchParams.get("status"); // Obtém o valor do parâmetro "status"

    const books = await prisma.book.findMany({
      where: status
        ? { status: status.toUpperCase() }
        : undefined, // Filtra os livros pelo status, se fornecido
      include: { genre: true }, // Inclui os dados do gênero relacionado
      orderBy: { createdAt: "desc" }, // Ordena os livros pela data de criação em ordem decrescente
    })

    return NextResponse.json(books); // Retorna a lista de livros como resposta JSON
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao buscar os livros." },
      { status: 500 }
    )
  }
}

//2. POST /api/livros - Adiciona um novo livro
export async function POST(request: NextRequest) {
  try {
    const data = await request.json(); // Extrai os dados do corpo da requisição
    const { title, author, genreId, year, pages, rating, synopsis, cover } = data; // Extrai os campos necessários

    // validação básica dos dados
    if (!title || !author) {
      return NextResponse.json(
        { message: "Título e Autor são obrigatórios." },
        { status: 400 }
      );
    }

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        genreId,
        year,
        pages,
        rating,
        synopsis,
        cover,
      }
    }) // Cria um novo livro no banco de dados

    return NextResponse.json(newBook, { status: 201 }); // Retorna o livro criado com status 201 (Criado)
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao criar livro." },
      { status: 400 }
    )
  }
};