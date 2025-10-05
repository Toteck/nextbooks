// Rotas API(mock / backend fake no início)
// CRUD de livros

import { NextRequest, NextResponse } from "next/server";
import { livrosIniciais } from "@/data/livros";

//1. GET /api/livros - Retorna a lista de livros
//2. POST /api/livros - Adiciona um novo livro

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const statusFiltro = searchParams.get('status');

  let livros = livrosIniciais;

  if (statusFiltro) {
    livros = livros.filter(livro => livro.status === statusFiltro.toUpperCase());
  }

  return NextResponse.json(livros);
}

export async function POST(request: NextRequest) {
  try {
    const novoLivro = await request.json();

    //validação básica
    if (!novoLivro.title || !novoLivro.author) {
      return NextResponse.json(
        { message: "Título e autor são obrigatórios." },
        { status: 400 }
      );
    }
    //gerar um ID e adicionar ao DB mock
    novoLivro.id = (crypto.randomUUID());
    novoLivro.createdAt = new Date().toISOString();
    livrosIniciais.push(novoLivro);

    return NextResponse.json(novoLivro, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao adicionar o livro." },
      { status: 500 }
    );
  }
};